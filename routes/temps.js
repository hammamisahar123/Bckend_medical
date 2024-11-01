const express = require('express');
const router = express.Router();
const timeController = require('../controllers/tempsController');

router.post("/api/add_temps", timeController.add_temps);
router.put("/api/update_temps/:id", timeController.update_temps);
router.delete("/api/delet_temps/:id", timeController.delet_temps);
router.get("/api/get_temps_byId/:_Id", timeController.get_temps_byId);
router.get("/api/get_temps_byDate/:date", timeController.get_temps_byDate);


module.exports = router;
