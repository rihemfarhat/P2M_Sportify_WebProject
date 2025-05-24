import React, { useState } from 'react';
import { 
  FaLeaf, 
  FaHeart, 
  FaRunning, 
  FaUtensils,
  FaEgg,
  FaCoffee,
  FaUtensilSpoon,
  FaFish,
  FaFire,
  FaCookie,
  FaIceCream,
  FaMugHot,
  FaGlassWhiskey,
  FaListUl,
  FaHamburger,
  FaMoon
} from 'react-icons/fa';
import '../style/healthy.css';

const HealthyRecipes = () => {
  const [activeTab, setActiveTab] = useState('recipes');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  // Recipe data organized by categories
  const recipes = [
    // Breakfast
    {
      id: 1,
      title: "Quinoa Power Bowl",
      category: "breakfast",
      ingredients: ["quinoa", "kale", "avocado", "cherry tomatoes", "chickpeas", "lemon tahini dressing"],
      time: 20,
      difficulty: "Easy",
      tags: ["vegan", "high-protein", "gluten-free"],
      tips: "Massage the kale with lemon juice to make it more tender.",
      icon: <FaEgg />
    },
    {
      id: 2,
      title: "Overnight Oats",
      category: "breakfast",
      ingredients: ["rolled oats", "almond milk", "chia seeds", "berries", "almond butter", "honey"],
      time: 5,
      difficulty: "Very Easy",
      tags: ["meal-prep", "high-fiber"],
      tips: "Prepare the night before for a quick breakfast.",
      icon: <FaCoffee />
    },

    // Lunch
    {
      id: 3,
      title: "Rainbow Veggie Stir-Fry",
      category: "lunch",
      ingredients: ["bell peppers", "broccoli", "carrots", "snow peas", "tofu", "ginger", "garlic", "low-sodium soy sauce"],
      time: 25,
      difficulty: "Medium",
      tags: ["vegetarian", "high-fiber", "immune-boosting"],
      tips: "Cut veggies uniformly for even cooking.",
      icon: <FaUtensilSpoon />
    },
    {
      id: 4,
      title: "Mediterranean Salad",
      category: "lunch",
      ingredients: ["mixed greens", "cucumber", "cherry tomatoes", "red onion", "kalamata olives", "feta cheese", "olive oil", "lemon juice"],
      time: 15,
      difficulty: "Easy",
      tags: ["quick", "low-carb"],
      tips: "Let it marinate for 10 minutes for better flavor.",
      icon: <FaLeaf />
    },

    // Dinner
    {
      id: 5,
      title: "Salmon with Roasted Veggies",
      category: "dinner",
      ingredients: ["salmon fillet", "asparagus", "sweet potatoes", "olive oil", "garlic", "lemon", "dill"],
      time: 30,
      difficulty: "Medium",
      tags: ["high-protein", "omega-3"],
      tips: "Roast veggies first, then add salmon for perfect timing.",
      icon: <FaFish />
    },
    {
      id: 6,
      title: "Lentil Curry",
      category: "dinner",
      ingredients: ["red lentils", "coconut milk", "curry powder", "onion", "garlic", "ginger", "tomatoes", "spinach"],
      time: 35,
      difficulty: "Medium",
      tags: ["vegan", "high-protein", "comfort-food"],
      tips: "Add spinach at the end to retain nutrients.",
      icon: <FaFire />
    },

    // Snacks
    {
      id: 7,
      title: "Energy Balls",
      category: "snack",
      ingredients: ["dates", "almonds", "cocoa powder", "chia seeds", "coconut flakes"],
      time: 15,
      difficulty: "Easy",
      tags: ["no-bake", "energy-boost"],
      tips: "Keep refrigerated for firmer texture.",
      icon: <FaCookie />
    },
    {
      id: 8,
      title: "Greek Yogurt Parfait",
      category: "snack",
      ingredients: ["Greek yogurt", "mixed berries", "granola", "honey", "cinnamon"],
      time: 5,
      difficulty: "Very Easy",
      tags: ["high-protein", "probiotic"],
      tips: "Layer ingredients for beautiful presentation.",
      icon: <FaIceCream />
    },

    // Drinks
    {
      id: 9,
      title: "Turmeric Golden Milk",
      category: "drink",
      ingredients: ["almond milk", "turmeric", "cinnamon", "ginger", "black pepper", "honey"],
      time: 10,
      difficulty: "Very Easy",
      tags: ["anti-inflammatory", "vegan", "digestive health"],
      tips: "Add a pinch of black pepper to enhance turmeric absorption.",
      icon: <FaMugHot />
    },
    {
      id: 10,
      title: "Green Detox Smoothie",
      category: "drink",
      ingredients: ["spinach", "banana", "pineapple", "almond milk", "chia seeds", "ginger"],
      time: 5,
      difficulty: "Very Easy",
      tags: ["alkalizing", "immune-boosting"],
      tips: "Freeze banana beforehand for creamier texture.",
      icon: <FaGlassWhiskey />
    }
  ];

  // Wellness tips
  const wellnessTips = [
    "Start your day with a glass of warm lemon water to kickstart digestion.",
    "Practice mindful eating - chew each bite at least 20 times.",
    "Aim for 7-9 hours of quality sleep for optimal health.",
    "Take a 5-minute movement break every hour if you sit for long periods.",
    "Incorporate fermented foods like kimchi or kefir for gut health."
  ];

  // Category data
  const categories = [
    { id: 'all', name: 'All Recipes', icon: <FaListUl /> },
    { id: 'breakfast', name: 'Breakfast', icon: <FaEgg /> },
    { id: 'lunch', name: 'Lunch', icon: <FaHamburger /> },
    { id: 'dinner', name: 'Dinner', icon: <FaMoon /> },
    { id: 'snack', name: 'Snacks', icon: <FaCookie /> },
    { id: 'drink', name: 'Drinks', icon: <FaGlassWhiskey /> }
  ];

  // Filter recipes based on search term
  const filteredRecipes = recipes.filter(recipe =>
    recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    recipe.ingredients.some(ing => ing.toLowerCase().includes(searchTerm.toLowerCase())) ||
    recipe.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Filter by category
  const categoryFilteredRecipes = activeCategory === 'all' 
    ? filteredRecipes 
    : filteredRecipes.filter(recipe => recipe.category === activeCategory);

  return (
    <div className="healthy-recipes-container">
      
      
      <header className="health-header">
        
        <h1><FaLeaf /> Nourish & Thrive</h1>
        <p>Your guide to delicious nutrition and holistic wellness</p>
      </header>

      <div className="health-nav">
        <button 
          className={activeTab === 'recipes' ? 'active' : ''}
          onClick={() => setActiveTab('recipes')}
        >
          <FaUtensils /> Healthy Recipes
        </button>
        <button 
          className={activeTab === 'tips' ? 'active' : ''}
          onClick={() => setActiveTab('tips')}
        >
          <FaHeart /> Wellness Tips
        </button>
      </div>

      {activeTab === 'recipes' && (
        <div className="recipes-section">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search recipes by name, ingredient or tag..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="category-filters">
            {categories.map(cat => (
              <button
                key={cat.id}
                className={activeCategory === cat.id ? 'active' : ''}
                onClick={() => setActiveCategory(cat.id)}
              >
                {cat.icon} {cat.name}
              </button>
            ))}
          </div>

          <div className="recipe-grid">
            {categoryFilteredRecipes.length > 0 ? (
              categoryFilteredRecipes.map(recipe => (
                <div key={recipe.id} className="recipe-card">
                  <div className="recipe-header">
                    <div className="recipe-icon">{recipe.icon}</div>
                    <h3>{recipe.title}</h3>
                    <div className="recipe-meta">
                      <span>{recipe.time} mins</span>
                      <span>{recipe.difficulty}</span>
                    </div>
                  </div>
                  <div className="recipe-body">
                    <h4>Ingredients:</h4>
                    <ul>
                      {recipe.ingredients.map((ingredient, index) => (
                        <li key={index}>{ingredient}</li>
                      ))}
                    </ul>
                    <div className="recipe-tags">
                      {recipe.tags.map((tag, index) => (
                        <span key={index} className="tag">{tag}</span>
                      ))}
                    </div>
                    <div className="recipe-tip">
                      <FaLeaf className="tip-icon" />
                      <p>{recipe.tips}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-results">
                <p>No recipes found matching your search. Try different keywords!</p>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'tips' && (
        <div className="wellness-tips">
          <h2><FaHeart /> Daily Wellness Inspiration</h2>
          <div className="tips-grid">
            {wellnessTips.map((tip, index) => (
              <div key={index} className="tip-card">
                <div className="tip-number">{index + 1}</div>
                <p>{tip}</p>
              </div>
            ))}
          </div>
          <div className="wellness-challenge">
            <h3><FaRunning /> This Week's Challenge</h3>
            <p>Try one new vegetable you've never eaten before. Notice its texture, flavor, and how it makes you feel!</p>
          </div>
        </div>
      )}

      <footer className="health-footer">
        <p>Remember: Small, consistent changes lead to big health transformations!</p>
      </footer>
    </div>
  );
};

export default HealthyRecipes;