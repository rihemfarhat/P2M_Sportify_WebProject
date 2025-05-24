const mongoose = require('mongoose');

const menProductSchema = new mongoose.Schema({}, { strict: false });

const menProduct = mongoose.model('menProduct', menProductSchema, 'men');

module.exports = menProduct;
