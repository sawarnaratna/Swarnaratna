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

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white overflow-x-hidden selection:bg-emerald-900 selection:text-[#d4af37] font-sans">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-[#d4af37] origin-left z-[100]"
        style={{ scaleX }}
      />

      {/* Luxury Custom Cursor (Desktop Only) */}
      <motion.div
        className="hidden lg:block fixed top-0 left-0 w-8 h-8 border border-[#d4af37] rounded-full pointer-events-none z-[9999] mix-blend-difference"
        animate={{ x: mousePos.x - 16, y: mousePos.y - 16 }}
        transition={{ type: 'spring', damping: 25, stiffness: 250, mass: 0.5 }}
      />

      <Header />
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={window.location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
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
