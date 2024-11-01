const express = require('express');
const router = express.Router();
const profilmedController = require('../controllers/profilmedController');
const upload = require("../middlewares/uploadFile")


router.post("/api/addprofil", upload.single("image"),profilmedController.addprofil);
router.put("/api/updateprofil", profilmedController.updateprofil);
router.delete("/api/deletprofil", profilmedController.deletprofil);
router.get("/api/getprofil", profilmedController.getprofil);
router.get("/searchDoctors/:Prenom/:Nom", profilmedController.searchDoctors);

router.get("/api/getmedcinByEmail/:attribute", profilmedController.getmedcinByEmail); // Correction du nom pour plus de clarté (getpatients)



module.exports = router;