const express = require('express');
const router = express.Router();
const CoachInfo = require('../models/coach_info');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware(), async (req, res) => {
    try {
      const coachId = req.user.id || req.user._id;
  
      if (!coachId) {
        return res.status(400).json({ message: 'Coach ID manquant.' });
      }
  
      const coachInfo = new CoachInfo({
        coachId,
        specialty: req.body.specialty,
        yearsOfExperience: req.body.yearsOfExperience,
        certifications: req.body.certifications,
        bio: req.body.bio,
        teachingMethods: req.body.teachingMethods,
        targetAudience: req.body.targetAudience,
      });
  
      const saved = await coachInfo.save();
      res.status(201).json(saved);
    } catch (error) {
      console.error("Erreur backend :", error);
      res.status(500).json({ message: 'Erreur serveur', error: error.message });
    }
  });
  

module.exports = router;
