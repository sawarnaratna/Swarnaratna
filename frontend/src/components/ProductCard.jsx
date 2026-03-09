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
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        viewport={{ once: true }}
        id={`product-${product._id || product.id}`}
        className="bg-white group overflow-hidden flex flex-col relative rounded-2xl border border-stone-100 shadow-sm hover:shadow-xl transition-all duration-500"
      >
        <Link to={`/product/${product._id || product.id}`} className="relative block overflow-hidden aspect-[4/5]">
          <motion.img
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
            loading="lazy"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[#112114]/50 via-[#112114]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center p-6 space-x-4">
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
            <div className="absolute top-4 left-4 bg-[#112114] text-[#d4af37] px-3 py-1 text-[9px] font-black uppercase tracking-tighter border border-[#d4af37]/30 rounded-full">
              -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
            </div>
          )}
        </Link>

        <div className="py-6 px-4 flex flex-col items-center text-center">
          <h3 className="text-[11px] font-black text-warm-brown uppercase tracking-[0.18em] mb-3 leading-relaxed h-10 line-clamp-2">
            {product.name}
          </h3>

          <div className="flex items-center justify-center mb-4 space-x-1.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3 h-3 ${i < Math.floor(product.rating) ? 'text-[#d4af37] fill-[#d4af37]' : 'text-stone-200'}`}
              />
            ))}
          </div>

          <div className="flex items-baseline space-x-3">
            <span className="text-lg font-black text-[#112114] tracking-tight">Rs. {product.price}</span>
            {product.originalPrice > product.price && (
              <span className="text-[12px] text-stone-400 line-through tracking-tight font-medium">Rs. {product.originalPrice}</span>
            )}
          </div>
        </div>
      </motion.div>

      <QuickView product={product} isOpen={isQuickViewOpen} onClose={() => setIsQuickViewOpen(false)} />
    </>
  );
};

export default ProductCard;
