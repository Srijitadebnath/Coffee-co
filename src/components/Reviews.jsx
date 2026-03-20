import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { motion } from 'framer-motion';
import { FaStar } from 'react-icons/fa';

import 'swiper/css';
import 'swiper/css/pagination';

const reviews = [
  {
    id: 1,
    name: "Sarah Jenkins",
    text: "The aesthetic here is just unmatched. I come here every morning to get my matcha and read. The cozy corners are exactly what I need before work.",
    img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80",
    rating: 5,
  },
  {
    id: 2,
    name: "Michael Chen",
    text: "Best pouring I've seen in the city. The baristas really care about the craft. The avocado sourdough sandwich is a must-try!",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80",
    rating: 5,
  },
  {
    id: 3,
    name: "Emma Watson",
    text: "Their cold brew changed my life. Smooth, not bitter, and perfect for summer days. Love the terracotta aesthetic and the friendly staff.",
    img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80",
    rating: 4,
  },
  {
    id: 4,
    name: "David Smith",
    text: "Great place to work. The vibe is immaculate. The ambient lo-fi music combined with the smell of roasting beans is therapeutic.",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80",
    rating: 5,
  },
];

const Reviews = () => {
  return (
    <section id="reviews" className="py-24 bg-background-light text-primary overflow-hidden">
      <div className="container mx-auto px-6 max-w-6xl">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="font-cursive text-accent text-3xl mb-4 italic">community</p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-primary font-sans lowercase tracking-tight">what people say</h2>
        </motion.div>

        {/* Swiper Slider */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
        >
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            pagination={{ clickable: true, dynamicBullets: true }}
            className="pb-16"
          >
            {reviews.map((review) => (
              <SwiperSlide key={review.id} className="h-auto">
                <div className="bg-secondary/60 backdrop-blur-md border border-secondary/80 p-8 rounded-3xl h-full flex flex-col items-center text-center shadow-[0_10px_30px_rgba(58,31,23,0.05)] hover:shadow-[0_15px_35px_rgba(139,94,60,0.15)] transition-shadow duration-300">
                  
                  {/* Avatar */}
                  <div className="w-20 h-20 rounded-full overflow-hidden mb-4 border-2 border-accent/20">
                    <img src={review.img} alt={review.name} className="w-full h-full object-cover" />
                  </div>
                  
                  {/* Name & Stars */}
                  <h3 className="font-bold text-primary text-lg">{review.name}</h3>
                  <div className="flex text-accent space-x-1 my-3 text-sm">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className={i < review.rating ? 'text-accent' : 'text-primary/10'} />
                    ))}
                  </div>
                  
                  {/* Review Text */}
                  <p className="text-muted font-sans font-medium leading-relaxed mt-2 text-[14px]">
                    "{review.text}"
                  </p>
                  
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
        
      </div>
    </section>
  );
};

export default Reviews;
