const express = require('express');
const router = express.Router();
const dossierController = require('../controllers/DossierController');

router.post("/api/add_dossier", dossierController.add_dossier);
router.get("/api/get_dossier", dossierController.get_dossier);
router.put("/api/updatedossier/:id", dossierController.updatedossier);
router.delete("/api/deletdossier/:id", dossierController.deletdossier);

module.exports = router;