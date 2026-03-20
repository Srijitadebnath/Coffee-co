import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleNav = () => setNav(!nav);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const location = useLocation();
  const isHome = location.pathname === '/';

  const links = [
    { name: 'home', to: '/' },
    { name: 'gallery', to: '/#gallery' },
    { name: 'menu', to: '/menu' },
    { name: 'reviews', to: '/#reviews' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-background-light/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        
        {/* Logo */}
        <RouterLink to="/" className="cursor-pointer">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className={`text-2xl font-extrabold tracking-[0.2em] font-sans ${scrolled ? 'text-primary' : 'text-secondary'}`}
          >
            coffee.co
          </motion.h1>
        </RouterLink>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8">
          {links.map((link, index) => (
            <motion.li 
              key={link.name}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <RouterLink 
                to={link.to} 
                className={`cursor-pointer capitalize font-semibold text-sm tracking-wide transition-colors duration-300 hover:text-accent ${scrolled ? 'text-primary' : 'text-secondary/90'}`}
              >
                {link.name}
              </RouterLink>
            </motion.li>
          ))}
        </ul>

        {/* Mobile menu button */}
        <div className="md:hidden z-50" onClick={toggleNav}>
          {nav ? (
            <HiX size={28} className="text-primary cursor-pointer" />
          ) : (
            <HiMenuAlt3 size={28} className={`cursor-pointer ${scrolled ? 'text-primary' : 'text-secondary'}`} />
          )}
        </div>

      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {nav && (
          <motion.div 
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="fixed inset-0 w-full h-screen bg-background-light flex flex-col justify-center items-center z-40"
          >
            <ul className="flex flex-col items-center space-y-8">
              {links.map((link) => (
                <li key={link.name}>
                  <RouterLink 
                    to={link.to} 
                    onClick={toggleNav}
                    className="cursor-pointer capitalize text-4xl font-cursive text-primary hover:text-accent transition-colors"
                  >
                    {link.name}
                  </RouterLink>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

    </nav>
  );
};

export default Navbar;
