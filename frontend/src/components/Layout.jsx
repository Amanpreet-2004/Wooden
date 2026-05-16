import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <div className="app-layout">
  
      <Navbar />

   
      <main className="main-content-wrapper">
        {children}
      </main>

      {/* Footer remains at the bottom */}
      <Footer />
    </div>
  );
};

export default Layout;