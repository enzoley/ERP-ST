const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const path = require('path');
const mysql = require('mysql');
const bcrypt = require('bcryptjs');
const session = require('express-session');

const app = express();
const port = process.env.PORT || 3000;

function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;

    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('www'));

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'www', 'index.html'));
});

app.listen(port, () => {
    console.log(`Serveur en cours d'exécution sur http://localhost:${port}`);
});

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect((err) => {
    if (err) throw err;
    console.log('MySQL Connected...');
});

app.post('/register', (req, res) => {
    const { email, nom, prenom, situation } = req.body;
    const password = generateRandomString(10);
    const hashedPassword = bcrypt.hashSync(password, 10);

    const verif = 'SELECT * FROM users WHERE email = ?';
    db.query(verif, [email], (err, results) => {
        if (err) throw err;

        if (results.length > 0) {
            return res.status(401).json({ message: 'Email déjà utilisé' });
        } else {
            const sql = 'INSERT INTO users (situation, email, password, nom, prenom) VALUES (?, ?, ?, ?, ?)';
            db.query(sql, [situation, email, hashedPassword, nom.toLowerCase(), prenom.toLowerCase()], (err, result) => {
                if (err) throw err;
                res.json({ message: 'Register successful', user: { email: email } });
            });
        }
    });
});

app.get('/users', (req, res) => {
    const sql = 'SELECT * FROM users';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

app.put('/user/:id', (req, res) => {
    const { username, email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    const sql = 'UPDATE users SET username = ?, email = ?, password = ? WHERE id = ?';
    db.query(sql, [username, email, hashedPassword, req.params.id], (err, result) => {
        if (err) throw err;
        res.send('User updated');
    });
});

app.delete('/user/:id', (req, res) => {
    const sql = 'DELETE FROM users WHERE id = ?';
    db.query(sql, [req.params.id], (err, result) => {
        if (err) throw err;
        res.send('User deleted');
    });
});

app.post('/login', (req, res) => {
    const { email, password, situation } = req.body;

    const sql = 'SELECT * FROM users WHERE email = ?';
    db.query(sql, [email], (err, results) => {
        if (err) throw err;

        if (results.length === 0) {
            return res.status(401).json({ message: 'Identifiants incorrects' });
        }

        const user = results[0];

        if (!bcrypt.compareSync(password, user.password)) {
            return res.status(401).json({ message: 'Identifiants incorrects' });
        } else if (situation != user.situation) {
            return res.status(401).json({ message: 'Identifiants incorrects' });
        } else {
            req.session.user = { id: user.id, email: user.email, situation: user.situation };
            res.json({ message: 'Login successful', user: { id: user.id, username: user.username, email: user.email } });
        }

    });
});

app.get('/check-login', (req, res) => {
    if (req.session.user) {
        res.json({ loggedIn: true, user: req.session.user });
    } else {
        res.json({ loggedIn: false });
    }
});

app.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error('Error during logout:', err);
            return res.status(500).send('Could not log out.');
        } else {
            res.send('Logout successful');
        }
    });
});

app.post('/reset', (req, res) => {
    const { email, code, password } = req.body;

    const sql = 'SELECT * FROM users WHERE email = ?';
    db.query(sql, [email], (err, results) => {
        if (err) throw err;

        if (results.length === 0) {
            return res.status(401).json({ message: 'Email incorrect' });
        }

        const user = results[0];

        if (code != user.code) {
            return res.status(401).json({ message: 'Code incorrect' });
        } else {
            const hashedPassword = bcrypt.hashSync(password, 10);

            const sql = 'UPDATE users SET password = ? WHERE email = ?';

            db.query(sql, [hashedPassword, email], (err, result) => {
                if (err) throw err;
                res.send('Password updated');
                const sql = 'UPDATE users SET code = ? WHERE email = ?';
                db.query(sql, [null, email], (err, result) => {
                    if (err) throw err;
                });
            });
        }

    });
});

app.post('/code', (req, res) => {
    const { email } = req.body;

    const sql = 'SELECT * FROM users WHERE email = ?';
    db.query(sql, [email], (err, results) => {
        if (err) throw err;

        if (results.length === 0) {
            return res.status(401).json({ message: 'Email incorrect' });
        }

        const user = results[0];
        const code = Math.floor(100000 + Math.random() * 900000);

        const sql = 'UPDATE users SET code = ? WHERE email = ?';

        db.query(sql, [code, email], (err, result) => {
            if (err) throw err;
            res.send('Code updated');
        });
    });
});

app.post('/delete', (req, res) => {
    const { email } = req.body;

    const sql = 'SELECT * FROM users WHERE email = ?';
    db.query(sql, [email], (err, results) => {
        if (err) throw err;

        if (results.length === 0) {
            return res.status(401).json({ message: 'Email incorrect' });
        } else {
            const sql = 'DELETE FROM users WHERE email = ?';
            db.query(sql, [email], (err, result) => {
                if (err) throw err;
                res.json({ message: 'Delete successful', user: { email: email } });
            });
        }
    });
});

app.get('/etu', (req, res) => {
    const sql = 'SELECT * FROM users WHERE situation = "etudiant"';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Erreur lors de l\'exécution de la requête :', err);
            res.status(500).send('Erreur serveur');
            return;
        }
        res.json(results);
    });
});

app.get('/resp', (req, res) => {
    const sql = 'SELECT * FROM users WHERE situation = "pedagogique"';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Erreur lors de l\'exécution de la requête :', err);
            res.status(500).send('Erreur serveur');
            return;
        }
        res.json(results);
    });
});

app.get('/ent', (req, res) => {
    const sql = 'SELECT * FROM users WHERE situation = "entreprise"';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Erreur lors de l\'exécution de la requête :', err);
            res.status(500).send('Erreur serveur');
            return;
        }
        res.json(results);
    });
});

app.post('/create-suivi', (req, res) => {
    const { idEtu, idResp, idEnt, dm, dy, fm, fy, nomEtu } = req.body;
    const debut = new Date(dy, dm);
    const fin = new Date(fy, fm);

    const num = nomEtu;

    const sql = `
    CREATE TABLE IF NOT EXISTS suivis_${num} (
        id INT AUTO_INCREMENT PRIMARY KEY,
        mois VARCHAR(30),
        annee VARCHAR(10),
        taches TEXT,
        commentaires TEXT,
        idEtu INT,
        idResp INT,
        idEnt INT,
        FOREIGN KEY (idEtu) REFERENCES users(id),
        FOREIGN KEY (idResp) REFERENCES users(id),
        FOREIGN KEY (idEnt) REFERENCES users(id)
    );
`;
    db.query(sql, [idEtu, idResp, idEnt, debut, fin, nomEtu], (err, result) => {
        if (err) {
            console.error('Erreur lors de l\'exécution de la requête :', err);
            res.status(500).send('Erreur serveur');
            return;
        } else {
            let current = new Date(debut);
            while (current <= fin) {
                const mois = current.getMonth();
                const annee = current.getFullYear();

                const insertSQL = `INSERT INTO suivis_${num} (mois, annee, taches, commentaires, idEtu, idResp, idEnt) VALUES (?, ?, ?, ?, ?, ?, ?)`;
                db.query(insertSQL, [mois, annee, '', '', idEtu, idResp, idEnt], (err) => {
                    if (err) {
                        console.error('Erreur lors de l\'insertion des données :', err);
                        res.status(500).send('Erreur serveur');
                        return;
                    }
                });

                current.setMonth(current.getMonth() + 1); // Move to the next month
            }
            res.json({ message: 'Suivi créé' });
        }
    });
});
