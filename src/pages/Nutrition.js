import React from 'react';
import foodImage from '../assets/images/healthy.jpg';
import '../style/Nutrition.css';
import { Link } from 'react-router-dom';
import carbImage from '../assets/images/carbs.jpg';
import proteinImage from '../assets/images/protein.jpg';
import waterImage from '../assets/images/water.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const Nutrition = () => {
  return (
    <div>
      <nav className="navbar">
        <Link to="/" className="logo-link">
          <img src={require('../assets/images/logo.png')} alt="logo" className="logosignup2" />
        </Link>
    
        <div className="nav-center">
          <ul className="nav-links">
            <li><Link to="/TrainingPage">Training</Link></li>
            <li><Link to="/Nutrition">Nutrition</Link></li>
            <li><Link to="/news">Blog</Link></li>
            <li><Link to="/ProductList">Shop</Link></li>
          </ul>
        </div>
    
        <div className="nav-right">
          <div className="nav-coach-cart">
            <Link to="/CartPage" className="nav-icon">
              <FontAwesomeIcon icon={faShoppingCart} size="lg" />
            </Link>
            <Link to="/login_coach" className="login-btn-coach">Be a coach</Link>
          </div>
    
          <div className="nav-buttons">
            <Link to="/login" className="login-btn">Start Now</Link>
          </div>
        </div>
      </nav>
    
      <div className="nutrition-container">
        <img src={foodImage} alt="Healthy lifestyle" className="nutrition-image" />
        <div className="nutrition-overlay"></div>
        
        <div className="nutrition-content">
          <h1 className="nutrition-title">Eat clean.</h1>
          <h2 className="nutrition-subtitle">Reach your goals.</h2>
          <p className="nutrition-text">
            Cutting-edge digital nutrition coach. Tailored meal plans. Foodie-grade recipes.
          </p>
        <Link to="/DietQuiz">
        <button className="nutrition-button">
          Start eating clean now →
        </button>
      </Link>        </div>
      </div>
    
      <div className="food-importance-container">
        <h1 className="food-importance-heading">What are the most important foods for exercise?</h1>
        
        <div className="food-categories-wrapper">
          <div className="food-category-card">
            <img src={carbImage} alt="Carbohydrates" className="food-category-image" />
            <div className="food-category-details">
              <h2 className="food-category-name">Carbohydrate</h2>
              <p className="food-category-description">
                The main role of carbohydrates in physical activity is to provide energy. 
                Carbohydrate is the key fuel for the brain and for muscles during exercise.
              </p>
              <a href="#carb-details" className="food-category-link">Learn more</a>
            </div>
          </div>
          <div className="food-category-separator"></div>
          
          <div className="food-category-card">
            <img src={proteinImage} alt="Protein" className="food-category-image" />
            <div className="food-category-details">
              <h2 className="food-category-name">Protein</h2>
              <p className="food-category-description">
                Protein is important in sports performance as it can boost glycogen storage, 
                reduce muscle soreness and promote muscle repair.
              </p>
              <a href="#protein-details" className="food-category-link">Learn more</a>
            </div>
          </div>
          <div className="food-category-separator"></div>
          
          <div className="food-category-card">
            <img src={waterImage} alt="Water" className="food-category-image" />
            <div className="food-category-details">
              <h2 className="food-category-name">Water</h2>
              <p className="food-category-description">
                Drinking enough fluid is essential for maximising exercise performance 
                and ensuring optimum recovery.
              </p>
              <a href="#water-details" className="food-category-link">Learn more</a>
            </div>
          </div>
        </div>
      </div>

      {/* Carbohydrates Details Section */}
      <div id="carb-details" className="nutrient-details-section">
        <div className="nutrient-details-container">
          <h2 className="nutrient-details-title">Carbohydrates: The Body's Primary Energy Source</h2>
          <div className="nutrient-details-content">
            <div className="nutrient-details-text">
              <h3>Why Carbohydrates Matter</h3>
              <p>
                Carbohydrates are broken down into glucose, which is the primary fuel for your muscles and brain during exercise. 
                They provide quick energy and are especially important for high-intensity workouts.
              </p>
              
              <h3>Best Sources of Carbohydrates</h3>
              <ul>
                <li>Whole grains (brown rice, quinoa, whole wheat bread)</li>
                <li>Fruits (bananas, berries, apples)</li>
                <li>Vegetables (sweet potatoes, carrots, beets)</li>
                <li>Legumes (beans, lentils, chickpeas)</li>
              </ul>
              
              <h3>When to Consume</h3>
              <p>
                For optimal performance, consume complex carbs 2-3 hours before exercise and simple carbs during prolonged workouts.
              </p>
            </div>
            <div className="nutrient-details-image">
              <img src={carbImage} alt="Carbohydrate foods" />
            </div>
          </div>
        </div>
      </div>

      {/* Protein Details Section */}
      <div id="protein-details" className="nutrient-details-section">
        <div className="nutrient-details-container">
          <h2 className="nutrient-details-title2">Protein: The Building Block for Muscle</h2>
          <div className="nutrient-details-content">
            <div className="nutrient-details-text">
              <h3>Why Protein Matters</h3>
              <p>
                Protein is essential for muscle repair and growth. After exercise, protein helps rebuild muscle fibers that 
                have been broken down during your workout.
              </p>
              
              <h3>Best Sources of Protein</h3>
              <ul>
                <li>Lean meats (chicken, turkey, lean beef)</li>
                <li>Fish (salmon, tuna, cod)</li>
                <li>Eggs and dairy products</li>
                <li>Plant-based options (tofu, tempeh, edamame)</li>
              </ul>
              
              <h3>When to Consume</h3>
              <p>
                Aim to consume protein within 30-60 minutes after your workout to maximize muscle recovery and synthesis.
              </p>
            </div>
            <div className="nutrient-details-image">
              <img src={proteinImage} alt="Protein foods" />
            </div>
          </div>
        </div>
      </div>

      {/* Water Details Section */}
      <div id="water-details" className="nutrient-details-section">
        <div className="nutrient-details-container">
          <h2 className="nutrient-details-title3">Water: Essential for Performance</h2>
          <div className="nutrient-details-content">
            <div className="nutrient-details-text">
              <h3>Why Hydration Matters</h3>
              <p>
                Water regulates body temperature, lubricates joints, and helps transport nutrients to give you energy. 
                Even mild dehydration can significantly impact your performance.
              </p>
              
              <h3>Hydration Guidelines</h3>
              <ul>
                <li>Drink 17-20 oz of water 2-3 hours before exercise</li>
                <li>Drink 7-10 oz every 10-20 minutes during exercise</li>
                <li>Post-workout, drink enough to replace fluids lost (about 16-24 oz per pound lost)</li>
              </ul>
              
              <h3>Signs of Dehydration</h3>
              <p>
                Watch for thirst, dry mouth, fatigue, dizziness, and dark-colored urine - all signs you need more fluids.
              </p>
            </div>
            <div className="nutrient-details-image">
              <img src={waterImage} alt="Hydration" />
            </div>
          </div>
        </div>
      </div>
      
      <footer className="page-footer">
        <div className="footer-container">
          <div className="footer-section">
            <h4>About Us</h4>
            <p>Your journey to fitness starts here with our expert guidance and community support.</p>
          </div>
          
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/nutrition">Nutrition</Link></li>
              <li><Link to="/news">Blog</Link></li>
              <li><Link to="/ProductList">Shop</Link></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Connect With Us</h4>
            <div className="social-links">
              <a href="#"><FontAwesomeIcon icon={faFacebook} /></a>
              <a href="#"><FontAwesomeIcon icon={faTwitter} /></a>
              <a href="#"><FontAwesomeIcon icon={faInstagram} /></a>
              <a href="#"><FontAwesomeIcon icon={faYoutube} /></a>
            </div>
          </div>
        </div>
        
        <div className="news-footer-bottom">
          <p>&copy; 2025 SPORTIFY all in One. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Nutrition;