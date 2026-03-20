import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiX, HiPlus, HiMinus, HiTrash } from 'react-icons/hi';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const CartDrawer = ({ isOpen, onClose }) => {
  const { cart, updateQuantity, removeFromCart, cartTotal } = useCart();
  const navigate = useNavigate();

  const gst = cartTotal * 0.05; // 5% GST
  const grandTotal = cartTotal + gst;

  const handleCheckout = () => {
    onClose();
    navigate('/checkout');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-background-dark/60 backdrop-blur-sm z-50"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full sm:w-[400px] bg-background-light shadow-2xl z-50 flex flex-col border-l border-primary/10"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-primary/10">
              <h2 className="text-2xl font-sans font-extrabold lowercase text-primary">your cart</h2>
              <button 
                onClick={onClose}
                className="p-2 rounded-full hover:bg-primary/5 text-primary transition-colors"
              >
                <HiX size={24} />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-grow overflow-y-auto p-6 space-y-6">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-primary/50 space-y-4">
                  <p className="font-cursive text-2xl">it's empty in here</p>
                  <button 
                    onClick={onClose}
                    className="text-sm uppercase tracking-widest font-bold text-accent hover:text-accent-light transition-colors"
                  >
                    start browsing
                  </button>
                </div>
              ) : (
                cart.map((item) => (
                  <motion.div 
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    key={item.id} 
                    className="flex gap-4 items-center bg-secondary p-3 rounded-2xl shadow-sm border border-primary/5"
                  >
                    <img src={item.img} alt={item.name} className="w-20 h-20 object-cover rounded-xl" />
                    
                    <div className="flex-grow">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="font-bold text-primary leading-tight">{item.name}</h4>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="text-primary/40 hover:text-red-500 transition-colors"
                        >
                          <HiTrash size={18} />
                        </button>
                      </div>
                      
                      <p className="text-sm font-semibold text-accent mb-3">₹{item.price}</p>
                      
                      <div className="flex items-center space-x-3 bg-background-light w-fit rounded-full px-2 py-1 border border-primary/10">
                        <button 
                          onClick={() => updateQuantity(item.id, -1)}
                          className="p-1 rounded-full hover:bg-white text-primary transition-colors"
                        >
                          <HiMinus size={14} />
                        </button>
                        <span className="w-4 text-center text-sm font-bold text-primary">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, 1)}
                          className="p-1 rounded-full hover:bg-white text-primary transition-colors"
                        >
                          <HiPlus size={14} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer / Billing */}
            {cart.length > 0 && (
              <div className="p-6 bg-secondary border-t border-primary/10 space-y-4">
                <div className="space-y-2 text-sm text-primary/70">
                  <div className="flex justify-between">
                    <span>subtotal</span>
                    <span className="font-semibold text-primary">₹{cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>taxes (gst 5%)</span>
                    <span className="font-semibold text-primary">₹{gst.toFixed(2)}</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center pt-4 border-t border-primary/10 mb-6">
                  <span className="font-sans font-bold text-xl text-primary lowercase">total</span>
                  <span className="font-bold text-2xl text-accent">₹{grandTotal.toFixed(2)}</span>
                </div>

                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleCheckout}
                  className="w-full bg-accent text-secondary py-4 rounded-full font-bold uppercase tracking-widest text-sm shadow-xl hover:shadow-2xl transition-all"
                >
                  continue to checkout
                </motion.button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
