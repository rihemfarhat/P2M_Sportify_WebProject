import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faTwitter, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';
import "../style/EquipmentList.css";

const EquipmentList = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [equipment, setEquipment] = useState([]);
    const [filteredEquipment, setFilteredEquipment] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;

    useEffect(() => {
        axios.get("http://localhost:5000/api/equipment")
            .then((response) => {
                setEquipment(response.data);
                setFilteredEquipment(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Erreur lors de la récupération des équipements", error);
                setError("Échec du chargement des équipements.");
                setLoading(false);
            });
    }, []);

    const handleSearch = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        if (query === "") {
            setFilteredEquipment(equipment);
        } else {
            const filtered = equipment.filter(item =>
                item.title.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredEquipment(filtered);
        }
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredEquipment.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredEquipment.length / itemsPerPage);

    return (
        <div className="equipment-list-page">
            {/* Navbar */}
            <nav className="navbar2">
                <Link to="/" className="logo-link2">
                    <img
                        src={require("../assets/images/logo.png")}
                        alt="logo"
                        className="logosignup2"
                    />
                </Link>

   <ul className="nav-links">
   <li><a href="Trainingpage_postloguser">Training</a></li>
     <li><Link to="/nutrition_postloguser">Nutrition</Link></li>
     <li><Link to="/news_postloguser">Blog</Link></li>
     <li><Link to="/ProductList_postloguser">Shop</Link></li> 
 
   </ul>

                <form className="search-form">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={handleSearch}
                        placeholder="Search for..."
                        className="search-input"
                    />
                    <button type="submit" className="search-icon-btn">
                        <FontAwesomeIcon icon={faSearch} size="lg" />
                    </button>
                </form>

                <div className="nav-icons2">
                    <Link to="/CartPage_postloguser" className="nav-icon2">
                        <FontAwesomeIcon icon={faShoppingCart} size="lg" />
                    </Link>
                </div>



                <div className="nav-buttons2">
                    <Link to="/login" className="login-btn2">Profile</Link>
                </div>
            </nav>

            {/* Affichage des équipements */}
            <main className="equipment-main-content">
                <section className="featured-equipment">
                    <h2 className="section-title">All Equipment</h2>
                    <div className="equipment-grid">
                        {loading && <div className="loader"><p>Chargement...</p></div>}
                        {error && <p className="error-message">{error}</p>}
                        {!loading && currentItems.length > 0 ? (
                            currentItems.map((item) => (
                                <div key={item._id} className="equipment-card">
                                    <img src={item.image} alt={item.title} />
                                    <h3>{item.title}</h3>
                                    <p>{item.price}</p>
                                    <Link to={`/equipment/${item._id}`} className="view-product-link">
                                        View Equipment
                                    </Link>
                                </div>
                            ))
                        ) : (
                            <p>Aucun équipement trouvé pour cette recherche.</p>
                        )}
                    </div>

                    {/* Pagination */}
                    <div className="pagination">
                        <button
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                        >
                            ← Previous
                        </button>
                        {Array.from({ length: totalPages }, (_, index) => (
                            <button
                                key={index + 1}
                                className={currentPage === index + 1 ? "active" : ""}
                                onClick={() => setCurrentPage(index + 1)}
                            >
                                {index + 1}
                            </button>
                        ))}
                        <button
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                        >
                            Next →
                        </button>
                    </div>
                </section>
            </main>

            {/* Footer */}
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

export default EquipmentList;
