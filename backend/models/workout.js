const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, 'Le nom est obligatoire'],
    trim: true
  },
  description: { 
    type: String, 
    required: [true, 'La description est obligatoire'] 
  },
  duration: { 
    type: Number, 
    required: true,
    min: [1, 'La durée doit être au moins 1 minute']
  },
  difficulty: {
    type: String,
    enum: ['beginner', 'intermediate', 'expert'],
    required: true
  },
  images: [{ 
    type: String,
    validate: {
      validator: function(v) {
        // Autorise les URLs commençant par http(s) OU les chemins relatifs /uploads/...
        return /^https?:\/\/.+/.test(v) || /^\/uploads\/.+/.test(v);
      },
      message: 'URL invalide'
    }
  }],
// Dans workoutModel.js
Objectif: {  // ← Majuscule ici pour matcher la DB
  type: String,
  required: [true, 'L\'objectif est obligatoire'],
  enum: ['Muscle-building exercises', 'Cardio exercises', 'Weight loss exercises', 'Mobility and flexibility exercises', 'Core strengthening exercises'],
  trim: true

  }
}, {  collection: 'Workouts_classified', // Option recommandée
 timestamps: true });

module.exports = mongoose.model('Workout', workoutSchema);
