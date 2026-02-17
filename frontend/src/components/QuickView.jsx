import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingCart, Star, ShieldCheck, Truck, Loader2 } from 'lucide-react';
import { useCart } from '../context/CartContext';

const QuickView = ({ product, isOpen, onClose }) => {
  const { addToCart, setIsCartOpen } = useCart();

  if (!product) return null;

  const handleAddToCart = () => {
    addToCart(product);
    onClose();
    setIsCartOpen(true);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 sm:p-6 lg:p-8">
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative bg-white w-full max-w-5xl overflow-hidden shadow-2xl flex flex-col md:flex-row"
          >
            <button
              onClick={onClose}
              className="absolute top-6 right-6 z-10 p-3 bg-white/90 rounded-full hover:rotate-90 transition-all duration-500 shadow-lg text-stone-400 hover:text-emerald-950"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Left: Image */}
            <div className="md:w-1/2 aspect-[4/5] bg-stone-50 overflow-hidden">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            </div>

            {/* Right: Info */}
            <div className="md:w-1/2 p-8 sm:p-12 flex flex-col justify-center">
              <div className="space-y-8">
                <div>
                  <span className="text-harvest-gold text-[10px] font-black uppercase tracking-[0.4em] mb-4 block">{product.category}</span>
                  <h2 className="text-3xl sm:text-4xl font-black text-warm-brown tracking-tighter uppercase italic leading-tight">{product.name}</h2>
                  <div className="flex items-center mt-4 space-x-4">
                    <div className="flex space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-3 h-3 ${i < Math.floor(product.rating) ? 'text-harvest-gold fill-harvest-gold' : 'text-stone-200'}`} />
                      ))}
                    </div>
                    <span className="text-[10px] text-stone-400 font-bold uppercase tracking-widest">{product.reviews} Master Reviews</span>
                  </div>
                </div>

                <div className="flex items-baseline space-x-4">
                  <span className="text-4xl font-black text-warm-brown tracking-tighter">₹{product.price}</span>
                  {product.originalPrice > product.price && (
                    <span className="text-xl text-stone-300 line-through font-light">₹{product.originalPrice}</span>
                  )}
                </div>

                <p className="text-stone-500 font-display italic leading-relaxed text-lg">
                  {product.description}
                </p>

                <div className="grid grid-cols-2 gap-6 py-6 border-y border-stone-100">
                  <div className="flex items-center space-x-3">
                    <ShieldCheck className="w-5 h-5 text-emerald-700" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-stone-400">Pure Quality</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Truck className="w-5 h-5 text-emerald-700" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-stone-400">Express Delivery</span>
                  </div>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="w-full bg-warm-brown text-white py-6 px-10 text-[11px] font-black uppercase tracking-[0.2em] hover:bg-earth-green transition-all duration-500 shadow-2xl flex items-center justify-center space-x-4"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>Reserve to Selection</span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default QuickView;