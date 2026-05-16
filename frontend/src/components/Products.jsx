



import React, { useState } from 'react'; // useState add kiya
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import "../App.css";

const Products = () => {
  const navigate = useNavigate();
  
  // 1. Filter State banayi (By default 'All' rahega)
  const [filter, setFilter] = useState('All');

  const products = [
    { id: 1, category: 'Doors', title: 'Solid Teak Main Door', img: 'https://i.pinimg.com/1200x/f5/2c/b3/f52cb3dc6c5ad7e48185bdee6ff9ddbd.jpg' },
    { id: 2, category: 'Interior', title: 'Luxury Master Bedroom', img: 'https://i.pinimg.com/736x/c3/ba/91/c3ba9153dbc228cc65b9746f460b95c0.jpg' },
    { id: 3, category: 'Panels', title: 'Fluted Wall Paneling', img: 'https://i.pinimg.com/736x/c2/c5/b4/c2c5b4a7f0f4a5b670e39087813712a3.jpg' },
    { id: 4, category: 'Exterior', title: 'Weatherproof Cladding', img: 'https://i.pinimg.com/1200x/8f/df/cd/8fdfcd7a00c42b26f4bbec89017b83ac.jpg' },
    { id: 5, category: 'Louvers', title: 'Modern TV Unit Louvers', img: 'https://i.pinimg.com/736x/d2/bd/bc/d2bdbcb64c781f6c5cf075492a778ccb.jpg' },
    { id: 6, category: 'Exterior', title: 'Wooden Decking Area', img: 'https://i.pinimg.com/1200x/74/a1/55/74a15549e3cab3bb7d4186264cde4867.jpg' },
    { id: 7, category: 'Mandir', title: 'Wooden Temple Design', img: 'https://i.pinimg.com/736x/93/1b/e3/931be39676753f956dc52f3d2d0de246.jpg' },
    { id: 8, category: 'Sofa', title: 'Modern Sofa Design', img: 'https://i.pinimg.com/736x/9a/94/7b/9a947b44a85bd02e74a5ea3023b72835.jpg' },
    { id: 9, category: 'Kitchen', title: 'Modern Kitchen Design', img: 'https://i.pinimg.com/1200x/3d/e4/14/3de414f3818c982ca342c51adf6e9f3a.jpg' },
    { id: 10, category: 'Doors', title: 'Solid Teak Main Door', img: 'https://i.pinimg.com/736x/5c/c0/af/5cc0af3f8f2ce02032646d101445b382.jpg' },
    { id: 11, category: 'Mandir', title: 'Wooden Temple Design', img: 'https://i.pinimg.com/736x/f0/b6/4d/f0b64d3c79e64962add5b7bcd9a7a6db.jpg' },
    { id: 12, category: 'Interior', title: 'Luxury Drawing Room', img: 'https://i.pinimg.com/1200x/7d/7a/d9/7d7ad98e0630b982976e9ae0440d1bd4.jpg' },
    { id: 13, category: 'Sofa', title: 'Modern Sofa Design', img: 'https://i.pinimg.com/1200x/c9/7d/ee/c97dee0f11a8d9d36da33839fdeb236a.jpg' },
    { id: 14, category: 'Panels', title: 'Fluted Wall Paneling', img: 'https://i.pinimg.com/736x/07/35/f7/0735f76246a3848a4139cbdf3a149362.jpg' },
    { id: 15, category: 'Louvers', title: 'Modern TV Unit Louvers', img: 'https://i.pinimg.com/736x/99/f0/fe/99f0fe75a850b09861bea3402f25fa0d.jpg' },
  ];

  const categories = ['All', 'Doors', 'Interior', 'Panels', 'Louvers', 'Exterior', 'Mandir', 'Sofa', 'Kitchen'];

  // 2. Products Filter Logic
  const filteredProducts = filter === 'All' 
    ? products 
    : products.filter(item => item.category === filter);

  const handleAddToCart = async (product) => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      Swal.fire({ icon: 'warning', title: 'Please Login', text: 'To order products You need to login first!', confirmButtonColor: '#a66d3b' });
      navigate("/login");
      return;
    }

    try {
      const cartRes = await axios.post("https://wooden-backend.onrender.com/cart/add", {
        userId,
        productId: String(product.id),
        title: product.title,
        category: product.category,
        img: product.img,
        price: 500,
        quantity: 1
      });

      if (cartRes.data.success || cartRes.status === 201) {
        window.dispatchEvent(new Event('cartUpdated'));
        Swal.fire({ icon: 'success', title: 'Added!', text: 'Added to cart Successfully.', timer: 1500, showConfirmButton: false });
      }
    } catch (error) {
      Swal.fire({ icon: 'error', title: 'Oops...', text: 'Database error!' });
    }
  };

  return (
    <section className="products-section">
      <div className="products-container">
        
     <div className="section-header">
        <span className="subtitle">Our Craftsmanship</span>
         <h2 className="title">Popular Wooden Solutions</h2>

        {/* 3. Categories Buttons UI */}
        <div className="category-filter-container">
          {categories.map((cat) => (
            <button 
              key={cat} 
              className={`filter-btn ${filter === cat ? 'active' : ''}`}
              onClick={() => setFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div></div>

        {/* 4. Displaying Filtered Products */}
        <div className="product-grid">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div key={product.id} className="product-card">
                <div className="product-image">
                  <img src={product.img} alt={product.title} />
                  <div className="product-overlay">
                    <button className="view-details" onClick={() => handleAddToCart(product)}>
                      Add to Cart 🛒
                    </button>
                  </div>
                </div>
                <div className="product-info">
                  <span className="cat-tag">{product.category}</span>
                  <h3>{product.title}</h3>
                  <img src="https://cdn-icons-png.flaticon.com/128/11906/11906637.png" style={{width: '20px', marginTop: '5px'}} alt="rating" />
                </div>
              </div>
            ))
          ) : (
            <p className="no-products">No products found in this category.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Products;