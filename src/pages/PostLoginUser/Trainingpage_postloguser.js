import React from 'react';
import { Link } from "react-router-dom";
import '../../style/TrainingPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

import trainingImage from '../../assets/images/training.jpg';

const TrainingPage2 = () => {
  return (
    <div className="training-container">
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

      <div className="training-main">
        <div className="text-section">
          <h1>Easy to use<br />Effective Tailored to your needs</h1>
          <p>Over 350 exercises and personalized workouts that help you to become strong inside and out</p>
          <Link to="/TrainingGoalsQuiz"><button className='start'>Start now →</button></Link>
        </div>

        <div className="image-section">
          <div className="image-wrapper">
            <img src={trainingImage} alt="Workout" />
            <div className="bar white-bar"></div>
            <div className="bar blue-bar top"></div>
            <div className="bar blue-bar bottom"></div>
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

export default TrainingPage2;
