const MenProduct = require('../models/MenProduct');

// GET all men products
const getAllmenProducts = async (req, res) => {
    try {
        const products = await MenProduct.find({});
        res.status(200).json(products);
    } catch (error) {
        console.error("Erreur lors de la récupération des produits hommes :", error);
        res.status(500).json({ message: "Erreur serveur" });
    }
};

// GET a single men product by ID
const getMenProductById = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await MenProduct.findById(id);
        if (!product) {
            return res.status(404).json({ message: "Produit non trouvé" });
        }
        res.status(200).json(product);
    } catch (error) {
        console.error("Erreur lors de la récupération du produit homme :", error);
        res.status(500).json({ message: "Erreur serveur" });
    }
};

module.exports = {
    getAllmenProducts,
    getMenProductById,
};
