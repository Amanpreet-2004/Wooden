import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import "../App.css";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  // 1. Fetch Cart Data
  const fetchCart = async () => {
    if (!userId) {
      setLoading(false);
      return;
    }

    try {
      const res = await axios.get(`https://wooden-backend.onrender.com/cart/get/${userId}`);
      setCartItems(res.data || []);
    } catch (err) {
      console.error("Cart fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [userId]);

  // 2. Remove Single Item
  const handleRemove = async (productId) => {
    try {
      const res = await axios.post("https://wooden-backend.onrender.com/cart/remove", {
        userId,
        productId
      });

      if (res.data.success) {
        // UI se hatao
        setCartItems(prev => prev.filter(item => item.productId !== productId));
        
        // Navbar count update karne ke liye signal bhejo
        window.dispatchEvent(new Event('cartUpdated'));

        Swal.fire({
          icon: 'success',
          title: 'Removed',
          text: 'Item removed from the cart Successfully.',
          timer: 1500,
          showConfirmButton: false
        });
      }
    } catch (err) {
      console.error("Remove error:", err);
      Swal.fire('Error', 'Item not removed', 'error');
    }
  };

  

  // 4. Checkout
  const handleCheckout = async () => {
    Swal.fire({
      title: 'Order Inquiry Sent!',
      text: 'We connect u soon.',
      icon: 'success',
      confirmButtonColor: '#a66d3b'
    });
    
    // Yahan aap clear cart function call kar sakte hain order ke baad
    // await handleClearCart(); 
    navigate('/checkout');
  };

  const handleClearCart = async () => {
  // 1. User se confirm karein (Safety ke liye)
  const result = await Swal.fire({
    title: 'Are you sure?',
    text: "Your cart has cleaned completly!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#333',
    confirmButtonText: 'Yes, Clear All!'
  });

  if (result.isConfirmed) {
    try {
      // 2. API call karein
      const res = await axios.delete(`https://wooden-backend.onrender.com/cart/clear/${userId}`);

      if (res.data.success) {
        // 3. Local state khali karein taaki UI turant update ho
        setCartItems([]); 

        // 4. Navbar count update karne ke liye event fire karein
        window.dispatchEvent(new Event('cartUpdated'));

        Swal.fire(
          'Cleared!',
          'Now Your cart has been cleared.',
          'success'
        );
      }
    } catch (err) {
      console.error("Clear cart error:", err);
      Swal.fire('Error', 'Cart khali nahi ho paya!', 'error');
    }
  }
};

  if (loading) return <div className="loader">Loading your cart...</div>;

  return (
    <div className="cart-page">
      <div className="cart-container">
        <div className="cart-header">
          <h2>Your Selection</h2>
          <p>Review your premium wooden items before checkout.</p>
        </div>

        {!token ? (
          <div className="empty-cart-box">
            <p>Please login to see your cart.</p>
            <button onClick={() => navigate('/login')} className="shop-now-btn">Login Now</button>
          </div>
        ) : cartItems.length === 0 ? (
          <div className="empty-cart-box">
            <img src="https://cdn-icons-png.flaticon.com/512/11329/11329060.png" alt="Empty" />
            <p>Your cart feels a bit light!</p>
            <button onClick={() => navigate('/Products')} className="shop-now-btn">
              Browse Products
            </button>
          </div>
        ) : (
          <div className="cart-layout">
            <div className="cart-items-column">
              {cartItems.map((item) => (
                <div key={item.productId} className="cart-item-card">
                  <div className="item-img-box">
                    <img src={item.img} alt={item.title} />
                  </div>
                  <div className="item-info">
                    <div className="item-top">
                      <span className="item-cat">{item.category}</span>
                      <h3>{item.title}</h3>
                    </div>
                    <div className="item-controls">
                      <div className="qty-box">
                        <span>Quantity: <strong>{item.quantity}</strong></span>
                      </div>
                      <button 
                        className="delete-item-btn"
                        onClick={() => handleRemove(item.productId)}
                      >
                        <i className="fa-solid fa-trash"></i> Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-summary-card">
              <h3>Order Summary</h3>
              <div className="summary-details">
                <div className="summary-row">
                  <span>Total Items</span>
                  <span>{cartItems.reduce((acc, item) => acc + item.quantity, 0)}</span>
                </div>
                <div className="summary-row total">
                  <span>Estimated Total</span>
                  <span>Quotation Based</span>
                </div>
              </div>
              <button className="main-checkout-btn" onClick={handleCheckout}>
                Place Order Inquiry
              </button>
              <button className="clear-all-text" onClick={handleClearCart}>
                Clear All Items
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;