import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../style/PostLoginUser/Nutritionist.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import nutrition from '../../assets/images/nutritionist.jpg';
import { faFacebook, faTwitter, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';


import nutri1 from '../../assets/images/nutritionist1.jpg';
import nutri2 from '../../assets/images/nutritionist2.jpg';
import nutri3 from '../../assets/images/nutritionist3.jpg';
import nutri4 from '../../assets/images/nutritionist4.jpg';
import nutri5 from '../../assets/images/nutritionist5.jpg';
import nutri6 from '../../assets/images/nutritionist6.jpg';

const NutritionistPage = () => {
  const [nutritionists, setNutritionists] = useState([]);
  const [location, setLocation] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mock data with direct image imports
  const mockNutritionists = [
    {
      id: 1,
      name: "Dr. Amina Ben Salah",
      specialty: "Weight Management",
      location: "Tunis",
      rating: 4.8,
      reviews: 124,
      image: nutri1,
      available: "Online & In-person",
      languages: ["Arabic", "French"],
      bio: "Certified nutritionist with 10 years of experience helping clients achieve sustainable weight loss through personalized meal plans."
    },
    {
      id: 2,
      name: "Dr. Karim Trabelsi",
      specialty: "Sports Nutrition",
      location: "Sousse",
      rating: 4.9,
      reviews: 87,
      image: nutri2,
      available: "In-person",
      languages: ["Arabic", "French", "English"],
      bio: "Former athlete turned nutrition expert specializing in performance optimization for athletes."
    },
    {
      id: 3,
      name: "Leila Boukadi, Dietitian",
      specialty: "Plant-Based Nutrition",
      location: "Sfax",
      rating: 4.7,
      reviews: 65,
      image: nutri3,
      available: "Online",
      languages: ["Arabic", "French"],
      bio: "Dietitian passionate about helping people transition to plant-based diets while meeting all nutritional needs."
    },
    {
      id: 4,
      name: "Dr. Hichem Gharbi",
      specialty: "Diabetes Management",
      location: "Nabeul",
      rating: 4.9,
      reviews: 112,
      image: nutri4,
      available: "Online & In-person",
      languages: ["Arabic", "French"],
      bio: "Endocrinology-focused nutritionist helping patients manage and reverse type 2 diabetes through dietary interventions."
    },
    {
      id: 5,
      name: "Salma Abid, Dietitian",
      specialty: "Pediatric Nutrition",
      location: "Djerba",
      rating: 4.8,
      reviews: 93,
      image: nutri5,
      available: "In-person",
      languages: ["Arabic", "French", "German"],
      bio: "Pediatric dietitian specializing in picky eaters, food allergies, and creating healthy eating habits for children."
    },
    {
      id: 6,
      name: "Dr. Marwa Fersi",
      specialty: "Gut Health",
      location: "Bizerte",
      rating: 4.7,
      reviews: 78,
      image: nutri6,
      available: "Online",
      languages: ["Arabic", "French", "Italian"],
      bio: "Functional medicine nutritionist focusing on gut health, food intolerances, and digestive disorders."
    }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setNutritionists(mockNutritionists);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    setLoading(true);
    
    let results = [...mockNutritionists];
    
    if (location) {
      results = results.filter(n => 
        n.location.toLowerCase().includes(location.toLowerCase())
      );
    }
    
    if (specialty) {
      results = results.filter(n => 
        n.specialty.toLowerCase().includes(specialty.toLowerCase())
      );
    }
    
    setNutritionists(results);
    setLoading(false);
  };

  const resetFilters = () => {
    setLocation('');
    setSpecialty('');
    setNutritionists(mockNutritionists);
  };

  if (error) {
    return (
      <div className="nutritionist-error">
        <h2>Error loading nutritionists</h2>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Try Again</button>
        <Link to="/" className="back-home">Return Home</Link>
      </div>
    );
  }

  return (
    <div className="nutritionist-page">
      
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
     
    
      <div className="nutrition-container">
        <img src={nutrition} alt="Healthy lifestyle" className="nutrition-image" />
        <div className="nutrition-overlay"></div>
        
        <div className="nutrition-content">
          <h1 className="nutrition-title">Find Your Perfect Nutritionist</h1>
          <p className="nutrition-text">
          Connect with certified nutrition professionals who can help you achieve your health goals
          </p>
      </div>
      </div>
      <div className="search-container2">
        <form onSubmit={handleSearch} className="search-form2">
          <div className="form-group2">
            <label htmlFor="location">Location</label>
            <input
              type="text"
              id="location"
              placeholder="City or region"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          
          <div className="form-group2">
            <label htmlFor="specialty">Specialty</label>
            <select
              id="specialty"
              value={specialty}
              onChange={(e) => setSpecialty(e.target.value)}
            >
              <option value="">All Specialties</option>
              <option value="Weight Management">Weight Management</option>
              <option value="Sports Nutrition">Sports Nutrition</option>
              <option value="Plant-Based Nutrition">Plant-Based Nutrition</option>
              <option value="Diabetes Management">Diabetes Management</option>
              <option value="Pediatric Nutrition">Pediatric Nutrition</option>
              <option value="Gut Health">Gut Health</option>
            </select>
          </div>
          
          <div className="form-actions2">
            <button type="submit" className="search-btn2">Search</button>
            <button type="button" onClick={resetFilters} className="reset-btn2">Reset Filters</button>
          </div>
        </form>
      </div>
      
      <div className="results-container">
        {loading ? (
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Loading nutritionists...</p>
          </div>
        ) : (
          <>
            <h2 className="results-title">
              {nutritionists.length} {nutritionists.length === 1 ? 'Nutritionist Found' : 'Nutritionists Found'}
            </h2>
            
            {nutritionists.length === 0 ? (
              <div className="no-results">
                <p>No nutritionists match your search criteria.</p>
                <button onClick={resetFilters}>Show all nutritionists</button>
              </div>
            ) : (
              <div className="nutritionist-grid">
                {nutritionists.map((nutri) => (
                  <div key={nutri.id} className="nutritionist-card">
                    <div className="card-image">
                      <img 
                        src={nutri.image} 
                        alt={nutri.name} 
                      />
                    </div>
                    <div className="card-content">
                      <h3>{nutri.name}</h3>
                      <br/>
                      <p className="specialty2">{nutri.specialty}</p>
                      <p className="location2">{nutri.location}</p>
                      
                      <div className="rating">
                        <span className="stars">★★★★★</span>
                        <span className="rating-text">{nutri.rating} ({nutri.reviews} reviews)</span>
                      </div>
                      
                      <p className="availability">{nutri.available}</p>
                      
                      <div className="languages">
                        <span>Languages: </span>
                        {nutri.languages.join(', ')}
                      </div>
                      
                      <p className="bio">{nutri.bio}</p>
                      
                      <div className="card-actions">
                        <button className="view-profile">View Profile</button>
                        <Link to={`/BookConsultation/${nutri.id}`} className="book-now">
                          Book Consultation
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
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

export default NutritionistPage;