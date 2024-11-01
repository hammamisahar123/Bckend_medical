const mongoose = require('mongoose');

// Schéma des produits pour la commande
const produitCommandeSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    prix: { 
        type: Number, 
        required: true 
    },
    quantite: { 
        type: Number, 
        required: true 
    }
});

// Schéma de la commande
const commandeSchema = new mongoose.Schema({
    nom: {
        type: String,
        required: true
    },
    prenom: {
        type: String,
        required: true
    },
    adresse: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    telephone: {
        type: String,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    produits: [produitCommandeSchema], // Tableau de produits commandés
    date_commande: {
        type: Date,
    },
});

// Export du modèle Commande
module.exports = mongoose.model('Commande', commandeSchema);
