import React from 'react';
import { motion } from 'framer-motion';
import { Typewriter } from 'react-simple-typewriter';
import { Link as RouterLink } from 'react-router-dom';

const Hero = () => {
  return (
    <section id="hero" className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      
      {/* Background Image with Parallax-like scale animation */}
      <motion.div 
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0 w-full h-full"
      >
        <img 
          src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80" 
          alt="Coffee Background" 
          className="w-full h-full object-cover"
        />
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-primary/40 sm:bg-primary/50 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-primary/80"></div>
      </motion.div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 flex flex-col items-center max-w-4xl mx-auto mt-20">
        
        {/* Overline brand name */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-accent-light uppercase tracking-[0.3em] text-sm font-semibold mb-6"
        >
          coffee.co
        </motion.p>
        
        {/* Main Typing Text */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-5xl md:text-7xl lg:text-8xl font-sans font-extrabold text-secondary mb-6 lowercase tracking-tight"
        >
          <span className="min-h-[1.5em] block">
            <Typewriter
              words={['brew. sip. vibe.', 'freshly roasted.', 'your daily ritual.']}
              loop={true}
              cursor
              cursorStyle='_'
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={2000}
            />
          </span>
        </motion.h1>

        {/* Subtext */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="text-2xl md:text-3xl text-secondary/90 font-cursive mb-10"
        >
          your daily dose of comfort starts here
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <RouterLink to="/menu">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-accent text-secondary px-8 py-4 rounded-full font-semibold uppercase tracking-wider text-sm shadow-[0_0_15px_rgba(139,94,60,0.4)] hover:shadow-[0_0_25px_rgba(139,94,60,0.7)] transition-shadow duration-300 backdrop-blur-sm"
            >
              explore menu
            </motion.button>
          </RouterLink>
        </motion.div>

      </div>
      
    </section>
  );
};

export default Hero;
