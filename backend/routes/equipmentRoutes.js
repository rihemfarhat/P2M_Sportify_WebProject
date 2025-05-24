const express = require('express');
const equipmentController = require('../controllers/equipmentController');
const router = express.Router();

// Récupérer tous les équipements
router.get('/equipment', equipmentController.getAllEquipment);

// Ajouter un nouvel équipement
router.post('/equipment', equipmentController.addEquipment);

// Récupérer un équipement par ID
router.get('/equipment/:id', equipmentController.getEquipmentById);

module.exports = router;
