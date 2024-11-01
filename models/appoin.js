const mongoose = require('mongoose');

// Définir le schéma de l'adresse
const adresseSchema = new mongoose.Schema({
  ville: { type: String, required: true },
  rue: { type: String, required: true }
});

// Définir le schéma du formulaire
const formulaireSchema = new mongoose.Schema({
  name: { type: String, required: true },
  prenom: { type: String, required: true },
  Datenai: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  adresse: { type: adresseSchema, required: true },
  genre: { type: String, required: true } // Assurez-vous que le champ est défini en tant que 'genre'
});

// Définir le schéma du rendez-vous
const rendezvousSchema = new mongoose.Schema({
  formulaire: { type: formulaireSchema, required: true },
  date: { type: String, required: true }, // Assurez-vous que ce champ est bien 'date'
  time: { type: String, required: true }
});

module.exports = mongoose.model('Rendezvous', rendezvousSchema);
