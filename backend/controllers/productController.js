// controllers/productController.js

const Product = require("../models/Product");

// Récupérer tous les produits
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors du chargement des produits." });
    }
};

// Ajouter un produit
exports.addProduct = async (req, res) => {
    try {
        const newProduct = new Product(req.body);
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de l'ajout du produit." });
    }
};

// 🔥 Récupérer un produit par son ID
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Produit non trouvé." });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération du produit." });
    }
};
