// models/accessoire.js
const mongoose = require('mongoose');

const accessoireSchema = new mongoose.Schema({
    title: String,
    price: String,
    link: String,
    image: String,
    page_url: String,
});

module.exports = mongoose.model('Accessoire', accessoireSchema);

