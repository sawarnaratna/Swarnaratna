import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const CartDrawer = () => {
  const { items, totalItems, totalPrice, updateQuantity, removeFromCart, isCartOpen, setIsCartOpen } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    setIsCartOpen(false);
    navigate('/checkout');
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white z-[201] shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="p-8 border-b border-stone-100 flex justify-between items-center bg-stone-50">
              <div>
                <h2 className="text-[11px] font-black text-emerald-950 uppercase tracking-[0.4em] mb-1">Your Selection</h2>
                <p className="text-[10px] text-stone-400 font-bold uppercase tracking-widest">{totalItems} Pieces Reserved</p>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-3 text-stone-400 hover:text-emerald-950 hover:rotate-90 transition-all duration-500"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Items List */}
            <div className="flex-1 overflow-y-auto p-8 space-y-8 scrollbar-thin">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
                  <div className="p-6 bg-stone-50 rounded-full">
                    <ShoppingBag className="w-12 h-12 text-stone-200" />
                  </div>
                  <p className="text-stone-400 font-light italic text-sm">Your vessel is empty of treasures.</p>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="text-[10px] font-black text-emerald-900 uppercase tracking-[0.2em] border-b border-emerald-900/20 pb-1"
                  >
                    Continue Exploration
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item._id || item.id} className="flex space-x-6 group">
                    <div className="w-20 h-24 bg-stone-50 overflow-hidden flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-[11px] font-black text-stone-900 uppercase tracking-tight truncate mb-1">{item.name}</h4>
                      <p className="text-[10px] text-stone-400 font-bold uppercase tracking-widest mb-4">{item.weight}</p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center border border-stone-100 bg-white">
                          <button
                            onClick={() => updateQuantity(item._id || item.id, item.quantity - 1)}
                            className="p-1.5 hover:bg-stone-50 transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-8 text-center text-[10px] font-black">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item._id || item.id, item.quantity + 1)}
                            className="p-1.5 hover:bg-stone-50 transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromCart(item._id || item.id)}
                          className="text-stone-300 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-[11px] font-black text-emerald-900">₹{(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-8 bg-stone-50 border-t border-stone-100 space-y-6">
                <div className="space-y-3">
                  <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-stone-400">
                    <span>Subtotal</span>
                    <span className="text-stone-900 font-black">₹{totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-stone-400">
                    <span>Logistics</span>
                    <span className="text-emerald-700 font-black">Complimentary</span>
                  </div>
                  <div className="flex justify-between items-end pt-4 mt-4 border-t border-stone-200">
                    <span className="text-[10px] font-black text-stone-900 uppercase tracking-[0.2em]">Investment</span>
                    <span className="text-2xl font-black text-emerald-900 tracking-tighter italic">₹{totalPrice.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  className="w-full bg-emerald-950 text-white py-5 px-4 text-[11px] font-black uppercase tracking-[0.3em] hover:bg-emerald-900 transition-all duration-500 shadow-2xl flex items-center justify-center group"
                >
                  Secure Checkout
                  <ArrowRight className="ml-3 w-4 h-4 group-hover:translate-x-2 transition-transform" />
                </button>
                
                <p className="text-[8px] text-stone-400 text-center uppercase tracking-[0.3em]">
                  Encrypted SSL Secure Payment
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;