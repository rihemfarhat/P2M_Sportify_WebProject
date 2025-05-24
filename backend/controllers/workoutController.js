const Workout = require('../models/workout');

exports.getAllWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find({}); // {} pour récupérer tous les documents
    if (!workouts || workouts.length === 0) {
      return res.status(404).json({ message: "Aucun workout trouvé" });
    }
    res.status(200).json(workouts);
  } catch (error) {
    console.error("Erreur MongoDB:", error);
    res.status(500).json({ 
      message: "Erreur serveur",
      error: error.message 
    });
  }
};

exports.createWorkout = async (req, res) => {
  try {
    const newWorkout = await Workout.create(req.body);
    res.status(201).json(newWorkout);
  } catch (error) {
    res.status(400).json({ 
      message: "Données invalides",
      error: error.message 
    });
  }
};