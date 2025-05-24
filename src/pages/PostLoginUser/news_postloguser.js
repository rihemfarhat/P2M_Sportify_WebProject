import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

import "../../style/PostLoginUser/news_postloguser.css";

const NewsPage2 = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/articles") // Endpoint de l'API
      .then((response) => {
        setArticles(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching articles", error);
        setError("Failed to load articles. Please try again later.");
        setLoading(false);
      });
  }, []);

  return (
    <div className="news-page-container">
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

      {/* Contenu principal */}
      <main className="news-main-content">
        <section className="featured-articles">
          <h2 className="section-title">Latest Updates</h2>
          <div className="articles-grid">
            {articles.map((article) => (
              <article key={article.id} className="article-card">
                <div 
                  className="article-image" 
                  style={{ backgroundImage: `url(${article.image})` }}
                ></div>
                <div className="article-content">
                  <h3>{article.title}</h3>
                  <p>{article.description}</p>
                  <Link to="#" className="read-more">Read more →</Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      {/* Nouveau Footer avec classes uniques */}
      <footer className="news-page-footer">
        <div className="news-footer-container">
          <div className="news-footer-section">
            <h4>About Us</h4>
            <p>Your journey to fitness starts here with our expert guidance and community support.</p>
          </div>
          
                           <div className="news-footer-section">
                             <h4>Quick Links</h4>
                             <ul className="news-footer-links">
                               <li><Link to="/homepage_postloguser">Home</Link></li>
                               <li><Link to="/nutrition_postloguser">Nutrition</Link></li>
                               <li><Link to="/news_postloguser">Blog</Link></li>
                               <li><Link to="/ProductList_postloguser">Shop</Link></li>
                             </ul>
                           </div>
          
          <div className="news-footer-section">
            <h4>Connect With Us</h4>
            <div className="news-social-links">
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

export default NewsPage2;