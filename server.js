const express = require('express');

const bodyParser = require('body-parser');

require('dotenv').config();

const path = require('path');

const mysql = require('mysql');

const bcrypt = require('bcryptjs');

const session = require('express-session');

const PDFDocument = require('pdfkit');

const fs = require('fs');

const multer = require('multer');

const nodemailer = require('nodemailer');

const cors = require('cors');

const app = express();
const upload = multer({ storage: multer.memoryStorage() });
const port = process.env.PORT || 3000;

function generateRandomNumber() {
    return Math.floor(Math.random() * 1000000);

}

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

app.use(cors());

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

const transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    secureConnection: false,
    port: 587,
    tls: {
        ciphers: 'SSLv3'
    },
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});

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
                const mailOptions = {
                    from: `"${process.env.EMAIL_FROM_NAME}" <${process.env.EMAIL_USER}>`,
                    to: email,
                    subject: 'Création de votre compte de suivi',
                    text: `Bonjour, Votre compte de suivi a été créé avec succès.
Pour votre première connexion, veuillez cliquer sur mot de passe oublié en utilisant cet email pour créer votre mot de passe.
Le site de suivi est accessible à l'adresse suivante : https://entreprises.startechnormandy.com
Vous être enregistré en tant que : ${situation}
Après avoir choisi votre mot de passe, vous pourrez vous connecter avec votre adresse email, votre mot de passe et en choisissant ${situation} dans le champs situation.
Cordialement,
L'équipe starTech Normandy`
                };

                transporter.sendMail(mailOptions, (err, info) => {
                    if (err) {
                        console.error('Error sending email:', err);
                        return res.status(500).json({ message: 'Erreur serveur' });
                    } else {
                        console.log('Email sent:', info.response);
                    }
                });
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

app.post('/get-user-nomprenom', (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ error: 'Email is required' });
    }

    const sql = 'SELECT nom, prenom FROM users WHERE email = ?';
    db.query(sql, [email], (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        const user = results[0];
        res.json({ nom: user.nom, prenom: user.prenom });
    });
});

