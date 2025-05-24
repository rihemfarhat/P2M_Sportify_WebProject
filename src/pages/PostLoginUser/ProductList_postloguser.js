import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faTwitter, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';
import "../../style/PostLoginUser/ProductList.css";

const ProductList = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 12;

    useEffect(() => {
        axios
            .get("http://localhost:5000/api/products")
            .then((response) => {
                setProducts(response.data);
                setFilteredProducts(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Erreur lors de la récupération des produits", error);
                setError("Échec du chargement des produits.");
                setLoading(false);
            });
    }, []);

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
        if (e.target.value === "") {
            setFilteredProducts(products);
        } else {
            const filtered = products.filter(product =>
                product.title.toLowerCase().includes(e.target.value.toLowerCase())
            );
            setFilteredProducts(filtered);
        }
    };

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

    return (
        <div className="product-list-page">
            {/* Navbar */}
            <nav className="navbar2">
                <Link to="/" className="logo-link2">
                    <img
                        src={require("../../assets/images/logo.png")}
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

            {/* Section Catégories */}
            <h2 className="section-title-categories">All categories</h2>
            <section className="categories-section">
           
                <Link to="/equipment" className="category-card">
                    <img src={require("../../assets/images/equipment.jpg")} alt="Equipment" />
                    <p><strong>Equipment</strong></p>
                </Link>
                
                <Link to="/men" className="category-card">
                    <img src={require("../../assets/images/men.jpg")} alt="Men" />
                    <p><strong>Men</strong></p>
                </Link>
                
                <Link to="/WomenPage" className="category-card">
                    <img src={require("../../assets/images/women.jpg")} alt="Women" />
                    <p><strong>Women</strong></p>
                </Link>
                
                <Link to="/accessories" className="category-card">
                    <img src={require("../../assets/images/accessories.jpg")} alt="Accessories" />
                    <p><strong>Accessories</strong></p>
                </Link>
            </section>

            {/* Affichage des produits */}
            <main className="product-main-content">
                <section className="featured-products">
                    <h2 className="section-title">All products</h2>
                    <div className="products-grid">
                        {loading && <p>Chargement des produits...</p>}
                        {error && <p>{error}</p>}
                        {!loading && currentProducts.length > 0 ? (
                            currentProducts.map((product) => (
                                <div key={product._id} className="product-card">
                                    <img src={product.image} alt={product.title} />
                                    <h3>{product.title}</h3>
                                    <p>{product.price}</p>
                                    <Link to={`/product/${product._id}`} className="view-product-link">
                                        View Product
                                    </Link>
                                </div>
                            ))
                        ) : (
                            <p>Aucun produit trouvé pour cette recherche.</p>
                        )}
                    </div>

                    {/* Pagination */}
                    <div className="pagination">
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

export default ProductList;
