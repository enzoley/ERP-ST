const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('www'));

// Nodemailer transporter configuration
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
    }
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'www', 'index.html'));
  });

// Route to handle form submission
app.post('/send-email', (req, res) => {
    const { nom, prenom, email, message } = req.body;

    const mailOptions = {
        from: process.env.EMAIL,
        to: 'manclaus9@gmail.com',
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
