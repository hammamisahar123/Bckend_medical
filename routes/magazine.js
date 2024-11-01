const express = require('express');
const router = express.Router();
const magazineController = require('../controllers/magazineController');
const upload = require("../middlewares/uploadFile")
router.post("/api/addMagazine",upload.single("imageUrl"), magazineController.addMagazine);
router.delete("/api/delet_magazine/:id", magazineController.deleteMagazine);
router.get("/api/getMagazines", magazineController.getMagazines);
router.put("/api/update_magazine/:id", magazineController.updateMagazine);

module.exports = router;
