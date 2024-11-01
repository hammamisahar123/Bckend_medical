const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Route pour réinitialiser le mot de passe
router.post('/sendResetPasswordEmail', authController.sendResetPasswordEmail);

module.exports = router;
