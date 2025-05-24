const express = require('express');
const router = express.Router();

const { getAllAccessoires, addAccessoire, getAccessoireById } = require('../controllers/accessoireController');

router.get('/', getAllAccessoires);         // http://localhost:5000/api/accessoires
router.post('/', addAccessoire);            // http://localhost:5000/api/accessoires
router.get('/:id', getAccessoireById);      // http://localhost:5000/api/accessoires/:id

module.exports = router;
