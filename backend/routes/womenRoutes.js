const express = require('express');
const router = express.Router();
const { getAllWomenProducts,getWomenProductById } = require('../controllers/womenController');

// Route GET /api/women
router.get('/', getAllWomenProducts);
router.get('/:id', getWomenProductById);

module.exports = router;
