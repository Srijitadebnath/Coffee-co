import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import { CartProvider } from './context/CartContext';
import { OrderProvider } from './context/OrderContext';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home';
import MenuPage from './pages/MenuPage';
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';
import Admin from './pages/Admin';

// 🔥 Handles animations + QR table detection
const AnimatedRoutes = () => {
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const tableNumber = queryParams.get('table');

    if (tableNumber) {
      localStorage.setItem('tableNumber', tableNumber);

      console.log(`✅ Table detected: ${tableNumber}`);

      // 🔥 OPTIONAL: Auto redirect to menu when QR is scanned
      if (location.pathname === "/") {
        window.location.href = "/menu";
      }
    }
  }, [location]);

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>

        {/* CUSTOMER SIDE */}
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/success/:orderId" element={<OrderSuccess />} />

        {/* ADMIN SIDE */}
        <Route path="/admin" element={<Admin />} />

      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <BrowserRouter>

      <OrderProvider>
        <CartProvider>

          <div className="bg-background-dark min-h-screen font-sans text-primary selection:bg-accent selection:text-secondary overflow-x-hidden">

            {/* 🔥 Navbar always visible */}
            <Navbar />

            {/* 🔥 Pages */}
            <AnimatedRoutes />

            {/* 🔥 Footer */}
            <Footer />

          </div>

        </CartProvider>
      </OrderProvider>

    </BrowserRouter>
  );
}

export default App;