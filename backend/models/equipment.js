const mongoose = require('mongoose');

const equipmentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String,
        required: true
    },
    page_url: {
        type: String,
        required: true
    }
});

const Equipment = mongoose.model('Equipment', equipmentSchema);

module.exports = Equipment;
