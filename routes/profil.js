const express = require('express');
const router = express.Router();
const profilController = require('../controllers/profilController');
const upload = require("../middlewares/uploadFile")


router.post("/api/add_profil", upload.single("image"),profilController.add_profil);
router.delete("/api/delet_profil", profilController.delet_profil);
router.get("/api/get_profil_by_email/:email", profilController.get_profil_by_email);
router.put('/api/update_profil/:id', profilController.update_profil);


module.exports = router;