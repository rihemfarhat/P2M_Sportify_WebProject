const Video = require('../models/Video');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Dossier d'upload
const uploadDir = './uploads/';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Config multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// Filtrage pour accepter seulement vidéo ou images
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['video/mp4', 'video/mov', 'image/jpeg', 'image/png', 'image/jpg'];
  if (allowedTypes.includes(file.mimetype)) cb(null, true);
  else cb(new Error('Type de fichier non autorisé'), false);
};

const upload = multer({ storage, fileFilter });

// Middleware pour uploader une vidéo et plusieurs images
const uploadMedia = upload.fields([
  { name: 'video', maxCount: 1 },
  { name: 'images', maxCount: 5 } // tu peux ajuster le nombre
]);

// Enregistrement de la vidéo + images
const saveMedia = async (req, res) => {
  try {
    const { title, description, duration, level } = req.body;
    const videoFile = req.files['video'] ? req.files['video'][0] : null;
    const imageFiles = req.files['images'] || [];

    if (!videoFile && imageFiles.length === 0) {
      return res.status(400).json({ message: "Une vidéo ou des images sont requises." });
    }

    const newVideo = new Video({
      filename: videoFile?.filename || '',
      originalname: videoFile?.originalname || '',
      coachName: req.coachName || 'Inconnu',
      coachId: req.coachId,
      title,
      description,
      duration,
      level,
      images: imageFiles.map(f => ({
        filename: f.filename,
        originalname: f.originalname
      }))
    });

    await newVideo.save();
    res.status(201).json({ message: "Contenu enregistré avec succès", media: newVideo });
  } catch (error) {
    console.error("Erreur upload :", error);
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

module.exports = { uploadMedia, saveMedia };
