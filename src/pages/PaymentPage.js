import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate,Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCreditCard, faLock, faArrowLeft, faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import logo from '../assets/images/logo.png'; // Ensure the path to the logo is correct

import '../style/PaymentPage.css';

const PaymentPage = () => {
    const navigate = useNavigate();
    const { state } = useLocation();

    const [cartTotal, setCartTotal] = useState(0);
    const [cartItems, setCartItems] = useState([]);
    const [paymentMethod, setPaymentMethod] = useState('credit');
    const [cardDetails, setCardDetails] = useState({
        number: '',
        name: '',
        expiry: '',
        cvv: ''
    });
    const [isProcessing, setIsProcessing] = useState(false);
    const [paymentSuccess, setPaymentSuccess] = useState(false);

    const [deliveryDetails, setDeliveryDetails] = useState({
        country: 'Germany',
        firstName: '',
        lastName: '',
        company: '',
        address: '',
        apartment: '',
        postalCode: '',
        city: '',
        phone: ''
    });

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }

        if (state) {
            setCartTotal(state.total || 0);
            setCartItems(state.cartItems || []);
        } else {
            const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
            const savedTotal = savedCart.reduce((sum, item) => {
                const price = typeof item.price === 'string'
                    ? parseFloat(item.price.replace(',', '.'))
                    : item.price;
                return sum + (price * (item.quantity || 1));
            }, 0) + 8.00;

            setCartItems(savedCart);
            setCartTotal(savedTotal);
        }

        if (cartItems.length === 0 && !state) {
            navigate('/cart', { replace: true });
        }
    }, [state, navigate]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name === 'number') {
            const formatted = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
            setCardDetails(prev => ({ ...prev, [name]: formatted }));
        } else if (name === 'expiry') {
            const formatted = value.replace(/\D/g, '').replace(/^(\d{2})/, '$1/').substring(0, 5);
            setCardDetails(prev => ({ ...prev, [name]: formatted }));
        } else {
            setCardDetails(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleDeliveryChange = (e) => {
        const { name, value } = e.target;
        setDeliveryDetails(prev => ({ ...prev, [name]: value }));
    };

    const validateCard = () => {
        return (
            cardDetails.number.replace(/\s/g, '').length === 16 &&
            cardDetails.name.trim().length >= 3 &&
            cardDetails.expiry.length === 5 &&
            cardDetails.cvv.length >= 3
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }

        setIsProcessing(true);

        if (paymentMethod === 'credit' && !validateCard()) {
            setIsProcessing(false);
            return;
        }

        setTimeout(() => {
            setIsProcessing(false);
            setPaymentSuccess(true);
            localStorage.removeItem('cart');

            navigate('/OrderConfirmation', {
                state: {
                    orderTotal: cartTotal,
                    items: cartItems,
                    paymentMethod,
                    deliveryDetails
                }
            });
        }, 2000);
    };

    if (paymentSuccess) {
        return (
            <div className="payment-success">
                <FontAwesomeIcon icon={faCircleCheck} className="success-icon" />
                <h2>Payment Successful!</h2>
                <p>Your order has been processed.</p>
                <p>Redirecting to order confirmation...</p>
            </div>
        );
    }

    return (
        <div className="payment-page">
            
            <div className="payment-container">
            <div className="coach-profile-logo-container">
        <Link to="/" className="logo-link"><img src={logo} alt="Logo" className="coach-profile-logo" /></Link>
      </div>
                <button className="back-button" onClick={() => navigate(-1)}>
                    <FontAwesomeIcon icon={faArrowLeft} /> Back to Cart
                </button>

                <h2 className="payment-title">Payment & Delivery</h2>
                <div className="payment-summary">
                    <h3>Order Summary</h3>
                    <div className="summary-item">
                        <span>Items:</span>
                        <span>{(cartTotal - 8).toFixed(2)} TND</span>
                    </div>
                    <div className="summary-item">
                        <span>Delivery:</span>
                        <span>8.00 TND</span>
                    </div>
                    <div className="summary-item total">
                        <span>Total:</span>
                        <span>{cartTotal.toFixed(2)} TND</span>
                    </div>
                </div>

                {/* Delivery Details */}
                <div className="delivery-section">
                    <h3>Delivery Details</h3>
                    <div className="form-row">
                        <div className="form-group">
                            <label>First name</label>
                            <input type="text" name="firstName" value={deliveryDetails.firstName} onChange={handleDeliveryChange} required />
                        </div>
                        <div className="form-group">
                            <label>Last name</label>
                            <input type="text" name="lastName" value={deliveryDetails.lastName} onChange={handleDeliveryChange} required />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Company (optional)</label>
                        <input type="text" name="company" value={deliveryDetails.company} onChange={handleDeliveryChange} />
                    </div>

                    <div className="form-group">
                        <label>Address</label>
                        <input type="text" name="address" value={deliveryDetails.address} onChange={handleDeliveryChange} required />
                    </div>

                    <div className="form-group">
                        <label>Apartment, suite, etc. (optional)</label>
                        <input type="text" name="apartment" value={deliveryDetails.apartment} onChange={handleDeliveryChange} />
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Postal code</label>
                            <input type="text" name="postalCode" value={deliveryDetails.postalCode} onChange={handleDeliveryChange} required />
                        </div>
                        <div className="form-group">
                            <label>City</label>
                            <input type="text" name="city" value={deliveryDetails.city} onChange={handleDeliveryChange} required />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Phone (optional)</label>
                        <input type="text" name="phone" value={deliveryDetails.phone} onChange={handleDeliveryChange} />
                    </div>
                </div>

                {/* Payment Methods */}
                <div className="payment-methods">
                    <div className="method-tabs">
                        <button
                            className={`tab ${paymentMethod === 'credit' ? 'active' : ''}`}
                            onClick={() => setPaymentMethod('credit')}
                        >
                            <FontAwesomeIcon icon={faCreditCard} /> Credit Card
                        </button>

                        <button
                            className={`tab ${paymentMethod === 'cash' ? 'active' : ''}`}
                            onClick={() => setPaymentMethod('cash')}
                        >
                            💵 Pay on Delivery
                        </button>
                    </div>

                    {/* Credit Card Form */}
                    {paymentMethod === 'credit' && (
                        <form className="payment-form" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Card Number</label>
                                <input
                                    type="text"
                                    name="number"
                                    value={cardDetails.number}
                                    onChange={handleInputChange}
                                    placeholder="1234 5678 9012 3456"
                                    maxLength="19"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Cardholder Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={cardDetails.name}
                                    onChange={handleInputChange}
                                    placeholder="John Doe"
                                    required
                                />
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Expiry Date</label>
                                    <input
                                        type="text"
                                        name="expiry"
                                        value={cardDetails.expiry}
                                        onChange={handleInputChange}
                                        placeholder="MM/YY"
                                        maxLength="5"
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label>CVV</label>
                                    <input
                                        type="password"
                                        name="cvv"
                                        value={cardDetails.cvv}
                                        onChange={handleInputChange}
                                        placeholder="123"
                                        maxLength="4"
                                        required
                                    />
                                </div>
                            </div>

                            <button type="submit" className="pay-button" disabled={isProcessing}>
                                {isProcessing ? 'Processing...' : `Pay ${cartTotal.toFixed(2)} TND`}
                            </button>

                            <div className="secure-payment">
                                <FontAwesomeIcon icon={faLock} />
                                <span>Secure Payment - Your data is encrypted</span>
                            </div>
                        </form>
                    )}

                    {/* Cash on Delivery */}
                    {paymentMethod === 'cash' && (
                        <div className="cash-payment">
                            <p>You have chosen to pay in cash when the delivery arrives.</p>
                            <button
                                className="pay-button"
                                onClick={handleSubmit}
                                disabled={isProcessing}
                            >
                                {isProcessing ? 'Processing...' : `Confirm Order (${cartTotal.toFixed(2)} TND)`}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PaymentPage;
