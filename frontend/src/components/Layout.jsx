import React, { useEffect, useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';

const Layout = ({ children }) => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    
    const handleMouseOver = (e) => {
      if (e.target.closest('a, button, [role="button"]')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white overflow-x-hidden selection:bg-emerald-900 selection:text-[#d4af37] font-sans">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-[#d4af37] origin-left z-[200]"
        style={{ scaleX }}
      />

      {/* Gold Halo Custom Cursor */}
      <motion.div
        className="hidden lg:block fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[9999] border border-[#d4af37]/50"
        animate={{ 
          x: mousePos.x - 16, 
          y: mousePos.y - 16,
          scale: isHovering ? 2.5 : 1,
          backgroundColor: isHovering ? "rgba(212, 175, 55, 0.1)" : "rgba(212, 175, 55, 0)",
          borderWidth: isHovering ? "1px" : "1.5px"
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 200, mass: 0.5 }}
      >
        <div className="absolute inset-0 rounded-full border border-[#d4af37]/20 animate-pulse scale-150" />
      </motion.div>

      <Header />
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={window.location.pathname}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
