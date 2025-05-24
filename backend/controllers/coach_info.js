// /controllers/coachController.js
const Coach = require('../models/coach_info');

// Fonction pour enregistrer les informations du coach
// /controllers/coachController.js
const saveCoachInfo = async (req, res) => {
    console.log(req.body);  // Log des données envoyées par le frontend
  
    const { specialty, yearsOfExperience, certifications, bio, teachingMethods, targetAudience } = req.body;
  
    if (!specialty || !yearsOfExperience) {
      return res.status(400).json({ message: 'Specialty and years of experience are required.' });
    }
  
    const newCoach = new Coach({
      specialty,
      yearsOfExperience,
      certifications,
      bio,
      teachingMethods,
      targetAudience,
    });
  
    try {
      await newCoach.save();
      return res.status(201).json({ message: 'Coach information saved successfully' });
    } catch (error) {
      console.error('Error saving coach data:', error);
      return res.status(500).json({ message: 'Error saving coach data' });
    }
  };
  
module.exports = { saveCoachInfo };
