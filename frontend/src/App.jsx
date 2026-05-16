// import React from "react"
// import Navbar from "./components/Navbar";
// import Home from "./components/Home"
// import Features from "./components/Features";
// import About from "./components/About";
// import Products from "./components/Products";
// import Services from "./components/Services";
// import Testimonial from "./components/Testimonial";
// import Contact from "./components/Contact";
// import Footer from "./components/Footer";

// function App() {


//   return (
//     <>
//       <Navbar/>
//       <Home/>
//       <Features/>
//       <About/>
//       <Products/>
//       <Services/>
//       <Testimonial/>
//       <Contact/>
//       <Footer/>
//     </>
//   )
// }

// export default App
import React from "react"
import { Routes, Route } from "react-router-dom"
import Layout from "./components/Layout"

// Section Components
import Home from "./components/Home"
import Features from "./components/Features";
import About from "./components/About";
import Products from "./components/Products";
import Services from "./components/Services";
import Testimonial from "./components/Testimonial";
import Contact from "./components/Contact";
import Qoute from "./components/Qoute";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";

function App() {
  return (
    <Layout>
      <Routes>
        {/* This Route contains all your home sections together */}
        <Route path="/" element={
          <>
            <div id="home"><Home /></div>
            <div id="features"><Features /></div>
            <div id="about"><About /></div>
            <div id="products"><Products /></div>
            <div id="services"><Services /></div>
            <div id="testimonial"><Testimonial /></div>
            <div id="contact"><Contact /></div>
          
          </>
        } />

        <Route path="/about" element={<About/>}/>
         <Route path="/features" element={<Features/>}/>
          <Route path="/products" element={<Products/>}/>
           <Route path="/Services" element={<Services/>}/>
            <Route path="/testimonial" element={<Testimonial/>}/>
        <Route path="/contact" element={<Contact />} />
        <Route path="/qoute" element={<Qoute />} />
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/checkout" element={<Checkout/>}/>
      </Routes>
    </Layout>
  )
}

export default App