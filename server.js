const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// Nodemailer transporter configuration
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'votre-email@gmail.com',
        pass: 'votre-mot-de-passe'
    }
});

// Route to handle form submission
app.post('/send-email', (req, res) => {
    const { nom, prenom, email, message } = req.body;

    const mailOptions = {
        from: 'votre-email@gmail.com',
        to: 'adresse-destination@example.com',
        subject: 'Nouveau message du formulaire de contact',
        text: `Nom: ${nom}\nPrénom: ${prenom}\nEmail: ${email}\nMessage: ${message}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send(error.toString());
        }
        res.status(200).send('Email envoyé: ' + info.response);
    });
});

app.listen(port, () => {
    console.log(`Serveur en cours d'exécution sur http://localhost:${port}`);
});