app.post('/get-user-nomprenomID', (req, res) => {
    const { id } = req.body;

    if (!id) {
        return res.status(400).json({ error: 'ID is required' });
    }

    const sql = 'SELECT nom, prenom FROM users WHERE id = ?';
    db.query(sql, [id], (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        const user = results[0];
        res.json({ nom: user.nom, prenom: user.prenom });
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

        const mailOptions = {
            from: `"${process.env.EMAIL_FROM_NAME}" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: 'Code de réinitialisation du mot de passe',
            text: `Votre code de réinitialisation est : ${code}`
        };

        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.error('Error sending email:', err);
                return res.status(500).json({ message: 'Erreur serveur' });
            } else {
                console.log('Email sent:', info.response);
            }
        });

        const sql = 'UPDATE users SET code = ? WHERE email = ?';

        db.query(sql, [code, email], (err, result) => {
            if (err) throw err;
            res.send('Code updated');
        });
    });
});

app.post('/delete', (req, res) => {
    const { id } = req.body;

    const sql = 'SELECT * FROM users WHERE id = ?';
    db.query(sql, [id], (err, results) => {
        if (err) throw err;

        if (results.length === 0) {
            return res.status(401).json({ message: 'id incorrect' });
        } else {
            if (results[0].situation != "autre") {
                const sql = 'DELETE FROM users WHERE id = ?';
                db.query(sql, [id], (err, result) => {
                    if (err) throw err;
                    res.json({ message: 'Delete successful', user: { id: id } });
                });
            } else {
                return res.status(401).json({ message: "Suppression d'un admin impossible" });
            }
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
        idResp2 INT,
        idResp3 INT,
        file LONGBLOB,
        FOREIGN KEY (idEtu) REFERENCES users(id),
        FOREIGN KEY (idResp) REFERENCES users(id),
        FOREIGN KEY (idEnt) REFERENCES users(id),
        FOREIGN KEY (idResp2) REFERENCES users(id),
        FOREIGN KEY (idResp3) REFERENCES users(id)
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

                current.setMonth(current.getMonth() + 1);
            }

            const sql = 'INSERT INTO etu_to_resp (idEtu, idResp) VALUES (?, ?)';
            db.query(sql, [idEtu, idResp], (err, result) => {
                if (err) {
                    console.error('Erreur lors de l\'exécution de la requête :', err);
                    return res.status(500).send('Erreur serveur');
                }
                const sql = 'INSERT INTO etu_to_ent (idEtu, idEnt) VALUES (?, ?)';
                db.query(sql, [idEtu, idEnt], (err, result) => {
                    if (err) {
                        console.error('Erreur lors de l\'exécution de la requête :', err);
                        return res.status(500).send('Erreur serveur');
                    }
                    res.json({ message: 'Suivi créé' });
                });
            });
        }
    });
});

app.post('/delete-suivi', (req, res) => {
    const { nomEtu, id } = req.body;

    if (!nomEtu) {
        return res.status(400).json({ message: 'Nom de l\'étudiant manquant' });
    }

    const sql = `DROP TABLE IF EXISTS suivis_${nomEtu}`;
    db.query(sql, (err, result) => {
        if (err) {
            console.error('Erreur lors de l\'exécution de la requête :', err);
            return res.status(500).send('Erreur serveur');
        }
        const sql2 = 'DELETE FROM etu_to_resp WHERE idEtu = ?';
        db.query(sql2, [id], (err, result) => {
            if (err) {
                console.error('Erreur lors de l\'exécution de la requête :', err);
                return res.status(500).send('Erreur serveur');
            } else {
                const sql3 = 'DELETE FROM etu_to_ent WHERE idEtu = ?';
                db.query(sql3, [id], (err, result) => {
                    if (err) {
                        console.error('Erreur lors de l\'exécution de la requête :', err);
                        return res.status(500).send('Erreur serveur');
                    } else {
                        res.json({ message: 'Suivi supprimé' });
                    }
                });
            }
        });
    });
});

app.post('/partenariat', (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: 'Email manquant' });
    }

    const sql = 'SELECT partenariat FROM users WHERE email = ?';
    db.query(sql, [email], (err, results) => {
        if (err) {
            console.error('Erreur lors de l\'exécution de la requête :', err);
            return res.status(500).send('Erreur serveur');
        }
        if (results.length === 0) {
            return res.status(401).json({ message: 'Email incorrect' });
        }
        if (results[0].partenariat == 1) {
            res.json({ message: 'impossible' });
        } else {
            res.json({ message: 'Partenariat ajouté' });
        }
    });
});


app.post('/suivi-etu', (req, res) => {
    const { name } = req.body;
    const sql = `SELECT * FROM suivis_${name}`;
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Erreur lors de l\'exécution de la requête :', err);
            return res.status(500).send('Erreur serveur');
        }
        res.json(results);
    });
});

app.post('/etu-resp', (req, res) => {
    const { idResp } = req.body;
    const sql = 'SELECT idEtu FROM etu_to_resp WHERE idResp = ?';
    db.query(sql, [idResp], async (err, results) => {
        if (err) {
            console.error('Erreur lors de l\'exécution de la requête :', err);
            return res.status(500).send('Erreur serveur');
        }
        let l = [];
        const promises = results.map(result => {
            return new Promise((resolve, reject) => {
                const sql = 'SELECT * FROM users WHERE id = ?';
                db.query(sql, [result.idEtu], (err, queryResults) => {
                    if (err) {
                        console.error('Erreur lors de l\'exécution de la requête :', err);
                        reject('Erreur serveur');
                    } else {
                        const name = queryResults[0].nom + " " + queryResults[0].prenom;
                        resolve(name);
                    }
                });
            });
        });
        l = await Promise.all(promises);
        res.json(l);
    });
});

app.post('/etu-ent', (req, res) => {
    const { idEnt } = req.body;
    const sql = 'SELECT idEtu FROM etu_to_ent WHERE idEnt = ?';
    db.query(sql, [idEnt], async (err, results) => {
        if (err) {
            console.error('Erreur lors de l\'exécution de la requête :', err);
            return res.status(500).send('Erreur serveur');
        }
        let l = [];
        const promises = results.map(result => {
            return new Promise((resolve, reject) => {
                const sql = 'SELECT * FROM users WHERE id = ?';
                db.query(sql, [result.idEtu], (err, queryResults) => {
                    if (err) {
                        console.error('Erreur lors de l\'exécution de la requête :', err);
                        reject('Erreur serveur');
                    } else {
                        const name = queryResults[0].nom + " " + queryResults[0].prenom;
                        resolve(name);
                    }
                });
            });
        });
        l = await Promise.all(promises);
        res.json(l);
    });
});

app.post('/update-suivi', (req, res) => {
    const { type, periode, text, nomEtu } = req.body;
    const month = periode.split(' ')[0];
    const year = periode.split(' ')[1];
    if (type === 'tache') {
        const sql = `UPDATE suivis_${nomEtu} SET taches = ? WHERE mois = ? AND annee = ?`;
        db.query(sql, [text, month, year], (err, result) => {
            if (err) {
                console.error('Erreur lors de l\'exécution de la requête :', err);
                return res.status(500).send('Erreur serveur');
            }
            res.json({ message: 'Tâches mises à jour' });
        });
    } else if (type === 'commentaire') {
        const sql = `UPDATE suivis_${nomEtu} SET commentaires = ? WHERE mois = ? AND annee = ?`;
        db.query(sql, [text, month, year], (err, result) => {
            if (err) {
                console.error('Erreur lors de l\'exécution de la requête :', err);
                return res.status(500).send('Erreur serveur');
            }
            res.json({ message: 'Commentaires mis à jour' });
        });
    }
});

app.post('/add-resp', (req, res) => {
    const { nameEtu, idResp, idEtu } = req.body;
    const sql = `SELECT idResp2 FROM suivis_${nameEtu};`
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Erreur lors de l\'exécution de la requête :', err);
            return res.status(500).send('Erreur serveur');
        } else if (results[0].idResp2 === null) {
            const sql2 = `SELECT * FROM suivis_${nameEtu};`
            db.query(sql2, (err, results) => {
                if (err) {
                    console.error('Erreur lors de l\'exécution de la requête :', err);
                    return res.status(500).send('Erreur serveur');
                }
                const sql = `UPDATE suivis_${nameEtu} SET idResp2 = ?;`
                db.query(sql, [idResp], (err, result) => {
                    if (err) {
                        console.error('Erreur lors de l\'exécution de la requête :', err);
                        return res.status(500).send('Erreur serveur');
                    }
                });
                const sql3 = 'INSERT INTO etu_to_resp (idEtu, idResp) VALUES (?, ?)';
                db.query(sql3, [idEtu, idResp], (err, result) => {
                    if (err) {
                        console.error('Erreur lors de l\'exécution de la requête :', err);
                        return res.status(500).send('Erreur serveur');
                    }
                    res.json({ message: 'Responsable ajouté' });
                });

            });
        } else {
            const sql4 = `SELECT idResp3 FROM suivis_${nameEtu};`
            db.query(sql4, (err, results) => {
                if (err) {
                    console.error('Erreur lors de l\'exécution de la requête :', err);
                    return res.status(500).send('Erreur serveur');
                } else if (results[0].idResp3 === null) {
                    const sql5 = `SELECT * FROM suivis_${nameEtu};`
                    db.query(sql5, (err, results) => {
                        if (err) {
                            console.error('Erreur lors de l\'exécution de la requête :', err);
                            return res.status(500).send('Erreur serveur');
                        }
                        const sql = `UPDATE suivis_${nameEtu} SET idResp3 = ?;`
                        db.query(sql, [idResp], (err, result) => {
                            if (err) {
                                console.error('Erreur lors de l\'exécution de la requête :', err);
                                return res.status(500).send('Erreur serveur');
                            }
                        });
                        const sql6 = 'INSERT INTO etu_to_resp (idEtu, idResp) VALUES (?, ?)';
                        db.query(sql6, [idEtu, idResp], (err, result) => {
                            if (err) {
                                console.error('Erreur lors de l\'exécution de la requête :', err);
                                return res.status(500).send('Erreur serveur');
                            }
                            res.json({ message: 'Responsable ajouté' });
                        });

                    });
                } else {
                    return res.status(401).json({ message: 'Ajout impossible' });
                }
            });
        }
    });
});


app.post('/generate-pdf', (req, res) => {
    const l = req.body;
    const doc = new PDFDocument({
        size: 'A4',
        margin: 40
    });

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=document.pdf');

    doc.pipe(res);

    const title = "Livret de suivi d'alternance";
    doc.fontSize(30);
    const titleWidth = doc.widthOfString(title);
    const titleHeight = doc.heightOfString(title);
    const titleX = (doc.page.width - titleWidth) / 2;
    const titleY = (doc.page.height - titleHeight) / 3;
    doc.text(title, titleX, titleY);

    const imagePath = path.join(__dirname, 'www/img/stn.png');
    const imageY = titleY + titleHeight + 50;

    if (fs.existsSync(imagePath)) {
        doc.image(imagePath, {
            fit: [doc.page.width - 100, doc.page.height / 3],
            align: 'center',
            valign: 'top',
            x: 50,
            y: imageY
        });
    } else {
        console.error('Image not found at', imagePath);
    }

    doc.addPage();

    const title3 = "Contacts";
    doc.fontSize(30);
    const title3Width = doc.widthOfString(title3);
    const title3X = (doc.page.width - title3Width) / 2;
    doc.text(title3, title3X, 50);
    doc.moveDown(1);
    doc.fontSize(12);
    doc.text('Pour toute question vous pouvez contacter :', 40);

    doc.moveDown(1);

    doc.font('Helvetica-Bold');
    doc.text('Standard :', 40);
    doc.font('Helvetica');
    doc.moveDown(0.5);
    doc.text('starTech Normandy, 31 Boulevard de strasbourg, 61000 Alençon', 40);
    doc.moveDown(0.5);
    doc.text('02 33 80 87 50 / info@startechnormandy.com', 40);

    doc.moveDown(1);

    doc.font('Helvetica-Bold');
    doc.text('Direction pédagogique :', 40);
    doc.font('Helvetica');
    doc.moveDown(0.5);
    doc.text('Jérémie Guihard', 40);
    doc.moveDown(0.5);
    doc.text('07 67 14 33 72 / j.guihard@startechnormandy.com', 40);

    doc.moveDown(1);

    doc.font('Helvetica-Bold');
    doc.text('Direction administrative :', 40);
    doc.font('Helvetica');
    doc.moveDown(0.5);
    doc.text('Isabelle Potin', 40);
    doc.moveDown(0.5);
    doc.text('02 33 80 87 50 / i.potin@startechnormandy.com', 40);

    doc.moveDown(1);

    doc.font('Helvetica-Bold');
    doc.text('Référente handicap :', 40);
    doc.font('Helvetica');
    doc.moveDown(0.5);
    doc.text('Bertille Lemonnier', 40);
    doc.moveDown(0.5);
    doc.text('02 33 80 87 50 / bertille.lemonnier@startechnormandy.com', 40);

    doc.addPage();

    const title2 = "Suivi de l'étudiant";
    doc.fontSize(30);
    const title2Width = doc.widthOfString(title2);
    const title2X = (doc.page.width - title2Width) / 2;
    doc.text(title2, title2X, 50);
    doc.moveDown(1);
    doc.fontSize(12);
    l.forEach((item) => {
        doc.font('Helvetica-Bold');
        doc.text(`${item.mois} ${item.annee}`, 40);
        doc.font('Helvetica');
        doc.moveDown(0.5);
        doc.text(`Taches : ${item.taches}`, 40);
        doc.moveDown(0.5);
        doc.text(`Commentaires : ${item.commentaires}`, 40);
        doc.moveDown(2);

    });

    doc.end();
});

app.post('/visite-etu', (req, res) => {
    const { id } = req.body;
    const sql = 'SELECT * FROM visites WHERE idEtu = ? AND accept = 1';
    db.query(sql, [id], (err, results) => {
        if (err) {
            console.error('Erreur lors de l\'exécution de la requête :', err);
            return res.status(500).send('Erreur serveur');
        }
        res.json(results);
    });
});

app.post('/visite-resp', (req, res) => {
    const { nom, prenom } = req.body;
    const sqlName = 'SELECT id FROM users WHERE nom = ? AND prenom = ?';
    db.query(sqlName, [nom, prenom], (err, results) => {
        if (err) {
            console.error('Erreur lors de l\'exécution de la requête :', err);
            return res.status(500).send('Erreur serveur');
        }
        const sql = 'SELECT * FROM visites WHERE idEtu = ?';
        db.query(sql, [results[0].id], (err, results) => {
            if (err) {
                console.error('Erreur lors de l\'exécution de la requête :', err);
                return res.status(500).send('Erreur serveur');
            }
            res.json(results);
        });
    });
});

app.post('/get-ent', (req, res) => {
    const { nom, prenom } = req.body;
    const sqlName = 'SELECT id FROM users WHERE nom = ? AND prenom = ?';
    db.query(sqlName, [nom, prenom], (err, results) => {
        if (err) {
            console.error('Erreur lors de l\'exécution de la requête :', err);
            return res.status(500).send('Erreur serveur');
        } else {
            const sql = 'SELECT idEnt FROM etu_to_ent WHERE idEtu = ?';
            db.query(sql, [results[0].id], (err, results) => {
                if (err) {
                    console.error('Erreur lors de l\'exécution de la requête :', err);
                    return res.status(500).send('Erreur serveur');
                } else {
                    const sql2 = 'SELECT nom FROM users WHERE id = ?';
                    db.query(sql2, [results[0].idEnt], (err, results) => {
                        if (err) {
                            console.error('Erreur lors de l\'exécution de la requête :', err);
                            return res.status(500).send('Erreur serveur');
                        }
                        res.json(results);
                    });
                }
            });
        }

    });
});

app.post('/ajout-visite-resp', (req, res) => {
    const { id, nom, prenom, jour, mois, annee } = req.body;
    const sql = 'SELECT id FROM users WHERE nom = ? AND prenom = ?';
    db.query(sql, [nom, prenom], (err, results) => {
        const idEtu = results[0].id;
        if (err) {
            console.error('Erreur lors de l\'exécution de la requête :', err);
            return res.status(500).send('Erreur serveur');
        } else {
            const sql2 = 'SELECT idEnt FROM etu_to_ent WHERE idEtu = ?';
            db.query(sql2, [results[0].id], (err, results) => {
                const idEnt = results[0].idEnt;
                if (err) {
                    console.error('Erreur lors de l\'exécution de la requête :', err);
                    return res.status(500).send('Erreur serveur');
                } else {
                    const sql3 = 'INSERT INTO visites (idResp, idEtu, idEnt, jour, mois, annee, accept) VALUES (?, ?, ?, ?, ?, ?, 0)';
                    db.query(sql3, [id, idEtu, idEnt, jour, mois, annee], (err, results) => {
                        if (err) {
                            console.error('Erreur lors de l\'exécution de la requête :', err);
                            return res.status(500).send('Erreur serveur');
                        }
                        res.json({ message: 'Visite ajoutée' });
                    });
                }
            });
        }
    });

});

app.post('/get-resp', (req, res) => {
    const { nom, prenom } = req.body;
    const sqlName = 'SELECT id FROM users WHERE nom = ? AND prenom = ?';
    db.query(sqlName, [nom, prenom], (err, results) => {
        if (err) {
            console.error('Erreur lors de l\'exécution de la requête :', err);
            return res.status(500).send('Erreur serveur');
        } else {
            const sql = 'SELECT idResp FROM etu_to_resp WHERE idEtu = ?';
            db.query(sql, [results[0].id], (err, results) => {
                if (err) {
                    console.error('Erreur lors de l\'exécution de la requête :', err);
                    return res.status(500).send('Erreur serveur');
                } else {
                    const sql2 = 'SELECT nom, prenom FROM users WHERE id = ?';
                    db.query(sql2, [results[0].idResp], (err, results) => {
                        if (err) {
                            console.error('Erreur lors de l\'exécution de la requête :', err);
                            return res.status(500).send('Erreur serveur');
                        }
                        res.json(results);
                    });
                }
            });
        }

    });
});

app.post('/proposition', (req, res) => {
    const { id } = req.body;
    const sql = 'SELECT * FROM visites WHERE idEnt = ? AND accept = 0';
    db.query(sql, [id], (err, results) => {
        if (err) {
            console.error('Erreur lors de l\'exécution de la requête :', err);
            return res.status(500).send('Erreur serveur');
        }
        res.json(results);
    });
});

app.post('/accepter', (req, res) => {
    const { id } = req.body;
    const sql = 'UPDATE visites SET accept = 1 WHERE id = ?';
    db.query(sql, [id], (err, results) => {
        if (err) {
            console.error('Erreur lors de l\'exécution de la requête :', err);
            return res.status(500).send('Erreur serveur');
        }
        res.json({ message: 'Visite acceptée' });
    });
});

app.post('/refuser', (req, res) => {
    const { id } = req.body;
    const sql = 'DELETE FROM visites WHERE id = ?';
    db.query(sql, [id], (err, results) => {
        if (err) {
            console.error('Erreur lors de l\'exécution de la requête :', err);
            return res.status(500).send('Erreur serveur');
        }
        res.json({ message: 'Visite refusée' });
    });
});

app.post('/upload', upload.single('file'), (req, res) => {
    const file = req.file;
    const name = req.body.name;
    const mois = req.body.mois;
    const annee = req.body.annee;
    if (!file) {
        return res.status(400).send('No file uploaded.');
    }

    const sql = `UPDATE suivis_${name} SET file = ?, mime_type = ?, file_data = ? WHERE mois = ? AND annee = ?`;
    const values = [file.originalname, file.mimetype, file.buffer, mois, annee];

    db.query(sql, values, (err, results) => {
        if (err) {
            console.error('Error inserting file into database:', err);
            return res.status(500).send('Error uploading file.');
        }
        res.send('File uploaded successfully.');
    });
});

app.get('/files', (req, res) => {
    const mois = req.query.mois;
    const annee = req.query.annee;
    const nom = req.query.nom;

    const sql = `SELECT file, mime_type, file_data FROM suivis_${nom} WHERE mois = ? AND annee = ?`;
    db.query(sql, [mois, annee], (err, results) => {
        if (err) {
            console.error('Error retrieving files from database:', err);
            return res.status(500).send('Error retrieving files.');
        }

        if (results.length === 0) {
            return res.status(404).send('No files found.');
        } else {
            const file = results[0];
            const fileName = file.file;
            if (fileName != null) {
                const mimeType = file.mime_type;
                const fileData = file.file_data;
                const fileDataBase64 = Buffer.from(fileData).toString('base64');
                res.json({ filename: fileName, mimeType: mimeType, fileData: fileDataBase64 });
            } else {
                return res.status(404).send('No files found.');
            }

        }
    });
});

app.get('/ent-par', (req, res) => {
    const sql = 'SELECT * FROM users WHERE situation = "entreprise" AND partenariat = 0';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Erreur lors de l\'exécution de la requête :', err);
            res.status(500).send('Erreur serveur');
            return;
        }
        res.json(results);
    });
});

app.get('/ent-par-2', (req, res) => {
    const sql = 'SELECT * FROM users WHERE situation = "entreprise" AND partenariat = 1';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Erreur lors de l\'exécution de la requête :', err);
            res.status(500).send('Erreur serveur');
            return;
        }
        res.json(results);
    });
});

app.post('/add-ent-par', (req, res) => {
    const { idEnt } = req.body;
    const sql = 'UPDATE users SET partenariat = 1 WHERE id = ?';
    db.query(sql, [idEnt], (err, results) => {
        if (err) {
            console.error('Erreur lors de l\'exécution de la requête :', err);
            return res.status(500).send('Erreur serveur');
        }
        res.json({ message: 'Partenariat ajouté' });
    });
});

app.post('/contact', (req, res) => {
    const { email, message } = req.body;

    const mailOptions = {
        from: `"${process.env.EMAIL_FROM_NAME}" <${process.env.EMAIL_USER}>`,
        to: process.env.EMAIL_SEND,
        subject: "Nouveau message via le suivi STN",
        text: `Email : ${email}\nMessage : ${message}`
    }

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.error('Error sending email:', err);
            return res.status(500).json({ message: 'Erreur serveur' });
        } else {
            console.log('Email sent:', info.response);
            res.json({ message: 'Email envoyé' });
        }
    });
});

app.post('/reset-ent-par', (req, res) => {
    const { idEnt } = req.body;
    const sql = 'UPDATE users SET partenariat = 0 WHERE id = ?';
    db.query(sql, [idEnt], (err, results) => {
        if (err) {
            console.error('Erreur lors de l\'exécution de la requête :', err);
            return res.status(500).send('Erreur serveur');
        }
        res.json({ message: 'Partenariat ajouté' });
    });
});

app.get('/opt-delete', (req, res) => {
    const sql = 'SELECT * FROM users WHERE situation != "autre"';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Erreur lors de l\'exécution de la requête :', err);
            res.status(500).send('Erreur serveur');
            return;
        }
        res.json(results);
    });
});
