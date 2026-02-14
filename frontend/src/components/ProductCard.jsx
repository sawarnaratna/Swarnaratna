import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingCart, Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="bg-white group overflow-hidden flex flex-col"
    >
      <Link to={`/product/${product._id || product.id}`} className="relative block overflow-hidden aspect-[3/4]">
        <motion.img
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.9, ease: [0.33, 1, 0.68, 1] }}
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        
        {/* Minimalist Quick Add - Visible on hover for desktop, persistent for mobile touch */}
        <div className="absolute inset-0 bg-black/5 opacity-0 lg:group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center p-4 sm:p-6">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleAddToCart}
            className="w-full bg-emerald-950 text-[#d4af37] py-4 text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] transform translate-y-4 lg:group-hover:translate-y-0 transition-transform duration-500 shadow-2xl border border-[#d4af37]/20"
          >
            Add to Selection
          </motion.button>
        </div>

        {/* Mobile-only visible Add to Cart icon */}
        <button 
          onClick={handleAddToCart}
          className="lg:hidden absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg border border-stone-100 text-emerald-950 active:scale-90 transition-transform"
        >
          <ShoppingCart className="w-4 h-4" />
        </button>

        {product.originalPrice > product.price && (
          <div className="absolute top-4 left-4 bg-emerald-900 text-white px-3 py-1 text-[9px] font-black uppercase tracking-tighter">
            -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
          </div>
        )}
      </Link>

      <div className="py-6 px-2 flex flex-col items-center text-center">
        <h3 className="text-[11px] font-black text-stone-900 uppercase tracking-[0.15em] mb-2 leading-relaxed h-8 line-clamp-2">
          {product.name}
        </h3>

        <div className="flex items-center justify-center mb-3 space-x-1">
          {[...Array(5)].map((_, i) => (
            <div 
              key={i} 
              className={`w-1 h-1 rounded-full ${i < Math.floor(product.rating) ? 'bg-[#d4af37]' : 'bg-stone-200'}`} 
            />
          ))}
        </div>

        <div className="flex items-baseline space-x-2">
          <span className="text-sm font-black text-emerald-900 tracking-tight">
            ₹{product.price}
          </span>
          {product.originalPrice > product.price && (
            <span className="text-[10px] text-stone-400 line-through tracking-tight">
              ₹{product.originalPrice}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
