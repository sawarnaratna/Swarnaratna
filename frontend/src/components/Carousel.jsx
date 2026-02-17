import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Carousel = ({ children }) => {
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const scrollContainerRef = useRef(null);

  const checkArrows = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkArrows();
    window.addEventListener('resize', checkArrows);
    return () => window.removeEventListener('resize', checkArrows);
  }, []);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const { clientWidth } = scrollContainerRef.current;
      const scrollAmount = direction === 'left' ? -clientWidth : clientWidth;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      setTimeout(checkArrows, 500);
    }
  };

  return (
    <div className="relative">
      {showLeftArrow && (
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 -ml-2 lg:-ml-6 z-20 bg-emerald-950 border border-emerald-900/30 text-[#d4af37] p-3 lg:p-4 hover:bg-emerald-900 hover:text-white transition-all duration-500 shadow-2xl group/btn"
          aria-label="Previous"
        >
          <ChevronLeft className="w-4 h-4 lg:w-5 lg:h-5 transition-transform group-hover/btn:-translate-x-1" />
        </button>
      )}
      
      <div
        ref={scrollContainerRef}
        onScroll={checkArrows}
        className="flex overflow-x-auto gap-4 lg:gap-8 scrollbar-hide snap-x snap-mandatory pb-8 pt-4 px-1"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {React.Children.map(children, (child) => (
          <div className="flex-none w-[75%] sm:w-[45%] lg:w-[calc(25%-1.5rem)] snap-start transition-all duration-500 hover:z-10">
            {child}
          </div>
        ))}
      </div>

      {showRightArrow && (
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 -mr-2 lg:-mr-6 z-20 bg-emerald-950 border border-emerald-900/30 text-[#d4af37] p-3 lg:p-4 hover:bg-emerald-900 hover:text-white transition-all duration-500 shadow-2xl group/btn"
          aria-label="Next"
        >
          <ChevronRight className="w-4 h-4 lg:w-5 lg:h-5 transition-transform group-hover/btn:translate-x-1" />
        </button>
      )}

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default Carousel;
