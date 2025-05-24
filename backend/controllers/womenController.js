const WomenProduct = require('../models/WomenProduct');

// GET all women products
const getAllWomenProducts = async (req, res) => {
    try {
        const products = await WomenProduct.find({});
        res.status(200).json(products);
    } catch (error) {
        console.error("Erreur lors de la récupération des produits femmes :", error);
        res.status(500).json({ message: "Erreur serveur" });
    }
};

// GET a single women product by ID
const getWomenProductById = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await WomenProduct.findById(id); // Rechercher le produit par ID
        if (!product) {
            return res.status(404).json({ message: "Produit non trouvé" });
        }
        res.status(200).json(product); // Retourner le produit trouvé
    } catch (error) {
        console.error("Erreur lors de la récupération du produit féminin :", error);
        res.status(500).json({ message: "Erreur serveur" });
    }
};

module.exports = {
    getAllWomenProducts,
    getWomenProductById, // Assurer que la fonction est exportée
};
