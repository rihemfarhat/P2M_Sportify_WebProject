import React from 'react';
import "../../style/PostLoginUser/subscription_postloguser.css";
import { Link } from 'react-router-dom';
import { useState } from 'react';
import image1 from "../../assets/images/image1.jpg";
import image2 from "../../assets/images/image2.jpg";
import image4 from "../../assets/images/image4.jpg";
import image5 from "../../assets/images/image5.jpg";
import image6 from "../../assets/images/image6.jpg";
import image7 from "../../assets/images/image7.jpg";
import image8 from "../../assets/images/image8.jpg";
import { faSearch, faShoppingCart,faChevronRight,faChevronLeft } from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';



function Subscription() {
    const [billingCycle, setBillingCycle] = useState('monthly');
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



    const pricing = {
        monthly: { basic: '10 dt/mois', premium: '30 dt/mois' },
        annual: { basic: '110 dt/an', premium: '300 dt/an' }
    };
    return (
        <div className="home-container">
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
      
          <header className="hero-section-payment">
            <video autoPlay loop muted playsInline className="payment-video">
              <source src={require('../../assets/videos/subscription.mp4')} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
           

           
            <div className="form-overlay">
                <div className='videotitle'>
                    <h1>Join today with an extended 30-day free trial</h1>
                </div>
                <div className="billing-toggle">
                    <button 
                        onClick={() => setBillingCycle('monthly')} 
                        className={billingCycle === 'monthly' ? 'active' : ''}
                    >Monthly</button>
                    <button 
                        onClick={() => setBillingCycle('annual')} 
                        className={billingCycle === 'annual' ? 'active' : ''}
                    >Annual </button>
                </div>
                <div className="subscription-options">
                    <div className="option">
                        <h3>Basic Plan</h3>
                        <p>Limited access + standard <br/>content</p>
                        <p>{pricing[billingCycle].basic}</p>
                        <button className='subscribe-btn'>Subscribe</button>
                    </div>
                    <div className="option premium">
                        <h3>Premium Plan</h3>
                        <p>Unlimited access + exclusive <br/>content</p>
                        <p>{pricing[billingCycle].premium}</p>
                        <button className='subscribe-btn'>Subscribe</button>
                    </div>
                 </div>

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

export default Subscription;