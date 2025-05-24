const mongoose = require("mongoose");

const ArticleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  link: { type: String, required: true }, // URL de l'article
  summary: { type: String, required: true }, // Extrait de l'article
  author: { type: String, required: true }, // Auteur de l'article
  date_published: { type: Date, required: true }, // Date de publication
  image_url: { type: String, default: null }, // URL de l'image (si présente)
});

module.exports = mongoose.model("Article", ArticleSchema);
