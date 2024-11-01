const express = require('express');
const router = express.Router();
const productController = require('../controllers/produitsController');
const upload = require("../middlewares/uploadFile")

router.post("/api/addproduits",upload.single("image"), productController.addproduits);
router.post("/api/add_produits", productController.add_produits);


router.get("/api/get_produits", productController.get_produits);
router.get("/api/get_produits_byName/:_Nom", productController.get_produits_byName);
router.get("/api/get_produits_byCategorie/:_Categorie", productController.get_produits_byCategorie);
router.get("/api/get_produits_byType/:_Type", productController.get_produits_byType);
router.put("/api/updateproduits/:id", productController.updateproduits);
router.delete("/api/deletproduits/:id", productController.deletproduits);

module.exports = router;
