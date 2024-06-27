const express = require('express');
const router = express.Router();
const medecinController = require('../controllers/medecinController');

router.post("/api/add_medecin", medecinController.add_medecin);
router.delete("/api/delet_medecin/:id", medecinController.delet_medecin);
router.get("/api/get_medecin", medecinController.get_medecin);
router.get("/api/get_medecin_byName/:_Nom", medecinController.get_medecin_byName);

module.exports = router;
