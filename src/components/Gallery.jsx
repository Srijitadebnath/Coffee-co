import React from 'react';
import { motion } from 'framer-motion';

const gridItems = [
  {
    id: 1,
    title: 'cozy corners',
    img: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80',
    className: 'md:col-span-2 md:row-span-2',
  },
  {
    id: 2,
    title: 'crafted with love',
    img: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80',
    className: 'col-span-1 row-span-1',
  },
  {
    id: 3,
    title: 'daily rituals',
    img: 'https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?auto=format&fit=crop&q=80',
    className: 'col-span-1 row-span-1',
  },
  {
    id: 4,
    title: 'freshly roasted',
    img: 'https://images.unsplash.com/photo-1611162458324-aae1eb4129a4?auto=format&fit=crop&q=80',
    className: 'col-span-1 md:col-span-2 row-span-1',
  },
];

const Gallery = () => {
  return (
    <section id="gallery" className="py-24 bg-background-light text-primary">
      <div className="container mx-auto px-6 max-w-6xl">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="font-cursive text-accent text-3xl mb-4 italic">step inside</p>
          <h2 className="text-4xl md:text-5xl font-extrabold font-sans lowercase tracking-tight text-primary">our ambience</h2>
        </motion.div>

        {/* Bento Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-none md:grid-rows-3 gap-4 md:gap-6 h-auto md:h-[600px]">
          {gridItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative overflow-hidden rounded-2xl group cursor-pointer ${item.className} h-[250px] md:h-auto shadow-sm`}
            >
              <img 
                src={item.img} 
                alt={item.title} 
                className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-primary/20 group-hover:bg-primary/40 transition-colors duration-500 flex items-center justify-center backdrop-blur-[1px] group-hover:backdrop-blur-sm">
                <h3 className="text-secondary font-cursive text-3xl md:text-4xl opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0 text-center px-4">
                  {item.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Gallery;
