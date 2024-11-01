const mongoose = require("mongoose");

// Définition du schéma
const dataSchema = new mongoose.Schema({
    coordonnees: {
        nom: { type: String, required: true },
        prenom: { type: String, required: true },
        adresse: { type: String, required: true },
        telephone: { 
            type: String, 
            required: true,
        },
        email: { 
            type: String, 
            required: true,
           
        }
    },
    consultations:{
        motif: { type: String, required: true },
        symptome: { type: String, required: true }, // Ajout du symptôme
        pression: { type: String, required: true }, // Ajout de la pression artérielle
        glycemie: { type: String, required: true }, // Ajout de la glycémie
        poids: { type: String, required: true }, // Ajout du poids
        taille: { type: String, required: true }, // Ajout de la taille
    },
    ordonnances: {
        
            nom: { type: String, required: true },
            medicaments:{type: String, required: true}, 
           posologie: { type: String, required: true },
           description: { type: String },
            
            medecin: {
                nom: { type: String, required: true }, // Nom du médecin
                contact: { type: String, required: true } // Contact du médecin
            }
        }
   
});

// Export du modèle
const Dossier = mongoose.model("Dossiers", dataSchema);

module.exports = Dossier;
