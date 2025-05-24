const express = require('express');
const router = express.Router();
const { uploadMedia, saveMedia } = require('../controllers/videoController');
const Video = require('../models/Video');

router.post('/upload', uploadMedia, saveMedia);

router.get('/', async (req, res) => {
  try {
    const videos = await Video.find().sort({ createdAt: -1 });
    res.status(200).json(videos);
  } catch (error) {
    console.error('Erreur récupération vidéos:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

module.exports = router;
