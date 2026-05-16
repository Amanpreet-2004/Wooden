import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import "../App.css";

const Checkout = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const [cartItems, setCartItems] = useState([]);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    pincode: ''
  });

  useEffect(() => {
    // Cart fetch logic (taaki user ko summary dikhe)
    const fetchCart = async () => {
      try {
        const res = await axios.get(`https://wooden-backend.onrender.com/cart/get/${userId}`);
        setCartItems(res.data || []);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };
    fetchCart();
  }, [userId]);

  const totalAmount = cartItems.reduce((acc, item) => acc + (item.price || 500) * item.quantity, 0);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

 const handlePlaceOrder = async (e) => {
  e.preventDefault();
  
  try {
    const res = await axios.post("https://wooden-backend.onrender.com/order/place", {
      ...formData,
      cartItems: cartItems
    });

    if (res.data.success) {
      Swal.fire('Success!', 'Order inquiry sent! Check your email.', 'success');
      // Cart khali karne ki API call karein yahan
      navigate('/');
    }
  } catch (err) {
    Swal.fire('Error', 'Mail send karne mein error aaya!', 'error');
  }
};

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        <h2 className="checkout-title">Finalize Your Selection</h2>
        
        <div className="checkout-layout">
          {/* Left: Shipping Form */}
          <form className="shipping-form" onSubmit={handlePlaceOrder}>
            <h3>Shipping Details</h3>
            <div className="form-grid">
              <input type="text" name="fullName" placeholder="Full Name" required onChange={handleChange} />
              <input type="email" name="email" placeholder="Email Address" required onChange={handleChange} />
              <input type="tel" name="phone" placeholder="Phone Number" required onChange={handleChange} />
              <input type="text" name="city" placeholder="City" required onChange={handleChange} />
              <input type="text" name="pincode" placeholder="Pincode" required onChange={handleChange} />
              <textarea name="address" placeholder="Full Address" rows="3" required onChange={handleChange}></textarea>
            </div>
            <button type="submit" className="place-order-btn">SEND ORDER INQUIRY</button>
          </form>

          {/* Right: Order Summary */}
          <div className="order-summary-sidebar">
            <h3>Your Selection ({cartItems.length})</h3>
            <div className="summary-items-list">
              {cartItems.map(item => (
                <div key={item.productId} className="summary-item">
                  <img src={item.img} alt={item.title} />
                  <div>
                    <p className="item-name">{item.title}</p>
                    <p className="item-qty">Qty: {item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="total-divider"></div>
            <div className="summary-row total">
              <span>Total Quotation Items</span>
              <span>{cartItems.length}</span>
            </div>
            <p className="note">* Our team will contact you for precise pricing and wood quality options.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;