import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import logo from '../assets/images/logo.png';
import { ChevronLeft, ChevronRight, Target, Award, Dumbbell, Clock, Heart, Flame, BarChart3 } from
"lucide-react";
import "../style/TrainingGoalsQuiz.css";
const questions = [
 {
 question: "What is your main fitness goal?",
 icon: <Target className="text-blue-500" size={28} />,
 options: [
 { text: "Build muscle", tag: "muscle", icon: <Dumbbell className="text-indigo-600" size={20} /> },
 { text: "Lose weight", tag: "weight", icon: <Flame className="text-orange-500" size={20} /> },
 { text: "Improve endurance", tag: "cardio", icon: <Heart className="text-red-500" size={20} /> },
 { text: "Increase mobility/flexibility", tag: "mobility", icon: <ChevronLeft className="text-green500" size={20} /> },
 { text: "Strengthen core/abs", tag: "core", icon: <BarChart3 className="text-yellow-500"
size={20} /> },
 ],
 },
 {
 question: "How often can you train per week?",
 icon: <Clock className="text-blue-500" size={28} />,
 options: [
 { text: "1–2 times", tag: "mobility", icon: <Clock className="text-gray-500" size={20} /> },
 { text: "3–4 times", tag: "weight", icon: <Clock className="text-blue-500" size={20} /> },
 { text: "5+ times", tag: "muscle", icon: <Clock className="text-purple-500" size={20} /> },
 ],
 },
 {
 question: "What is your current level?",
 icon: <Award className="text-blue-500" size={28} />,
 options: [
 { text: "Beginner", tag: "mobility", icon: <Award className="text-green-500" size={20} /> },
 { text: "Intermediate", tag: "weight", icon: <Award className="text-yellow-500" size={20} /> },
 { text: "Advanced", tag: "muscle", icon: <Award className="text-red-500" size={20} /> },
 ],
 },
 {
 question: "What kind of exercises do you prefer?",
 icon: <Dumbbell className="text-blue-500" size={28} />,
 options: [
 { text: "Weights or machines", tag: "muscle", icon: <Dumbbell className="text-gray-500"
size={20} /> },
 { text: "Bodyweight", tag: "core", icon: <Dumbbell className="text-blue-500" size={20} /> },
 { text: "Yoga or Pilates", tag: "mobility", icon: <Dumbbell className="text-purple-500" size={20}
/> },
 { text: "Running, cycling, swimming", tag: "cardio", icon: <Dumbbell className="text-green-500"
size={20} /> },
 ],
 },
 {
 question: "Do you have physical limitations or injuries?",
 icon: <Heart className="text-blue-500" size={28} />,
 options: [
 { text: "Yes", tag: "mobility", icon: <Heart className="text-red-500" size={20} /> },
 { text: "No", tag: "muscle", icon: <Heart className="text-green-500" size={20} /> },
 ],
 },
 {
 question: "Do you want to see physical transformation?",
 icon: <Flame className="text-blue-500" size={28} />,
 options: [
 { text: "Yes", tag: "muscle", icon: <Flame className="text-orange-500" size={20} /> },
 { text: "No", tag: "mobility", icon: <Flame className="text-blue-500" size={20} /> },
 ],
 },
 {
 question: "What is your top priority?",
 icon: <Target className="text-blue-500" size={28} />,
 options: [
 { text: "Burn fat", tag: "weight", icon: <Flame className="text-orange-500" size={20} /> },
 { text: "Build muscle", tag: "muscle", icon: <Dumbbell className="text-indigo-600" size={20} /> },
 { text: "Improve flexibility", tag: "mobility", icon: <ChevronLeft className="text-green-500"
size={20} /> },
 { text: "Improve cardio", tag: "cardio", icon: <Heart className="text-red-500" size={20} /> },
 ],
 },
 {
 question: "You're motivated by...",
 icon: <Flame className="text-blue-500" size={28} />,
 options: [
 { text: "Performance gains", tag: "muscle", icon: <BarChart3 className="text-indigo-600"
size={20} /> },
 { text: "Feeling lighter", tag: "weight", icon: <Flame className="text-orange-500" size={20} /> },
 { text: "Moving better", tag: "mobility", icon: <ChevronLeft className="text-green-500" size={20}
/> },
 { text: "Feeling strong", tag: "core", icon: <Dumbbell className="text-yellow-500" size={20} /> },
 ],
 },
 {
 question: "What do you want in the next 3 months?",
 icon: <Clock className="text-blue-500" size={28} />,
 options: [
 { text: "Reduce belly fat", tag: "weight", icon: <Flame className="text-orange-500" size={20} /> },
 { text: "Breathe better during exercise", tag: "cardio", icon: <Heart className="text-red-500"
size={20} /> },
 { text: "Lift heavier weights", tag: "muscle", icon: <Dumbbell className="text-indigo-600"
size={20} /> },
 { text: "Be more flexible", tag: "mobility", icon: <ChevronLeft className="text-green-500"
size={20} /> },
 ],
 },
 {
 question: "How is your diet?",
 icon: <Flame className="text-blue-500" size={28} />,
 options: [
 { text: "Balanced", tag: "muscle", icon: <BarChart3 className="text-green-500" size={20} /> },
 { text: "Caloric deficit", tag: "weight", icon: <Flame className="text-orange-500" size={20} /> },
 { text: "High protein", tag: "muscle", icon: <Dumbbell className="text-indigo-600" size={20} /> },
 { text: "Unstructured", tag: "mobility", icon: <BarChart3 className="text-gray-500" size={20} /> },
 ],
 },
 {
 question: "Is physical appearance important to you?",
 icon: <Heart className="text-blue-500" size={28} />,
 options: [
 { text: "Yes", tag: "muscle", icon: <Heart className="text-red-500" size={20} /> },
 { text: "No", tag: "mobility", icon: <Heart className="text-blue-500" size={20} /> },
 ],
 },
 {
 question: "What would you like to improve first?",
 icon: <Target className="text-blue-500" size={28} />,
 options: [
 { text: "Strength", tag: "muscle", icon: <Dumbbell className="text-indigo-600" size={20} /> },
 { text: "Mobility", tag: "mobility", icon: <ChevronLeft className="text-green-500" size={20} /> },
 { text: "Cardio", tag: "cardio", icon: <Heart className="text-red-500" size={20} /> },
 { text: "Abs & Core", tag: "core", icon: <BarChart3 className="text-yellow-500" size={20} /> },
 ],
 },
 {
 question: "Why are you working out?",
 icon: <Flame className="text-blue-500" size={28} />,
 options: [
 { text: "For an event", tag: "weight", icon: <Clock className="text-purple-500" size={20} /> },
 { text: "For general well-being", tag: "mobility", icon: <Heart className="text-green-500"
size={20} /> },
 { text: "After a long break", tag: "core", icon: <Dumbbell className="text-yellow-500" size={20}
/> },
 { text: "Doctor's advice", tag: "mobility", icon: <Heart className="text-blue-500" size={20} /> },
 ],
 },
 {
 question: "Which body part do you want to improve?",
 icon: <Target className="text-blue-500" size={28} />,
 options: [
 { text: "Upper body", tag: "muscle", icon: <Dumbbell className="text-indigo-600" size={20} /> },
 { text: "Lower body", tag: "muscle", icon: <Dumbbell className="text-green-500" size={20} /> },
 { text: "Abs / Core", tag: "core", icon: <BarChart3 className="text-yellow-500" size={20} /> },
 { text: "Whole body", tag: "weight", icon: <Flame className="text-orange-500" size={20} /> },
 ],
 },
 {
 question: "Do you have a measurable goal?",
 icon: <Target className="text-blue-500" size={28} />,
 options: [
 { text: "Yes", tag: "muscle", icon: <Target className="text-purple-500" size={20} /> },
 { text: "No, just want to move regularly", tag: "mobility", icon: <Heart className="text-green500" size={20} /> },
 ],
 },
];
// Goal definitions with motivational descriptions
const goalDefinitions = {
  muscle: {
    title: "Muscle-building exercises",
    description: "You're destined to build strength and sculpt your physique. Your ideal training will focus on progressive overload and targeted muscle development.",
    color: "bg-indigo-600",
    icon: <Dumbbell className="text-white" size={32} />,
    recommendations: [
      "Progressive resistance training 3-5 times per week",
      "Focus on compound movements like squats, deadlifts, and bench press",
      "Ensure adequate protein intake (1.6-2.2g per kg of bodyweight)",
      "Prioritize recovery with 48 hours between training the same muscle group"
    ],
    link: "/MuscleWorkouts" // Ajout du lien
  },
  weight: {
    title: "Weight loss and calorie-burning exercises",
    description: "Your path is to shed unwanted weight and reveal your best self. Your training will combine calorie-burning activities with strategic resistance work.",
    color: "bg-orange-500",
    icon: <Flame className="text-white" size={32} />,
    recommendations: [
      "Combine HIIT and steady-state cardio 3-4 times per week",
      "Add resistance training to preserve muscle while in a caloric deficit",
      "Consider a modest caloric deficit of 300-500 calories per day",
      "Track progress through measurements, not just the scale"
    ],
    link: "/WeightLossWorkouts" // Ajout du lien
  },
  cardio: {
    title: "Cardio exercises for improving endurance",
    description: "You're built for going the distance. Your training will focus on cardiovascular health and stamina to push your limits further.",
    color: "bg-red-500",
    icon: <Heart className="text-white" size={32} />,
    recommendations: [
      "Build aerobic base with zone 2 training (conversational pace)",
      "Progressive intervals to improve VO2 max",
      "Cross-training to prevent overuse injuries",
      "Proper carbohydrate intake to fuel longer sessions"
    ],
    link: "/CardioWorkouts" // Ajout du lien
  },
  mobility: {
    title: "Mobility and flexibility exercises",
    description: "Your journey is about freedom of movement and functional fitness. Your training will enhance flexibility, stability, and everyday performance.",
    color: "bg-green-500",
    icon: <ChevronLeft className="text-white" size={32} />,
    recommendations: [
      "Daily mobility routine focusing on problem areas",
      "Incorporate yoga or Pilates 2-3 times per week",
      "Balance active and passive stretching",
      "Focus on joint health and proper movement patterns"
    ],
    link: "/MobilityWorkouts" // Ajout du lien
  },
  core: {
    title: "Core and abdominal strengthening exercises",
    description: "Your foundation starts with a powerful center. Your training will build a functional, strong core to support all your movements and goals.",
    color: "bg-yellow-500",
    icon: <BarChart3 className="text-white" size={32} />,
    recommendations: [
      "Focus on all aspects of core: anti-rotation, flexion, extension",
      "Incorporate planks, hollow holds, and rotational exercises",
      "Train the core 3-4 times per week with progressive difficulty",
      "Proper breathing techniques to engage the deep core muscles"
    ],
    link: "/CoreWorkouts" // Ajout du lien
  }
};


