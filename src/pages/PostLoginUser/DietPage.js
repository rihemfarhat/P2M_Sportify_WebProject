import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../../style/PostLoginUser/DietPage.css';

const DietPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    return (
      <div className="diet-error">
        <p className="diet-error-text">Aucune donnée de quiz reçue. 😢</p>
        <button
          className="diet-button"
          onClick={() => navigate('/quiz')}
        >
          Revenir au quiz
        </button>
      </div>
    );
  }

  const { goal, activityLevel, dietaryPreference } = state;

  const generatePlan = () => {
    const baseCalories = {
      faible: 1800,
      modéré: 2200,
      élevé: 2600,
    };

    const preferenceDetails = {
      omnivore: {
        foods: ['Poulet grillé', 'Poisson', 'Légumes vapeur', 'Œufs', 'Riz complet'],
      },
      végétarien: {
        foods: ['Légumineuses', 'Tofu', 'Quinoa', 'Légumes variés', 'Fruits secs'],
      },
      végan: {
        foods: ['Tofu', 'Tempeh', 'Légumes verts', 'Fruits', 'Graines de chia'],
      },
    };

    let calories = baseCalories[activityLevel];

    if (goal === 'perte de poids') calories -= 400;
    if (goal === 'prise de masse') calories += 400;

    return {
      calories,
      foods: preferenceDetails[dietaryPreference]?.foods || [],
    };
  };

  const plan = generatePlan();

  return (
    <div className="diet-container">
      <h2 className="diet-title">Ton plan alimentaire 🔥</h2>

      <p className="diet-info"><strong>🎯 Objectif :</strong> {goal}</p>
      <p className="diet-info"><strong>💪 Activité :</strong> {activityLevel}</p>
      <p className="diet-info"><strong>🥗 Préférence :</strong> {dietaryPreference}</p>

      <p className="diet-calories">
        Calories journalières estimées : <span>{plan.calories} kcal</span>
      </p>

      <h3 className="diet-subtitle">🍽️ Aliments recommandés :</h3>
      <ul className="diet-list">
        {plan.foods.map((food, idx) => (
          <li key={idx}>{food}</li>
        ))}
      </ul>

      <button
        onClick={() => navigate('/quiz')}
        className="diet-button"
      >
        Refaire le quiz
      </button>
    </div>
  );
};

export default DietPage;
