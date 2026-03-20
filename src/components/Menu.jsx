import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaStar } from 'react-icons/fa';
import { HiPlus, HiMinus } from 'react-icons/hi';
import { useCart } from '../context/CartContext';

// ✅ NEW IMPORT
import { useSearchParams } from 'react-router-dom';

const menuData = {
  coffee: [
    { id: 1, name: 'Americano', desc: 'Bold & classic smooth espresso', price: 180, img: 'https://images.unsplash.com/photo-1551030173-122aabc4489c?auto=format&fit=crop&q=80', rating: 4 },
    { id: 2, name: 'Cappuccino', desc: 'Espresso with steamed milk foam', price: 220, img: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&q=80', rating: 5 },
    { id: 3, name: 'Latte', desc: 'Silky smooth espresso with hot milk', price: 240, img: 'https://images.unsplash.com/photo-1576092762791-dd9e2220afa1?auto=format&fit=crop&q=80', rating: 5 },
    { id: 4, name: 'Espresso', desc: 'Strong, concentrated coffee shot', price: 150, img: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&q=80', rating: 4 },
    { id: 5, name: 'Mocha', desc: 'Chocolatey espresso delight', price: 260, img: 'https://images.unsplash.com/photo-1579992357154-faf4bde95b3d?auto=format&fit=crop&q=80', rating: 4.5 },
  ],
  cold_brews: [
    { id: 6, name: 'Classic Cold Brew', desc: 'Slow-steeped cold coffee', price: 220, img: 'https://images.unsplash.com/photo-1461023058943-07cb1ce89fb5?auto=format&fit=crop&q=80', rating: 5 },
    { id: 7, name: 'Iced Vanilla Latte', desc: 'Sweet vanilla & chilled milk', price: 250, img: 'https://images.unsplash.com/photo-1495474472207-464a4d965977?auto=format&fit=crop&q=80', rating: 4 },
  ],
  bites: [
    { id: 8, name: 'Butter Croissant', desc: 'Flaky & fresh french pastry', price: 140, img: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&q=80', rating: 5 },
    { id: 9, name: 'Avocado Sandwich', desc: 'Healthy & green on sourdough', price: 300, img: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&q=80', rating: 4.5 },
    { id: 10, name: 'Cheese Bun', desc: 'Warm savory melting cheese', price: 160, img: 'https://images.unsplash.com/photo-1698774783307-e819b16ef5d7?auto=format&fit=crop&q=80', rating: 4 },
    { id: 11, name: 'Blueberry Muffin', desc: 'Sweet soft freshly baked maffin', price: 180, img: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&q=80', rating: 4 },
  ],
};

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState('coffee');

  // ✅ UPDATED: get setTableNumber also
  const { addToCart, cart, updateQuantity, setTableNumber } = useCart();

  // ✅ NEW: read URL param
  const [searchParams] = useSearchParams();

  // ✅ NEW: store table number
  useEffect(() => {
    const table = searchParams.get("table");
    if (table) {
      setTableNumber(table);
      console.log("✅ Table detected:", table);
    }
  }, [searchParams]);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <section className="py-24 bg-background-dark text-primary min-h-screen">
      <div className="container mx-auto px-6 max-w-6xl">

        {/* Header */}
        <div className="text-center mb-16">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-accent text-3xl mb-4 font-cursive"
          >
            taste the craft
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl font-extrabold text-primary"
          >
            our menu
          </motion.h2>
        </div>

        {/* Categories */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center mb-12 gap-4"
        >
          {['all', 'coffee', 'cold_brews', 'bites'].map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-8 py-3 rounded-full font-bold transition-all duration-300 ${
                activeCategory === cat 
                  ? 'bg-primary text-secondary shadow-[0_5px_15px_rgba(58,31,23,0.3)]' 
                  : 'bg-secondary/60 text-muted hover:bg-secondary hover:text-primary backdrop-blur-md'
              }`}
            >
              {cat === 'cold_brews' ? 'Cold Brews' : cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </motion.div>

        {/* Items */}
        <motion.div variants={containerVariants} initial="hidden" animate="show"
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          <AnimatePresence mode="popLayout">
            {Object.keys(menuData)
              .filter(key => activeCategory === 'all' || key === activeCategory)
              .map(categoryKey =>
                menuData[categoryKey].map(item => {

                  const cartItem = cart.find(c => c.id === item.id);

                  return (
                    <motion.div 
                      key={item.id} 
                      layout
                      variants={itemVariants}
                      initial="hidden"
                      animate="show"
                      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                      whileHover={{ y: -10 }}
                      className="bg-secondary rounded-2xl p-5 shadow-lg shadow-black/5 hover:shadow-2xl hover:shadow-accent/20 transition-all duration-300 group flex flex-col"
                    >

                      <div className="relative overflow-hidden rounded-xl mb-5">
                        <img 
                          src={item.img} 
                          alt={item.name}
                          className="h-56 w-full object-cover transform group-hover:scale-110 transition-transform duration-700" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                        
                        <div className="absolute top-4 right-4 bg-secondary/90 backdrop-blur-md px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow-md">
                          <FaStar className="text-yellow-400" size={16} />
                          <span className="text-sm font-bold text-primary">{item.rating}</span>
                        </div>
                      </div>

                      <h3 className="text-2xl font-extrabold text-primary mb-2 line-clamp-1">{item.name}</h3>
                      <p className="text-muted mb-6 line-clamp-2 leading-relaxed flex-grow">{item.desc}</p>

                      <div className="flex items-center justify-between mt-auto">
                        <span className="text-2xl font-extrabold text-accent">₹{item.price}</span>

                        {cartItem ? (
                          <div className="flex items-center gap-4 bg-background-light py-2 px-2 rounded-2xl border-2 border-primary/5">
                            <button 
                              onClick={() => updateQuantity(item.id, -1)}
                              className="text-primary hover:text-secondary hover:bg-primary p-1.5 transition-colors bg-secondary rounded-xl shadow-sm"
                            >
                              <HiMinus size={20} />
                            </button>
                            <span className="font-extrabold text-primary min-w-[24px] text-center text-lg">{cartItem.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, 1)}
                              className="text-primary hover:text-secondary hover:bg-primary p-1.5 transition-colors bg-secondary rounded-xl shadow-sm"
                            >
                              <HiPlus size={20} />
                            </button>
                          </div>
                        ) : (
                          <motion.button 
                            whileTap={{ scale: 0.95 }}
                            onClick={() => addToCart(item)}
                            className="bg-primary text-secondary px-6 py-3 rounded-2xl font-bold hover:bg-accent transition-colors shadow-lg hover:shadow-accent/30"
                          >
                            Add to Cart
                          </motion.button>
                        )}
                      </div>

                    </motion.div>
                  );
                })
              )}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
};

export default Menu;