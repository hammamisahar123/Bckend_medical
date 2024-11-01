// services/emailService.js
const nodemailer = require('nodemailer');

// Fonction pour configurer Nodemailer
const sendEmail = async (to, subject, text) => {
  try {
    // Configurer le transporteur SMTP (exemple avec Gmail)
    let transporter = nodemailer.createTransport({
      service: 'gmail', // Vous pouvez utiliser d'autres services comme Outlook, Yahoo, etc.
      auth: {
        user: process.env.EMAIL, // Votre adresse email
        pass: process.env.EMAIL_PASSWORD, // Votre mot de passe ou application-specific password
      },
    });

    // Options pour l'email
    let mailOptions = {
      from: process.env.EMAIL,
      to: to, // Email du destinataire
      subject: subject, // Sujet de l'email
      text: text, // Corps de l'email
    };

    // Envoyer l'email
    let info = await transporter.sendMail(mailOptions);
    console.log('Email envoyé : ' + info.response);
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email :', error);
    throw error;
  }
};

module.exports = sendEmail;
