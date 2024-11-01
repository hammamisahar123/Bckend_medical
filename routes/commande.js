const express = require('express');
const router = express.Router();
const commandeController = require('../controllers/commandeController');

router.post("/api/add_commande", commandeController.add_commande);
router.get('/api/getcommandeByDate/:_Date', commandeController.getcommandeByDate);
router.get("/api/get_commande", commandeController.getcommande);
router.put("/api/updatecommande/:_id", commandeController.updatecommande);
router.delete("/api/delete_commande/:id", commandeController.deletecommande); // Changed to delete_commande

module.exports = router;

