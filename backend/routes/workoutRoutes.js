const express = require('express');
const router = express.Router();
const workoutController = require('../controllers/workoutController');

// Route corrigée
router.get('/', workoutController.getAllWorkouts); // GET /api/workouts
router.post('/', workoutController.createWorkout); // POST /api/workouts

module.exports = router;