import React from 'react';
import { Link } from 'react-scroll';
import { FaInstagram, FaTwitter, FaTiktok } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <footer className="bg-primary pt-16 pb-8 border-t border-primary text-secondary">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-16">
          
          {/* Brand Info */}
          <div className="col-span-1 md:col-span-2 space-y-4">
            <Link to="hero" smooth={true} duration={800} className="cursor-pointer inline-block">
              <h1 className="text-3xl font-extrabold tracking-[0.2em] font-sans">coffee.co</h1>
            </Link>
            <p className="font-cursive italic text-accent-light text-2xl">brew. sip. vibe.</p>
            <p className="text-sm mt-6 max-w-xs text-secondary/70 leading-relaxed font-sans">
              We are a premium coffee lifestyle brand curating the perfect aesthetic, combining carefully roasted beans with beautiful spaces to inspire your day.
            </p>
          </div>
          
          {/* Quick Links */}
          <div className="col-span-1">
            <h4 className="font-semibold uppercase tracking-widest text-sm mb-6 font-sans">explore</h4>
            <ul className="space-y-3">
              {['home', 'gallery', 'menu', 'reviews'].map((link) => (
                <li key={link}>
                  <Link 
                    to={link === 'home' ? 'hero' : link} 
                    smooth={true} 
                    duration={800} 
                    className="capitalize text-secondary/70 hover:text-accent-light transition-colors duration-300 cursor-pointer text-sm font-medium"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact & Address */}
          <div className="col-span-1">
            <h4 className="font-semibold uppercase tracking-widest text-sm mb-6 font-sans">visit us</h4>
            <address className="not-italic text-secondary/70 text-sm space-y-2 mb-6 font-sans font-medium">
              <p>124 Aesthetic Avenue</p>
              <p>Downtown District</p>
              <p>New York, NY 10012</p>
            </address>
            
            {/* Socials */}
            <div className="flex space-x-4">
              <motion.a whileHover={{ y: -3, color: '#C69C6D' }} href="#" className="text-secondary/70 transition-colors">
                <FaInstagram size={20} />
              </motion.a>
              <motion.a whileHover={{ y: -3, color: '#C69C6D' }} href="#" className="text-secondary/70 transition-colors">
                <FaTwitter size={20} />
              </motion.a>
              <motion.a whileHover={{ y: -3, color: '#C69C6D' }} href="#" className="text-secondary/70 transition-colors">
                <FaTiktok size={20} />
              </motion.a>
            </div>
          </div>

        </div>
        
        {/* Bottom Bar */}
        <div className="pt-8 border-t border-secondary/10 flex flex-col md:flex-row justify-between items-center text-xs text-secondary/50 font-medium tracking-wide">
          <p>&copy; {new Date().getFullYear()} coffee.co. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-secondary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-secondary transition-colors">Terms of Service</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
