import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { jsPDF } from "jspdf";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import '../../style/PostLoginUser/DietDetails.css';

const dietData = {
  'mediterranean': {
    id: 'mediterranean',
    title: "Mediterranean Diet",
    bannerImage: "mediterranean-banner.jpg",
    shortDescription: "A heart-healthy eating pattern inspired by traditional Mediterranean cuisine.",
    description: "The Mediterranean diet is based on the traditional eating habits of countries bordering the Mediterranean Sea. It emphasizes plant-based foods, healthy fats, and moderate protein consumption. This diet has been extensively studied and is associated with numerous health benefits.",
    keyFeatures: [
      "Rich in fruits, vegetables, whole grains, legumes, and nuts",
      "Uses olive oil as the primary fat source",
      "Moderate amounts of fish and poultry",
      "Limited red meat and dairy consumption",
      "Red wine in moderation (optional)"
    ],
    scientificBenefits: [
      "30% reduced risk of cardiovascular disease (PREDIMED study)",
      "Associated with longer lifespan and reduced cognitive decline",
      "May help prevent type 2 diabetes",
      "Linked to lower rates of depression"
    ],
    sampleMealPlan: {
      breakfast: "Greek yogurt with honey, walnuts, and fresh fruit",
      lunch: "Grilled salmon with quinoa tabbouleh and roasted vegetables",
      dinner: "Lentil soup with whole grain bread and olive oil",
      snacks: "Hummus with vegetable sticks or a handful of almonds"
    },
    typicalMacros: {
      carbs: "50-60%",
      protein: "15-20%",
      fat: "25-35% (mostly unsaturated)"
    }
  },
  'keto': {
    id: 'keto',
    title: "Ketogenic Diet",
    bannerImage: "keto-banner.jpg",
    shortDescription: "A high-fat, very low-carb diet that puts your body into ketosis.",
    description: "The ketogenic diet is a metabolic therapy that mimics the effects of fasting by drastically reducing carbohydrate intake and replacing it with fat. This shift puts your body into a state of ketosis, where it becomes efficient at burning fat for energy.",
    keyFeatures: [
      "70-80% of calories from fat",
      "20-25% from protein",
      "5-10% from carbohydrates (typically <50g/day)",
      "Focus on meats, fatty fish, eggs, butter, nuts, and low-carb veggies",
      "Avoids grains, sugars, fruits, and starchy vegetables"
    ],
    scientificBenefits: [
      "Effective for rapid weight loss in the short term",
      "May reduce seizures in epilepsy patients",
      "Can improve blood sugar control in type 2 diabetes",
      "Potential neuroprotective effects"
    ],
    sampleMealPlan: {
      breakfast: "Scrambled eggs with avocado, bacon, and spinach cooked in butter",
      lunch: "Bunless cheeseburger with cauliflower mash and roasted broccoli",
      dinner: "Salmon with asparagus in hollandaise sauce and side salad",
      snacks: "Macadamia nuts, cheese cubes, or keto fat bombs"
    },
    typicalMacros: {
      carbs: "5-10%",
      protein: "20-25%",
      fat: "70-80%"
    }
  },
  'plant-based': {
    id: 'plant-based',
    title: "Plant-Based Diet",
    bannerImage: "plant-based-banner.jpg",
    shortDescription: "A diet focused on whole, minimally processed plants for optimal health.",
    description: "A whole-food, plant-based diet emphasizes natural, minimally processed plant foods and excludes or minimizes animal products. It's rich in fiber, antioxidants, and phytonutrients while being low in saturated fat and cholesterol.",
    keyFeatures: [
      "Focus on fruits, vegetables, whole grains, legumes, nuts and seeds",
      "Minimizes or excludes animal products",
      "Avoids processed foods and added sugars",
      "Emphasizes food quality and nutrient density",
      "Often combined with healthy lifestyle practices"
    ],
    scientificBenefits: [
      "May reverse coronary artery disease (Ornish, Esselstyn studies)",
      "Associated with lower cancer rates",
      "Effective for weight management",
      "Lower environmental impact than standard diets"
    ],
    sampleMealPlan: {
      breakfast: "Oatmeal with chia seeds, berries, and almond butter",
      lunch: "Buddha bowl with quinoa, roasted veggies, chickpeas, and tahini dressing",
      dinner: "Lentil curry with brown rice and steamed greens",
      snacks: "Fresh fruit, raw veggies with guacamole"
    }
  },
  'paleo': {
    id: 'paleo',
    title: "Paleo Diet",
    bannerImage: "paleo-banner.jpg",
    shortDescription: "Eat like our ancestors with this whole-foods approach.",
    description: "The Paleolithic diet is based on foods presumed to have been available to humans during the Paleolithic era. It emphasizes whole, unprocessed foods that could be hunted or gathered, while excluding agricultural products.",
    keyFeatures: [
      "Includes meats, fish, eggs, vegetables, fruits, nuts and seeds",
      "Excludes grains, legumes, dairy, and processed foods",
      "Uses natural sweeteners like honey in moderation",
      "Focuses on food quality (grass-fed, wild-caught, organic)",
      "Often combined with an active lifestyle"
    ],
    scientificBenefits: [
      "May improve blood lipid profiles",
      "Can lead to weight loss and improved body composition",
      "May reduce inflammation markers",
      "Eliminates processed foods and additives"
    ],
    sampleMealPlan: {
      breakfast: "Vegetable omelet with avocado and sweet potato hash",
      lunch: "Grilled chicken salad with mixed greens, nuts, and olive oil dressing",
      dinner: "Grass-fed steak with roasted Brussels sprouts and mashed cauliflower",
      snacks: "Hard-boiled eggs, beef jerky, or mixed berries"
    }
  },
  'flexitarian': {
    id: 'flexitarian',
    title: "Flexitarian Diet",
    bannerImage: "flexitarian-banner.jpg",
    shortDescription: "A flexible approach to plant-based eating with occasional meat.",
    description: "The flexitarian diet is a semi-vegetarian approach that encourages mostly plant-based foods while allowing meat and other animal products in moderation. It offers the health benefits of vegetarian eating without strict rules.",
    keyFeatures: [
      "Primarily plant-based but occasionally includes meat",
      "Emphasizes whole, minimally processed foods",
      "Allows flexibility based on personal preferences",
      "Encourages plant proteins like beans, lentils, and tofu",
      "More sustainable than standard Western diet"
    ],
    scientificBenefits: [
      "Lower risk of heart disease compared to meat-heavy diets",
      "May help with weight management",
      "More sustainable than standard Western diet",
      "Easier to maintain long-term than strict vegetarianism"
    ],
    sampleMealPlan: {
      breakfast: "Smoothie with spinach, banana, almond milk, and protein powder",
      lunch: "Vegetable stir-fry with tofu and brown rice (or chicken occasionally)",
      dinner: "Black bean burgers with sweet potato fries (or beef burgers occasionally)",
      snacks: "Greek yogurt with berries or hummus with veggies"
    }
  }
};

