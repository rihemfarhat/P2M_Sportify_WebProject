// /models/coachModel.js
const mongoose = require('mongoose');

// Définition du schéma pour les informations du coach
const coachSchema = new mongoose.Schema({
  coachId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Coach',
    required: true, // ✅ sinon il déclenche ton erreur actuelle
  },
  specialty: { type: String, required: true },
  yearsOfExperience: { type: Number, required: true },
  certifications: { type: String },
  bio: { type: String },
  teachingMethods: { type: String },
  targetAudience: { type: String },
});

// Création du modèle basé sur le schéma
const Coach = mongoose.model('CoachInfo', coachSchema); // Spécifier la collection 'coaches'

module.exports = Coach;
