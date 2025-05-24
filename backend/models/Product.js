const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    title: { type: String, required: true },
    price: { type: String, required: true },
    link: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    source: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model("Product", ProductSchema);