const DietDetailsPage = () => {
  const { dietId } = useParams();
  const diet = dietData[dietId];

  const handleDownloadMealPlan = () => {
    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.text(`${diet.title} - Meal Plan`, 20, 20);

    doc.setFontSize(14);
    doc.text("Breakfast:", 20, 40);
    doc.text(diet.sampleMealPlan.breakfast, 30, 50);

    doc.text("Lunch:", 20, 70);
    doc.text(diet.sampleMealPlan.lunch, 30, 80);

    doc.text("Dinner:", 20, 100);
    doc.text(diet.sampleMealPlan.dinner, 30, 110);

    doc.text("Snacks:", 20, 130);
    doc.text(diet.sampleMealPlan.snacks, 30, 140);

    doc.save(`${diet.title.replace(/\s+/g, '-')}-Meal-Plan.pdf`);
  };

  if (!diet) {
    return (
      <div className="diet-not-found">
        <h2>Diet not found</h2>
        <p>We couldn't find the diet you're looking for.</p>
        <Link to="/diet-quiz" className="back-to-quiz">
          Take our diet quiz to find your perfect match
        </Link>
      </div>
    );
  }

  return (
    <div className="diet-details-page">
      <div>
     <nav className="navbar">
  <Link to="/homepage_postloguser" className="logo-link">
    <img src={require('../../assets/images/logo.png')} alt="logo" className="logosignup2" />
  </Link>

     
        <ul className="nav-links">
        <li><a href="Trainingpage_postloguser">Training</a></li>
        <li><Link to="/nutrition_postloguser">Nutrition</Link></li>
          <li><Link to="/news_postloguser">Blog</Link></li>
          <li><Link to="/ProductList_postloguser">Shop</Link></li> 

        </ul>
            <div className="nav-right2">
              <div className="nav-coach-cart2">
                            <Link to="/CartPage_postloguser" className="nav-icon2">
                  <FontAwesomeIcon icon={faShoppingCart} size="lg" />
                </Link>
              </div>
              </div>
       <div className="profile-buttons">
         <Link to="/profile_user" className="profile-btn">Profile</Link>
       </div>
     </nav>
      </div>

          
      <div className="diet-banner" style={{ backgroundImage: `url(${require(`../../assets/images/${diet.bannerImage}`)})` }}>
        <div className="banner-overlay">
          <h1>{diet.title}</h1>
          <p className="diet-short-desc">{diet.shortDescription}</p>
        </div>
      </div>
      


      <div className="diet-content-container">
        <div className="diet-main-content">
          <section className="diet-section">
            <h2>About the {diet.title}</h2>
            <p>{diet.description}</p>
          </section>

          <section className="diet-section">
            <h3>Key Features</h3>
            <ul className="feature-list">
              {diet.keyFeatures.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </section>

          <section className="diet-section">
            <h3>Scientific Benefits</h3>
            <ul className="benefits-list">
              {diet.scientificBenefits.map((benefit, index) => (
                <li key={index}>{benefit}</li>
              ))}
            </ul>
          </section>
        </div>

        <div className="diet-sidebar">
          <section className="sidebar-section">
            <h3>Sample Meal Plan</h3>
            <div className="meal-plan">
              <div className="meal-time">
                <h4>Breakfast</h4>
                <p>{diet.sampleMealPlan.breakfast}</p>
              </div>
              <div className="meal-time">
                <h4>Lunch</h4>
                <p>{diet.sampleMealPlan.lunch}</p>
              </div>
              <div className="meal-time">
                <h4>Dinner</h4>
                <p>{diet.sampleMealPlan.dinner}</p>
              </div>
              <div className="meal-time">
                <h4>Snacks</h4>
                <p>{diet.sampleMealPlan.snacks}</p>
              </div>
            </div>
          </section>

          <section className="sidebar-section">
            <h3>Resources</h3>
            <div className="resources-list">
              <button className="resource-btn" onClick={handleDownloadMealPlan}>
                Download Meal Plan
              </button>
              <Link to="/NutritionistPage" className="resource-btn">
                Find a Nutritionist
              </Link>
            </div>
          </section>
        </div>
      </div>
      </div>
      

      
  );
};

export default DietDetailsPage;
