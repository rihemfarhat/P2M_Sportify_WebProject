// models/user.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Modèle utilisateur
const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  dob: Date,
  gender: String,
  height: Number,
  weight: Number,
});

// Méthode pour comparer le mot de passe
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
