const express = require('express');
const router = express.Router();
const { register } = require('../controllers/userController');

// Route pour l'inscription
router.post('/register', register);

// Ajouter d'autres routes (login, mise à jour, suppression, etc.)

module.exports = router;
