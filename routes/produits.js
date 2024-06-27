const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.post("/api/add_produits", productController.addProduct);
router.get("/api/get_produits", productController.getProducts);
router.get("/api/get_produits_byName/:_Nom", productController.getProductsByName);
router.get("/api/get_produits_byCategorie/:_Categorie", productController.getProductsByCategorie);
router.get("/api/get_produits_byType/:_Type", productController.getProductsByType);
router.put("/api/updateproduits/:id", productController.updateProduct);
router.delete("/api/deletproduits/:id", productController.deleteProduct);

module.exports = router;
