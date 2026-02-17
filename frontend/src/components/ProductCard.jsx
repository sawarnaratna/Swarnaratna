import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingCart, Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import QuickView from './QuickView';

const ProductCard = ({ product }) => {
  const { addToCart, setIsCartOpen } = useCart();
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    setIsCartOpen(true);
  };

  return (
    <>
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        id={`product-${product._id || product.id}`}
        className="bg-white group overflow-hidden flex flex-col relative"
      >
        <Link to={`/product/${product._id || product.id}`} className="relative block overflow-hidden aspect-[3/4]">
          <motion.img
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.9, ease: [0.33, 1, 0.68, 1] }}
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          
          {/* Quick View Trigger - NEW */}
          <div className="absolute inset-0 bg-warm-brown/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center p-6 space-x-4">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsQuickViewOpen(true);
              }}
              className="bg-white text-warm-brown p-4 rounded-full shadow-2xl hover:bg-harvest-gold hover:text-white transition-colors"
              title="Quick View"
            >
              <Eye className="w-5 h-5" />
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={handleAddToCart}
              className="bg-harvest-gold text-white p-4 rounded-full shadow-2xl hover:bg-white hover:text-warm-brown transition-colors"
              title="Add to Selection"
            >
              <ShoppingCart className="w-5 h-5" />
            </motion.button>
          </div>

          {product.originalPrice > product.price && (
            <div className="absolute top-4 left-4 bg-warm-brown text-harvest-gold px-3 py-1 text-[9px] font-black uppercase tracking-tighter border border-harvest-gold/30">
              -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
            </div>
          )}
        </Link>

        <div className="py-8 px-4 flex flex-col items-center text-center">
          <h3 className="text-[11px] font-black text-warm-brown uppercase tracking-[0.2em] mb-3 leading-relaxed h-10 line-clamp-2 italic">
            {product.name}
          </h3>

          <div className="flex items-center justify-center mb-4 space-x-1">
            {[...Array(5)].map((_, i) => (
              <div 
                key={i} 
                className={`w-1 h-1 rounded-full ${i < Math.floor(product.rating) ? 'bg-harvest-gold' : 'bg-stone-200'}`} 
              />
            ))}
          </div>

          <div className="flex items-baseline space-x-3">
            <span className="text-base font-black text-warm-brown tracking-tighter italic">
              ₹{product.price}
            </span>
            {product.originalPrice > product.price && (
              <span className="text-[11px] text-stone-300 line-through tracking-tighter font-light">
                ₹{product.originalPrice}
              </span>
            )}
          </div>
        </div>
      </motion.div>

      <QuickView 
        product={product} 
        isOpen={isQuickViewOpen} 
        onClose={() => setIsQuickViewOpen(false)} 
      />
    </>
  );
};

export default ProductCard;
