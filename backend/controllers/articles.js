// /controllers/articleController.js
const Article = require('../models/articles');

// Fonction pour récupérer les articles depuis MongoDB
const getArticles = async (req, res) => {
  try {
    const articles = await Article.find(); // Récupère tous les articles
    res.json(articles); // Retourne les articles en réponse JSON
  } catch (error) {
    console.error("Erreur lors de la récupération des articles:", error);
    res.status(500).json({ message: "Erreur du serveur" }); // Erreur serveur
  }
};

module.exports = { getArticles }; // Exporte la fonction pour l'utiliser dans les routes
