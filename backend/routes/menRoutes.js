const express = require('express');
const router = express.Router();
const { getAllmenProducts, getMenProductById } = require('../controllers/menController');

// Route to get all men's products
router.get('/', getAllmenProducts);

// Route to get a men's product by ID
router.get('/:id', getMenProductById);

module.exports = router;
