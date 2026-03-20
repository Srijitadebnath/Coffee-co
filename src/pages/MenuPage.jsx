import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { HiShoppingCart } from 'react-icons/hi';
import Menu from '../components/Menu';
import CartDrawer from '../components/CartDrawer';
import { useCart } from '../context/CartContext';

const MenuPage = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { totalItems } = useCart();

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.5 }}
      className="page-transition-wrapper min-h-screen bg-background-dark pt-20 relative"
    >
      <Menu />
      
      {/* Floating Cart Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsCartOpen(true)}
        className="fixed bottom-8 right-8 bg-accent text-secondary p-4 rounded-full shadow-[0_5px_20px_rgba(139,94,60,0.5)] z-40 hover:shadow-[0_10px_30px_rgba(139,94,60,0.7)] transition-shadow"
      >
        <HiShoppingCart size={28} />
        {totalItems > 0 && (
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            key={totalItems}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="absolute -top-2 -right-2 bg-primary text-secondary text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full shadow-md"
          >
            {totalItems}
          </motion.div>
        )}
      </motion.button>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </motion.div>
  );
};

export default MenuPage;
