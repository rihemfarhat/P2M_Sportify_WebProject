import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';
import "../style/news.css";
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';


const NewsPage = () => {
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
      {/* Navbar originale */}
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

      {/* Contenu principal */}
      <main className="news-main-content">
        <section className="featured-articles">
          <h2 className="section-title">Latest Updates</h2>

          {/* Affichage du message de chargement ou des articles */}
          {loading ? (
            <div className="loading-spinner">Loading...</div>
          ) : error ? (
            <div className="error-message">{error}</div>
          ) : (
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
                <Link to={article.link} className="read-more">
                  Read more →
                </Link>
              </div>
            </article>
          ))}

            </div>
          )}
        </section>
      </main>

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

export default NewsPage;
