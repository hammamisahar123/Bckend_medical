const express = require('express');
const router = express.Router();
const profilpController = require('../controllers/profilpController'); // Correction du nom
const upload = require('../middlewares/uploadFile');


// Ajouter un patient avec téléchargement d'image
router.post("/api/addpatient", upload.single("image"), profilpController.addpatient);

// Mettre à jour un patient (id requis)
router.put("/api/updatepatient/:id", profilpController.updatepatient); // Ajout du paramètre id

// Supprimer un patient (id requis)
router.delete("/api/deletepatient/:id", profilpController.deletepatient); // Correction du nom de la fonction et ajout de l'id

// Obtenir tous les patients
router.get("/api/getpatients", profilpController.getpatient); // Correction du nom pour plus de clarté (getpatients)
router.get("/api/getpatientByEmail/:attribute", profilpController.getpatientByEmail); // Correction du nom pour plus de clarté (getpatients)


module.exports = router;
