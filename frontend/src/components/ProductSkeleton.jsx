import React from 'react';
import { motion } from 'framer-motion';

const ProductSkeleton = () => {
  return (
    <div className="bg-white group overflow-hidden flex flex-col relative animate-pulse">
      <div className="relative block overflow-hidden aspect-[3/4] bg-stone-100">
        <motion.div
          animate={{
            x: ['-100%', '100%'],
          }}
          transition={{
            repeat: Infinity,
            duration: 1.5,
            ease: "linear",
          }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent"
        />
      </div>

      <div className="py-8 px-4 flex flex-col items-center text-center space-y-4">
        <div className="h-3 w-3/4 bg-stone-100 rounded" />
        <div className="h-3 w-1/2 bg-stone-50 rounded" />
        <div className="flex space-x-1">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="w-1 h-1 rounded-full bg-stone-100" />
          ))}
        </div>
        <div className="h-6 w-1/4 bg-stone-100 rounded" />
      </div>
    </div>
  );
};

export default ProductSkeleton;