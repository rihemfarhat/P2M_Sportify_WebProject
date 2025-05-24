import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faTwitter, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';
import logo from '../../assets/images/logo.png'; // Ensure the path to the logo is correct

import '../../style/PostLoginUser/DietQuiz.css';

const DietQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [dietResult, setDietResult] = useState(null);

  const questions = [
    {
      question: "What's your primary health goal?",
      options: [
        { text: "Weight loss", value: "weightLoss" },
        { text: "Muscle gain", value: "muscleGain" },
        { text: "Better digestion", value: "digestion" },
        { text: "More energy", value: "energy" }
      ]
    },
    {
      question: "How do you feel about carbs?",
      options: [
        { text: "Love them, can't live without", value: "carbsLove" },
        { text: "Enjoy in moderation", value: "carbsModerate" },
        { text: "Prefer to minimize them", value: "carbsMinimal" },
        { text: "Only from vegetables/fruits", value: "carbsVeggies" }
      ]
    },
    {
      question: "Your protein preference?",
      options: [
        { text: "Meat lover", value: "proteinMeat" },
        { text: "Plant-based", value: "proteinPlant" },
        { text: "Dairy/eggs", value: "proteinDairy" },
        { text: "Mix of all", value: "proteinMix" }
      ]
    },
    {
      question: "Favorite meal type?",
      options: [
        { text: "Big hearty meals", value: "mealHearty" },
        { text: "Small frequent meals", value: "mealFrequent" },
        { text: "One-pot meals", value: "mealOnePot" },
        { text: "Raw/simple foods", value: "mealRaw" }
      ]
    },
    {
      question: "How strict can you be?",
      options: [
        { text: "Very disciplined", value: "strictHigh" },
        { text: "Moderately strict", value: "strictModerate" },
        { text: "Flexible approach", value: "strictFlexible" },
        { text: "Don't want restrictions", value: "strictNone" }
      ]
    }
  ];

  const dietResults = {
    mediterranean: {
      id: 'mediterranean',
      title: "Mediterranean Diet",
      description: "Focuses on fruits, vegetables, whole grains, olive oil, and moderate amounts of fish and poultry. Great for heart health and longevity.",
      benefits: [
        "Reduces heart disease risk",
        "Promotes brain health",
        "Sustainable long-term"
      ]
    },
    keto: {
      id: 'keto',
      title: "Keto Diet",
      description: "High-fat, very low-carb diet that puts your body into ketosis. Effective for quick weight loss and mental clarity.",
      benefits: [
        "Rapid weight loss",
        "Reduced blood sugar levels",
        "May improve focus"
      ]
    },
    plantBased: {
      id: 'plant-based',
      title: "Plant-Based Diet",
      description: "Emphasizes whole, minimally processed plants. Excellent for digestion, energy, and ethical eating.",
      benefits: [
        "High in nutrients",
        "Environmentally friendly",
        "May reduce disease risk"
      ]
    },
    paleo: {
      id: 'paleo',
      title: "Paleo Diet",
      description: "Based on foods presumed to be available to Paleolithic humans. Good for those who prefer natural, unprocessed foods.",
      benefits: [
        "Eliminates processed foods",
        "High in protein",
        "May reduce inflammation"
      ]
    },
    flexitarian: {
      id: 'flexitarian',
      title: "Flexitarian Diet",
      description: "Mostly vegetarian with occasional meat. Perfect balance for those who want benefits of plant-based without strict rules.",
      benefits: [
        "Flexible approach",
        "Easy to maintain",
        "Healthier than standard diet"
      ]
    }
  };

  const handleAnswer = (value) => {
    const newAnswers = [...answers, value];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResult(newAnswers);
      setShowResult(true);
    }
  };

  const calculateResult = (userAnswers) => {
    const score = {
      mediterranean: 0,
      keto: 0,
      plantBased: 0,
      paleo: 0,
      flexitarian: 0
    };

    userAnswers.forEach(answer => {
      switch(answer) {
        case 'weightLoss':
          score.keto += 2;
          score.mediterranean += 1;
          break;
        case 'muscleGain':
          score.paleo += 2;
          score.mediterranean += 1;
          break;
        case 'digestion':
          score.plantBased += 2;
          score.flexitarian += 1;
          break;
        case 'energy':
          score.mediterranean += 2;
          score.plantBased += 1;
          break;
        case 'carbsLove':
          score.mediterranean += 2;
          score.flexitarian += 1;
          break;
        case 'carbsMinimal':
          score.keto += 2;
          score.paleo += 1;
          break;
        case 'proteinPlant':
          score.plantBased += 2;
          score.flexitarian += 1;
          break;
        case 'proteinMeat':
          score.paleo += 2;
          score.keto += 1;
          break;
        case 'strictHigh':
          score.keto += 2;
          score.paleo += 1;
          break;
        case 'strictNone':
          score.flexitarian += 2;
          score.mediterranean += 1;
          break;
      }
    });

    const result = Object.keys(score).reduce((a, b) => score[a] > score[b] ? a : b);
    setDietResult(dietResults[result]);
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResult(false);
    setDietResult(null);
  };

  return (
    <div className="diet-quiz-page">

      <div className="quiz-container">
      <div className="coach-profile-logo-container">
        <Link to="/" className="logo-link"><img src={logo} alt="Logo" className="coach-profile-logo" /></Link>
      </div>
        <div className="quiz-header">
          <h1 className="quiz-title">Which Diet Is Right For You?</h1>
          <p className="quiz-subtitle">
            With so many diets out there—Mediterranean, low-carb, keto and beyond—it can be confusing to know where to start. But we've got you covered!
          </p>
        </div>
        
        {!showResult ? (
          <div className="quiz-question-container">
            <div className="quiz-progress">
              <div 
                className="progress-bar" 
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              ></div>
              <span>Question {currentQuestion + 1} of {questions.length}</span>
            </div>
            
            <h2 className="quiz-question">{questions[currentQuestion].question}</h2>
            
            <div className="quiz-options">
              {questions[currentQuestion].options.map((option, index) => (
                <button 
                  key={index}
                  className="quiz-option"
                  onClick={() => handleAnswer(option.value)}
                >
                  {option.text}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="quiz-result-container">
            <h2>Your Perfect Diet Match Is:</h2>
            <h1 className="result-title">{dietResult.title}</h1>
            
            <div className="result-content">
              <div className="result-details">
                <p className="result-description">{dietResult.description}</p>
                
                <h3>Key Benefits:</h3>
                <ul className="result-benefits">
                  {dietResult.benefits.map((benefit, index) => (
                    <li key={index}>{benefit}</li>
                  ))}
                </ul>
                
                <div className="result-actions">
                  <button className="restart-btn" onClick={restartQuiz}>
                    Retake Quiz
                  </button>
                  <Link to={`/diet/${dietResult.id}`} className="diet-details-link">
                    Learn More About This Diet
                  </Link>
                  
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DietQuiz;