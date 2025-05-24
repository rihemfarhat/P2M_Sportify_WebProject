const mongoose = require('mongoose');

const womenProductSchema = new mongoose.Schema({}, { strict: false });

const WomenProduct = mongoose.model('WomenProduct', womenProductSchema, 'women');

module.exports = WomenProduct;