export default function TrainingGoalsQuiz() {
 const [currentQuestion, setCurrentQuestion] = useState(0);
 const [answers, setAnswers] = useState(Array(questions.length).fill(null));
 const [submitted, setSubmitted] = useState(false);
 const [result, setResult] = useState(null);
 const [progress, setProgress] = useState(0);
 useEffect(() => {
 const answered = answers.filter(ans => ans !== null).length;
 setProgress((answered / questions.length) * 100);
 }, [answers]);
 const handleSelect = (optionIndex) => {
 const newAnswers = [...answers];
 newAnswers[currentQuestion] = optionIndex;
 setAnswers(newAnswers);
 };
 const handlePrevious = () => {
 if (currentQuestion > 0) {
 setCurrentQuestion(currentQuestion - 1);
 }
 };
 const handleNext = () => {
 if (answers[currentQuestion] !== null && currentQuestion < questions.length - 1) {
 setCurrentQuestion(currentQuestion + 1);
 }
 };
 const handleSubmit = () => {
 if (answers.includes(null)) {
 alert("Please answer all questions before submitting.");
 return;
 }
 const tags = answers.map((ans, i) => questions[i].options[ans].tag);
 const counts = tags.reduce((acc, tag) => {
 acc[tag] = (acc[tag] || 0) + 1;
 return acc;
 }, {});

 const sortedGoals = Object.entries(counts).sort((a, b) => b[1] - a[1]);
 const topGoal = sortedGoals[0][0];

 const total = Object.values(counts).reduce((sum, count) => sum + count, 0);
 const percentages = {};
 Object.entries(counts).forEach(([tag, count]) => {
 percentages[tag] = Math.round((count / total) * 100);
 });

 setResult({
 primaryGoal: topGoal,
 percentages: percentages
 });

 setSubmitted(true);
 };
 const resetQuiz = () => {
 setAnswers(Array(questions.length).fill(null));
 setCurrentQuestion(0);
 setSubmitted(false);
 setResult(null);
 };
 const getColorClass = (goal) => {
 switch (goal) {
 case 'muscle': return 'training-goals-quiz__color-indigo';
 case 'weight': return 'training-goals-quiz__color-orange';
 case 'cardio': return 'training-goals-quiz__color-red';
 case 'mobility': return 'training-goals-quiz__color-green';
 case 'core': return 'training-goals-quiz__color-yellow';
 default: return '';
 }
 };
 const renderProgressBar = () => {
 return (
 <div className="training-goals-quiz__progress-container">

 <div
 className="training-goals-quiz__progress-bar"
 style={{ width: `${progress}%` }}
 ></div>
 </div>
 );
 };
 const renderNavigation = () => {
 return (
 <div className="training-goals-quiz__navigation">
 <button
 onClick={handlePrevious}
 className={`training-goals-quiz__nav-button training-goals-quiz__nav-button--previous
${currentQuestion === 0 ? 'training-goals-quiz__nav-button--disabled' : ''}`}
 disabled={currentQuestion === 0}
 >
 <ChevronLeft size={20} />
 <span>Previous</span>
 </button>

 <div className="training-goals-quiz__question-counter">
 Question {currentQuestion + 1} of {questions.length}
 </div>

 {currentQuestion < questions.length - 1 ? (
 <button
 onClick={handleNext}
 className={`training-goals-quiz__nav-button training-goals-quiz__nav-button--next
${answers[currentQuestion] === null ? 'training-goals-quiz__nav-button--disabled' : ''}`}
 disabled={answers[currentQuestion] === null}
 >
 <span>Next</span>
 <ChevronRight size={20} />
 </button>
 ) : (
 <button
 onClick={handleSubmit}
 className={`training-goals-quiz__nav-button training-goals-quiz__nav-button--submit
${answers.includes(null) ? 'training-goals-quiz__nav-button--disabled' : ''}`}
 disabled={answers.includes(null)}
 >
 <span>Get Results</span>
 </button>
 )}
 </div>
 );
 };
 const renderResults = () => {
  if (!result) return null;

  const goalInfo = goalDefinitions[result.primaryGoal];
  const colorClass = getColorClass(result.primaryGoal);

  return (
    <div className="training-goals-quiz__results">
      <div className={`training-goals-quiz__goal-icon ${colorClass}`}>
        {goalInfo.icon}
      </div>

      <h1 className="training-goals-quiz__goal-title">{goalInfo.title}</h1>
      <p className="training-goals-quiz__goal-description">{goalInfo.description}</p>

      <div className="training-goals-quiz__results-chart">
        <h3 className="training-goals-quiz__chart-title">Your Fitness Profile</h3>
        {Object.entries(result.percentages).map(([tag, percentage]) => (
          <div key={tag} className="training-goals-quiz__chart-item">
            <div className="training-goals-quiz__chart-label">
              <span className="capitalize">{goalDefinitions[tag].title}</span>
              <span>{percentage}%</span>
            </div>
            <div className="training-goals-quiz__chart-bar-container">
              <div
                className={`training-goals-quiz__chart-bar ${getColorClass(tag)}`}
                style={{ width: `${percentage}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      <div className="training-goals-quiz__recommendations">
        <h3 className="training-goals-quiz__recommendations-title">Your Training Recommendations</h3>
        <ul>
          {goalInfo.recommendations.map((rec, index) => (
            <li key={index} className="training-goals-quiz__recommendation-item">
              <span className={`training-goals-quiz__recommendation-bullet ${colorClass}`}>
                <div className="training-goals-quiz__recommendation-bullet-inner"></div>
              </span>
              <span>{rec}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Nouveau contenu ajouté ici - les deux boutons côte à côte */}
      <div className="training-goals-quiz__results-buttons">
        <button
          onClick={resetQuiz}
          className="training-goals-quiz__reset-button"
        >
          Retake Quiz
        </button>
        
        <Link 
          to={goalInfo.link}
          className={`training-goals-quiz__exercises-button ${colorClass}`}
        >
          View Recommended Exercises
        </Link>
      </div>
    </div>
  );
};


 return (
 <div className="training-goals-quiz">
                  <div className="coach-profile-logo-container">
        <Link to="/homepage_postloguser" className="logo-link"><img src={logo} alt="Logo" className="coach-profile-logo" /></Link>
      </div>
 {!submitted ? (
 <>
 <h1 className="training-goals-quiz__title">Find Your Fitness Path</h1>
 {renderProgressBar()}

 <div className="training-goals-quiz__question-container">

 <div className="training-goals-quiz__question-header">
 {questions[currentQuestion].icon}
 <h2 className="training-goals-quiz__questiontext">{questions[currentQuestion].question}</h2>
 </div>

 <div className="training-goals-quiz__options-grid">
 {questions[currentQuestion].options.map((option, i) => (
 <button
 key={i}
 onClick={() => handleSelect(i)}
 className={`training-goals-quiz__option-button ${answers[currentQuestion] === i ?
'training-goals-quiz__option-button--selected' : ''}`}
 >
 <div className="training-goals-quiz__option-icon">
 {option.icon}
 </div>
 <span>{option.text}</span>
 </button>
 ))}
 </div>
 </div>

 {renderNavigation()}
 </>
 ) : (
 renderResults()
 )}
 </div>
 );
} 