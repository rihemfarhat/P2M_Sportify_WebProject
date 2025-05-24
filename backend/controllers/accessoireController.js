// controllers/accessoireController.js
const Accessoire = require('../models/accessoire');

// Get all accessories
exports.getAllAccessoires = async (req, res) => {
    try {
        const accessoires = await Accessoire.find();
        res.status(200).json(accessoires);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching accessories', error: err });
    }
};

// Add a new accessory
exports.addAccessoire = async (req, res) => {
    const { title, price, link, image, page_url } = req.body;
    try {
        const newAccessoire = new Accessoire({
            title,
            price,
            link,
            image,
            page_url
        });
        await newAccessoire.save();
        res.status(201).json({ message: 'Accessoire added successfully', accessoire: newAccessoire });
    } catch (err) {
        res.status(500).json({ message: 'Error adding accessoire', error: err });
    }
};

// Get accessory by ID
exports.getAccessoireById = async (req, res) => {
    const { id } = req.params;
    try {
        const accessoire = await Accessoire.findById(id);
        if (!accessoire) {
            return res.status(404).json({ message: 'Accessoire not found' });
        }
        res.status(200).json(accessoire);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching accessoire', error: err });
    }
};
