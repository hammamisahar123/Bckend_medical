// controllers/emailController.js
const nodemailer = require('nodemailer');
const email = require('../models/Email');

// Fonction pour envoyer l'email de réinitialisation de mot de passe
exports.sendResetPasswordEmail = async (req, res) => {
  const { email } = req.body;

  try {
    // Vérifier si l'utilisateur existe
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé.' });
    }

    // Créer un transporteur avec Nodemailer (exemple avec Gmail)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Options de l'email
    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: 'Réinitialisation du mot de passe',
      text: `Bonjour, cliquez sur ce lien pour réinitialiser votre mot de passe : http://example.com/reset-password?email=${email}`,
    };

    // Envoyer l'email
    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Email de réinitialisation envoyé avec succès.' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de l\'envoi de l\'email.' });
  }
};
