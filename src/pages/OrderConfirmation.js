import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../style/OrderConfirmation.css';

const OrderConfirmation = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  // Check if data is available in the state
  const { orderTotal, items, paymentMethod, deliveryDetails } = state || {};

  return (
    <div className="order-confirmation">
      <div className="confirmation-box">
        <h1>🎉 Thank you for your order!</h1>
        <p>Your order has been successfully placed.</p>

        {/* Display order details */}
        <div className="order-summary">
          <h3>Order Details</h3>
          <ul>
            <li><strong>Order Number:</strong> #{Math.floor(Math.random() * 1000000000)}</li>
            <li><strong>Date:</strong> {new Date().toLocaleDateString()}</li>
            <li><strong>Total:</strong> {orderTotal ? orderTotal.toFixed(2) : 'N/A'} TND</li>
            <li><strong>Payment Method:</strong> {paymentMethod}</li>
            <li><strong>Delivery:</strong> {deliveryDetails ? `${deliveryDetails.firstName} ${deliveryDetails.lastName}` : 'N/A'}</li>
          </ul>
        </div>

        {/* Buttons for navigation */}
        <div className="button-group">
          <button onClick={() => navigate('/')} className="home-btn">Back to Home</button>
          <button onClick={() => navigate('/orders')} className="orders-btn">View My Orders</button>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
