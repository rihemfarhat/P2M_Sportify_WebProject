import { Link } from "react-router-dom";
import React, { useState } from 'react';
import "../style/HomePage.css";
import image1 from "../assets/images/image1.jpg";
import image2 from "../assets/images/image2.jpg";
import image3 from "../assets/images/image3.jpg";
import image4 from "../assets/images/image4.jpg";
import image5 from "../assets/images/image5.jpg";
import image6 from "../assets/images/image6.jpg";
import image7 from "../assets/images/image7.jpg";
import image8 from "../assets/images/image8.jpg";


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faTwitter, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';

export default function HomePage() {
  const [comments, setComments] = useState([
    {
      name: "Yassine Ben Amor",
      text: "Excellente application ! Elle m’a aidé à garder une discipline quotidienne. J’ai perdu 4 kg en deux semaines grâce aux entraînements et à une alimentation équilibrée.",
      rating: 5,
      image: "https://randomuser.me/api/portraits/men/76.jpg",
    },
    {
      name: "Nesrine Bouzid",
      text: "J’ai testé plusieurs applications de sport, mais Sportify est vraiment la plus complète. Les programmes sont efficaces et je vois mon évolution chaque semaine. Je recommande vivement !",
      rating: 4,
      image: "https://randomuser.me/api/portraits/women/68.jpg",
    },
    {
      name: "Oussama Trabelsi",
      text: "Je l’utilise depuis 6 mois, environ une heure par jour. Franchement, les résultats sont meilleurs que quand j’allais à la salle. Très satisfait.",
      rating: 4,
      image: "https://randomuser.me/api/portraits/men/64.jpg",
    },
  ]);
  

  const [newComment, setNewComment] = useState("");
  const [rating, setRating] = useState(5);
  const [currentIndex, setCurrentIndex] = useState(0);
  


  const testimonials = [
    {
      image: image1,
      title: "I got back in shape after years of inactivity",
      text: "Thanks to Sportify, I finally regained my energy and a healthy lifestyle, all from the comfort of my home.",
      name: "Walid",
      age: 34
    },
    {
      image: image2,
      title: "A fresh start after motherhood",
      text: "Sportify helped me get back in shape after giving birth, with no pressure and at my own pace.",
      name: "Ines",
      age: 31
    },
    {
      image: image5,
      title: "No more useless subscriptions",
      text: "I saved money and gained muscle, all by following Sportify programs from my home in Sfax.",
      name: "Hichem",
      age: 42
    },
    {
      image: image4,
      title: "My wellness partner",
      text: "Sportify became my personal coach. I feel more balanced both physically and mentally.",
      name: "Leïla",
      age: 28
    },
    {
      image: image6,
      title: "More motivated than ever",
      text: "Thanks to weekly challenges and personalized tracking, I stay motivated every step of the way.",
      name: "Sofien",
      age: 35
    },
    {
      image: image7,
      title: "A life-changing journey",
      text: "By integrating Sportify into my routine, I lost 10 kg and regained my confidence.",
      name: "Nour",
      age: 26
    },
    {
      image: image8,
      title: "Perfect for students",
      text: "No need to go to the gym! Sportify allowed me to train effectively between classes.",
      name: "Siwar",
      age: 22
    },
  ];
  
  
  
  
  
  const visibleTestimonials = testimonials.slice(currentIndex, currentIndex + 3);

  

  const nextPage = () => {
    if (currentIndex + 3 < testimonials.length) {
      setCurrentIndex(currentIndex + 3);
    } else {
      setCurrentIndex(0); // Revenir au début
    }
  };

  const prevPage = () => {
    if (currentIndex - 3 >= 0) {
      setCurrentIndex(currentIndex - 3);
    } else {
      setCurrentIndex(testimonials.length - 3); // Revenir à la dernière page
    }
  };


  const handleAddComment = () => {
    if (newComment.trim() === "") return;
    const newEntry = {
      name: "Anonymous",
      text: newComment,
      rating,
      image: "https://randomuser.me/api/portraits/lego/5.jpg",
    };
    setComments([newEntry, ...comments]);
    setNewComment("");
  };

  return (
    <div className="home-container">
      <nav className="navbar">
        <Link to="/" className="logo-link">
          <img src={require('../assets/images/logo.png')} alt="logo" className="logosignup2" />
        </Link>
        <div className="nav-center">
          <ul className="nav-links">
            <li><Link to="/login">Training</Link></li>
            <li><Link to="/login">Nutrition</Link></li>
            <li><Link to="/news">Blog</Link></li>
            <li><Link to="/login">Shop</Link></li>
          </ul>
        </div>
        <div className="nav-right">
          <div className="nav-coach-cart">
            <Link to="/CartPage" className="nav-icon"><FontAwesomeIcon icon={faShoppingCart} size="lg" /></Link>
            <Link to="/login_coach" className="login-btn-coach">Be a coach</Link>
          </div>
          <div className="nav-buttons">
            <Link to="/login" className="login-btn">Start Now</Link>
          </div>
        </div>
      </nav>

      <header className="hero-section">
        
        <video autoPlay loop muted playsInline className="hero-video">
          <source src={require('../assets/videos/home.mp4')} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="hero-text-overlay">
          <Link to="/login">
            <button className="hero-button">Get your personalized training plan now →</button>
          </Link>
        </div>
      </header>
      <section className="success-stories">
        <h2 className="title">Success Stories</h2>
        <p className="subtitle">
          97% of users experience dramatic progress after 12 weeks with Sportify
        </p>
<div className="slider-wrapper">
  <button className="slider-button left" onClick={prevPage}>
    <FontAwesomeIcon icon={faChevronLeft} />
  </button>

  <div className="testimonials-container">
    <div 
      className="testimonials-slider"
      style={{ 
        transform: `translateX(-${currentIndex * (100 / 3)}%)`,
        transition: 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
      }}
    >
      {testimonials.map((testimonial, index) => (
        <div 
          key={index} 
          className="testimonial-card"
          style={{
            opacity: index >= currentIndex && index < currentIndex + 3 ? 1 : 0.5,
            transform: `scale(${index >= currentIndex && index < currentIndex + 3 ? 1 : 0.9})`,
            transition: 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
          }}
        >
          <img src={testimonial.image} alt={testimonial.name} className="testimonial-image" />
          <h3>{testimonial.title}</h3>
          <p className="testimonial-text">{testimonial.text}</p>
          <p className="testimonial-name">
            <strong>{testimonial.name}</strong> • {testimonial.age} years old
          </p>
        </div>
      ))}
    </div>
  </div>

  <button className="slider-button right" onClick={nextPage}>
    <FontAwesomeIcon icon={faChevronRight} />
  </button>
</div>

        <p className="disclaimer">*Internal survey among 10,000 Sportify users.</p>
      </section>



      <section className="comments">
        <h2>What users say about Sportify</h2>
        <div className="add-comment">
          <textarea
            placeholder="Write your review..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <div className="rating-input">
            <label>Rating:</label>
            <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
              {[5, 4, 3, 2, 1].map((star) => (
                <option key={star} value={star}>{star} ★</option>
              ))}
            </select>
          </div>
          <button onClick={handleAddComment}>Post Review</button>
        </div>
        <div className="comments-list">
          {comments.map((comment, index) => (
            <div key={index} className="comment">
              <img src={comment.image} alt={comment.name} />
              <div className="comment-content">
                <h3>{comment.name}</h3>
                <p className="stars">{"★".repeat(comment.rating)}{"☆".repeat(5 - comment.rating)}</p>
                <p>{comment.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

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
}
