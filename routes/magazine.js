const express = require('express');
const router = express.Router();
const magazineController = require('./controllers/magazineController');

router.post("/api/add_magazine", magazineController.addMagazine);
router.delete("/api/delet_magazine/:id", magazineController.deleteMagazine);
router.get("/api/get_magazine", magazineController.getMagazines);
router.put("/api/update_magazine/:id", magazineController.updateMagazine);

module.exports = router;
