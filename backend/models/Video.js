const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  coachName: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  duration: { type: String, required: true },
  level: { type: String, required: true },
  filename: { type: String }, // nom du fichier vidéo
  images: [{ filename: String }] // images optionnelles
});

module.exports = mongoose.model('Video', videoSchema);
