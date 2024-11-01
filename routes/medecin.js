const express = require('express');
const router = express.Router();
const medecinController = require('../controllers/medecinController');

// Route pour ajouter un médecin
router.post("/api/add_medecin", medecinController.add_medecin);

// Route pour supprimer un médecin par ID
router.delete("/api/delet_medecin/:id", medecinController.delet_medecin);

// Route pour récupérer un médecin par email
router.get("/api/get_Medecin_ByEmail/:email", medecinController.get_Medecin_ByEmail);

module.exports = router;

