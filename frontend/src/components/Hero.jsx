import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    id: 1,
    title: "100% Natural & Fresh Dry Fruits",
    subtitle: "THE ESSENCE OF PURITY",
    description: "Hand-selected from the finest orchards across the globe, our premium nuts and dates redefine quality.",
    image: "/dry-fruits-gift-jar-trio.png",
    cta: "Shop Now",
    link: "/products"
  },
  {
    id: 2,
    title: "Nature's Finest Jewels",
    subtitle: "ORGANIC & SUSTAINABLE",
    description: "Experience the richness of authentic flavors with our ethically sourced, chemical-free selection.",
    image: "/dry-fruits-black-display-assorted-nuts.png",
    cta: "Explore Collection",
    link: "/products"
  },
  {
    id: 3,
    title: "The Art of Pure Gifting",
    subtitle: "LIMITED EDITION HAMPER COLLECTION",
    description: "Discover rare varieties of jumbo cashews and saffron-infused almonds for the ultimate indulgence.",
    image: "/dry-fruits-ivory-three-compartment-box.png",
    cta: "Discover More",
    link: "/products"
  }
];

const Hero = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-[75vh] md:h-[95vh] w-full overflow-hidden bg-warm-brown texture-wood">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-warm-brown/80 via-warm-brown/40 to-transparent z-10" />
          
          <img
            src={slides[current].image}
            alt={slides[current].title}
            className="h-full w-full object-cover"
            loading="eager"
          />

          <div className="absolute inset-0 z-20 flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <div className="max-w-2xl">
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className="text-harvest-gold text-[10px] md:text-xs font-black tracking-[0.4em] uppercase mb-4"
                >
                  {slides[current].subtitle}
                </motion.p>
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="text-white text-4xl md:text-7xl font-black mb-6 leading-[1.1] tracking-tight font-serif italic"
                >
                  {slides[current].title}
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.8 }}
                  className="text-stone-300 text-sm md:text-lg mb-10 leading-relaxed font-light max-w-lg italic"
                >
                  {slides[current].description}
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9, duration: 0.8 }}
                >
                  <Link
                    to={slides[current].link}
                    className="inline-flex items-center px-12 py-5 bg-harvest-gold text-warm-brown text-[11px] font-black uppercase tracking-[0.2em] transition-all duration-300 group shadow-2xl hover:bg-white"
                  >
                    {slides[current].cta}
                    <ArrowRight className="ml-3 w-4 h-4 transition-transform group-hover:translate-x-2" />
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Slide Indicators */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex space-x-4">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-[2px] transition-all duration-500 ${
              current === index ? 'w-12 bg-white' : 'w-6 bg-white/30 hover:bg-white/60'
            }`}
          />
        ))}
      </div>

      {/* Navigation Arrows */}
      <div className="hidden md:flex absolute bottom-10 right-10 z-30 space-x-4">
        <button
          onClick={() => setCurrent(current === 0 ? slides.length - 1 : current - 1)}
          className="p-3 border border-white/20 text-white hover:bg-white hover:text-black transition-all duration-300"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={() => setCurrent(current === slides.length - 1 ? 0 : current + 1)}
          className="p-3 border border-white/20 text-white hover:bg-white hover:text-black transition-all duration-300"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default Hero;

