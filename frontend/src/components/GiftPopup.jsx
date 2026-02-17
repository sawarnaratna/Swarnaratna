import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Gift, Box } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getCurrentFestival } from '../utils/festivalUtils';

const GiftPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpened, setIsOpened] = useState(false);
  const [festival, setFestival] = useState(getCurrentFestival());
  const navigate = useNavigate();

  useEffect(() => {
    const hasSeenPopup = localStorage.getItem('hasSeenGiftPopup');
    if (!hasSeenPopup) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 2000); // Show after 2 seconds
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem('hasSeenGiftPopup', 'true');
  };

  const handleOpenGift = () => {
    setIsOpened(true);
  };

  const handleViewGifts = () => {
    handleClose();
    navigate('/gifts');
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 20 }}
          className="relative w-full max-w-md bg-white rounded-3xl overflow-hidden shadow-2xl border-4"
          style={{ borderColor: festival.primary }}
        >
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors z-10"
          >
            <X size={20} className="text-gray-600" />
          </button>

          <div className="p-8 flex flex-col items-center text-center">
            {!isOpened ? (
              <>
                <motion.div
                  animate={{ 
                    rotate: [0, -5, 5, -5, 5, 0],
                    y: [0, -10, 0]
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="mb-6 cursor-pointer"
                  onClick={handleOpenGift}
                >
                  <div 
                    className="w-32 h-32 relative flex items-center justify-center rounded-2xl shadow-lg"
                    style={{ backgroundColor: festival.primary }}
                  >
                    <Gift size={64} className="text-white" />
                    {/* Ribbon */}
                    <div className="absolute inset-y-0 w-4 bg-white/30" />
                    <div className="absolute inset-x-0 h-4 bg-white/30" />
                    <div className="absolute -top-4 text-4xl">{festival.giftIcon}</div>
                  </div>
                </motion.div>
                
                <h2 className="text-2xl font-serif font-bold mb-2" style={{ color: festival.primary }}>
                  You've got a surprise!
                </h2>
                <p className="text-gray-600 mb-6">
                  Click the gift box to reveal your special festival gift from Swarnaratna.
                </p>
                
                <button
                  onClick={handleOpenGift}
                  className="px-8 py-3 rounded-full text-white font-bold shadow-lg transform hover:scale-105 transition-transform"
                  style={{ backgroundColor: festival.primary }}
                >
                  Open Gift
                </button>
              </>
            ) : (
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex flex-col items-center"
              >
                <div className="text-6xl mb-4">🥜</div>
                <h2 className="text-3xl font-serif font-bold mb-4" style={{ color: festival.primary }}>
                  {festival.name !== "Default" ? festival.name : "Exclusive Gift!"}
                </h2>
                <p className="text-lg font-medium text-gray-800 mb-6 italic">
                  "{festival.message}"
                </p>
                
                <div className="w-full p-6 rounded-2xl bg-gray-50 border-2 border-dashed border-gray-300 mb-6 flex flex-col items-center">
                  <Box size={48} className="mb-2" style={{ color: festival.primary }} />
                  <p className="text-xl font-bold uppercase tracking-wide" style={{ color: festival.primary }}>
                    Premium Dry Fruits Box
                  </p>
                  <p className="text-sm text-gray-500 mt-2">Special festival assortment curated just for you.</p>
                </div>

                <button
                  onClick={handleViewGifts}
                  className="px-8 py-3 rounded-full text-white font-bold shadow-lg transform hover:scale-105 transition-transform"
                  style={{ backgroundColor: festival.primary }}
                >
                  Claim My Gift
                </button>
              </motion.div>
            )}
          </div>

          {/* Decorative background element */}
          <div 
            className="absolute -bottom-12 -left-12 w-32 h-32 rounded-full opacity-20"
            style={{ backgroundColor: festival.secondary }}
          />
          <div 
            className="absolute -top-12 -right-12 w-24 h-24 rounded-full opacity-20"
            style={{ backgroundColor: festival.secondary }}
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default GiftPopup;
