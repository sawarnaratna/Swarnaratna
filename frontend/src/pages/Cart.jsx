import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from 'lucide-react';
import Layout from '../components/Layout';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const navigate = useNavigate();
  const { items, totalItems, totalPrice, updateQuantity, removeFromCart, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
          <div className="text-stone-200 mb-10">
            <ShoppingBag className="w-20 h-20 mx-auto" />
          </div>
          <h1 className="text-4xl font-black text-stone-900 uppercase tracking-tighter mb-6">Your Vessel is Empty</h1>
          <p className="text-stone-400 font-light italic mb-12 max-w-md mx-auto">
            Our curated selection awaits your discovery. Begin your journey into the world of premium dry fruits.
          </p>
          <Link
            to="/products"
            className="inline-block px-12 py-5 border border-emerald-900 text-emerald-900 font-black uppercase tracking-[0.2em] text-[11px] hover:bg-emerald-900 hover:text-white transition-all duration-500"
          >
            Explore Collection
          </Link>
        </div>
      </Layout>
    );
  }

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <Layout>
      <div className="bg-white min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b border-stone-100 pb-10">
            <div>
              <h2 className="text-[10px] font-black text-emerald-900 uppercase tracking-[0.4em] mb-4">Your Selection</h2>
              <h1 className="text-5xl font-black text-stone-900 tracking-tighter">Shopping Cart</h1>
            </div>
            <div className="mt-6 md:mt-0 flex items-center space-x-8">
              <span className="text-stone-400 text-[10px] font-black uppercase tracking-widest">{totalItems} Pieces Reserved</span>
              <button
                onClick={clearCart}
                className="text-stone-300 hover:text-red-900 text-[10px] font-black uppercase tracking-widest flex items-center transition-colors"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Clear Selection
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-20">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-12">
              {items.map((item) => (
                <div key={item._id || item.id} className="group relative">
                  <div className="flex items-start space-x-8 pb-12 border-b border-stone-50">
                    {/* Product Image */}
                    <Link to={`/product/${item._id || item.id}`} className="block aspect-[3/4] w-32 overflow-hidden bg-stone-50">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </Link>

                    {/* Product Details */}
                    <div className="flex-1 flex flex-col justify-between h-full py-2">
                      <div>
                        <Link
                          to={`/product/${item._id || item.id}`}
                          className="text-lg font-black text-stone-900 uppercase tracking-tight hover:text-emerald-900 transition-colors"
                        >
                          {item.name}
                        </Link>
                        <p className="text-stone-400 text-[10px] font-bold uppercase tracking-[0.2em] mt-2 italic">{item.weight} Purity</p>
                      </div>

                      {/* Quantity Controls */}
                      <div className="mt-8 flex items-center space-x-6">
                        <div className="flex items-center border border-stone-100">
                          <button
                            onClick={() => updateQuantity(item._id || item.id, item.quantity - 1)}
                            className="p-3 hover:bg-stone-50 transition-colors disabled:opacity-20"
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="w-3 h-3 text-stone-900" />
                          </button>
                          <span className="w-8 text-center text-[11px] font-black">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item._id || item.id, item.quantity + 1)}
                            className="p-3 hover:bg-stone-50 transition-colors"
                          >
                            <Plus className="w-3 h-3 text-stone-900" />
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromCart(item._id || item.id)}
                          className="text-stone-300 hover:text-red-900 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Item Total */}
                    <div className="text-right py-2">
                      <p className="text-xl font-black text-emerald-900 tracking-tighter">
                        ₹{(item.price * item.quantity).toFixed(2)}
                      </p>
                      <p className="text-[10px] text-stone-400 font-bold uppercase tracking-widest mt-1">
                        ₹{item.price} Each
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              <div className="pt-8">
                <Link
                  to="/products"
                  className="group inline-flex items-center text-emerald-900 font-black text-[10px] uppercase tracking-[0.2em]"
                >
                  <ArrowLeft className="w-4 h-4 mr-3 transition-transform group-hover:-translate-x-2" />
                  Continue Exploration
                </Link>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-stone-50 p-10 sticky top-32 border border-stone-100">
                <h2 className="text-[11px] font-black text-stone-900 uppercase tracking-[0.3em] mb-10 pb-4 border-b border-stone-200">Summary of Acquisition</h2>

                <div className="space-y-6">
                  <div className="flex justify-between text-[11px] font-bold uppercase tracking-widest">
                    <span className="text-stone-400">Subtotal</span>
                    <span className="text-stone-900">₹{totalPrice.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between text-[11px] font-bold uppercase tracking-widest">
                    <span className="text-stone-400">Logistics</span>
                    <span className="text-emerald-700">Complimentary</span>
                  </div>

                  <div className="flex justify-between text-[11px] font-bold uppercase tracking-widest">
                    <span className="text-stone-400">Service Tax (18%)</span>
                    <span className="text-stone-900">₹{(totalPrice * 0.18).toFixed(2)}</span>
                  </div>

                  <div className="pt-10 mt-10 border-t border-stone-200 flex justify-between items-end">
                    <span className="text-[10px] font-black text-stone-900 uppercase tracking-[0.2em]">Investment</span>
                    <span className="text-4xl font-black text-emerald-900 tracking-tighter italic">₹{(totalPrice * 1.18).toFixed(2)}</span>
                  </div>
                </div>

                <button 
                  onClick={handleCheckout}
                  className="w-full bg-emerald-900 text-white py-6 px-4 text-[11px] font-black uppercase tracking-[0.2em] hover:bg-emerald-950 transition-all duration-500 mt-12 shadow-2xl"
                >
                  Proceed to Secure Checkout
                </button>

                <div className="mt-8 pt-8 border-t border-stone-100 space-y-4">
                  <p className="text-[9px] text-stone-400 text-center uppercase tracking-widest font-bold leading-loose">
                    Grown with Heart • Packaged with Care • Delivered with Integrity
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;