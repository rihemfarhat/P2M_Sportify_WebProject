const mongoose = require('mongoose');
const fs = require('fs-extra');
const path = require('path');
const Workout = require('./models/workout'); // Attention : modèle Workout

mongoose.connect('mongodb://localhost:27017/authDB')
  .then(async () => {
    console.log('✅ Connecté à MongoDB');

    const folderPath = path.join(__dirname, 'exercises');

    const files = await fs.readdir(folderPath);
    
    const workouts = [];

    for (const file of files) {
      if (file.endsWith('.json')) {
        const filePath = path.join(folderPath, file);
        const exerciseData = await fs.readJson(filePath);

        // Vérifie que l'exercice a au moins une image
        if (exerciseData.images && exerciseData.images.length > 0) {
          const mappedWorkout = {
            name: exerciseData.name || "Nom inconnu",
            description: (exerciseData.instructions && exerciseData.instructions.length > 0)
              ? exerciseData.instructions.join(' ')
              : "Aucune description fournie",
            duration: 30,
            difficulty: exerciseData.level || "Inconnu",
            images: exerciseData.images.map(img => `/uploads/${img}`), // Toutes les images ici
          };

          workouts.push(mappedWorkout);
        } else {
          console.log(`⛔ Exercice ignoré (pas d'image) : ${exerciseData.name}`);
        }
      }
    }

    await Workout.deleteMany({});
    await Workout.insertMany(workouts);

    console.log(`✅ ${workouts.length} workouts avec images ont été ajoutés !`);
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error('❌ Erreur :', err);
  });
