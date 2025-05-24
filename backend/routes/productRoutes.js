const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

// Route pour récupérer tous les produits
router.get("/products", productController.getAllProducts);

// Route pour ajouter un produit
router.post("/products", productController.addProduct);

// Route pour récupérer un produit par ID
router.get("/products/:id", productController.getProductById);

module.exports = router;
