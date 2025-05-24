// /routes/articleRoutes.js
const express = require('express');
const router = express.Router();
const articleController = require('../controllers/articles');

// Route pour récupérer les articles
router.get('/', articleController.getArticles);

module.exports = router;
