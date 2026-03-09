import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CreditCard, Truck, ShieldCheck, ArrowLeft, CheckCircle2, Loader2 } from 'lucide-react';
import axios from 'axios';
import Layout from '../components/Layout';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Checkout = () => {
  const navigate = useNavigate();
  const { items, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  
  const [loading, setLoading] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [formData, setFormData] = useState({
    address: '',
    city: '',
    postalCode: '',
    country: 'India',
    paymentMethod: 'PayPal'
  });

  const subtotal = totalPrice;
  const tax = subtotal * 0.18;
  const total = subtotal + tax;

  if (items.length === 0 && !orderComplete) {
    navigate('/cart');
    return null;
  }

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      navigate('/login?redirect=checkout');
      return;
    }

    setLoading(true);
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
      };

      const orderData = {
        orderItems: items.map(item => ({
          name: item.name,
          qty: item.quantity,
          image: item.image,
          price: item.price,
          product: item._id || item.id,
        })),
        shippingAddress: {
          address: formData.address,
          city: formData.city,
          postalCode: formData.postalCode,
          country: formData.country,
        },
        paymentMethod: formData.paymentMethod,
        itemsPrice: subtotal,
        taxPrice: tax,
        shippingPrice: 0,
        totalPrice: total,
      };

      const { data } = await axios.post('https://swarnaratna.onrender.com/api/orders', orderData, config);
      
      setOrderId(data._id);
      setOrderComplete(true);
      clearCart();
    } catch (error) {
      console.error('Order creation failed:', error);
      alert(error.response?.data?.message || 'Order placement failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (orderComplete) {
    return (
      <Layout>
        <div className="max-w-3xl mx-auto px-4 py-32 text-center">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="mb-12 flex justify-center"
          >
            <div className="p-8 bg-emerald-50 rounded-full">
              <CheckCircle2 className="w-24 h-24 text-emerald-900" />
            </div>
          </motion.div>
          
          <h1 className="text-5xl font-black text-stone-900 uppercase tracking-tighter mb-6">Reservation Successful</h1>
          <p className="text-stone-400 font-light italic text-lg mb-4">
            Your selection of premium dry fruits is being prepared for transit.
          </p>
          <p className="text-emerald-900 font-black uppercase tracking-[0.2em] text-xs mb-12">
            Order Identity: {orderId}
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link
              to="/products"
              className="px-12 py-5 bg-emerald-900 text-white font-black uppercase tracking-[0.2em] text-[11px] hover:bg-emerald-950 transition-all shadow-xl"
            >
              Continue Acquisition
            </Link>
            <Link
              to="/"
              className="px-12 py-5 border border-stone-200 text-stone-900 font-black uppercase tracking-[0.2em] text-[11px] hover:bg-stone-50 transition-all"
            >
              Return Home
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="bg-stone-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center mb-12">
            <Link to="/cart" className="flex items-center text-stone-400 hover:text-emerald-900 font-black uppercase tracking-[0.2em] text-[10px] transition-colors">
              <ArrowLeft className="w-4 h-4 mr-3" />
              Return to Vessel
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* Checkout Form */}
            <div className="lg:col-span-7">
              <form onSubmit={handleSubmit} className="space-y-12">
                <section>
                  <h2 className="text-[11px] font-black text-emerald-900 uppercase tracking-[0.4em] mb-10 flex items-center">
                    <Truck className="w-5 h-5 mr-4" />
                    I. Logistics Destination
                  </h2>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-stone-400 mb-3">Street Address</label>
                      <input
                        required
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className="w-full bg-white border border-stone-200 px-6 py-4 focus:outline-none focus:border-emerald-900 transition-colors font-light italic"
                        placeholder="e.g. 123 Emerald Street"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="block text-[10px] font-black uppercase tracking-widest text-stone-400 mb-3">City / Estate</label>
                        <input
                          required
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          className="w-full bg-white border border-stone-200 px-6 py-4 focus:outline-none focus:border-emerald-900 transition-colors font-light italic"
                          placeholder="Mumbai"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-black uppercase tracking-widest text-stone-400 mb-3">Postal Code</label>
                        <input
                          required
                          type="text"
                          name="postalCode"
                          value={formData.postalCode}
                          onChange={handleInputChange}
                          className="w-full bg-white border border-stone-200 px-6 py-4 focus:outline-none focus:border-emerald-900 transition-colors font-light italic"
                          placeholder="400001"
                        />
                      </div>
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="text-[11px] font-black text-emerald-900 uppercase tracking-[0.4em] mb-10 flex items-center">
                    <CreditCard className="w-5 h-5 mr-4" />
                    II. Monetary Settlement
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {['PayPal', 'Stripe', 'Credit Card'].map((method) => (
                      <label 
                        key={method}
                        className={`flex items-center justify-between p-6 border transition-all cursor-pointer ${
                          formData.paymentMethod === method 
                          ? 'border-emerald-900 bg-emerald-50/30' 
                          : 'border-stone-200 bg-white hover:border-stone-300'
                        }`}
                      >
                        <span className="text-[11px] font-black uppercase tracking-widest text-stone-900">{method}</span>
                        <input
                          type="radio"
                          name="paymentMethod"
                          value={method}
                          checked={formData.paymentMethod === method}
                          onChange={handleInputChange}
                          className="accent-emerald-900"
                        />
                      </label>
                    ))}
                  </div>
                </section>

                <div className="pt-10">
                  {!user ? (
                    <div className="p-8 bg-amber-50 border border-amber-100 text-amber-900 text-center">
                      <p className="text-xs font-black uppercase tracking-widest mb-6">Identity Verification Required</p>
                      <Link 
                        to="/login?redirect=checkout" 
                        className="inline-block px-12 py-4 bg-amber-900 text-white text-[10px] font-black uppercase tracking-[0.2em]"
                      >
                        Authenticate to Proceed
                      </Link>
                    </div>
                  ) : (
                    <button
                      disabled={loading}
                      type="submit"
                      className="w-full bg-emerald-900 text-white py-6 px-4 text-[11px] font-black uppercase tracking-[0.2em] hover:bg-emerald-950 transition-all duration-500 shadow-2xl flex justify-center items-center"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-3 animate-spin" />
                          Processing Settlement...
                        </>
                      ) : (
                        `Authorize Payment - ₹${total.toFixed(2)}`
                      )}
                    </button>
                  )}
                  <div className="flex items-center justify-center mt-6 text-stone-400 space-x-2">
                    <ShieldCheck className="w-4 h-4" />
                    <span className="text-[9px] font-black uppercase tracking-[0.2em]">Encrypted Secure Transaction</span>
                  </div>
                </div>
              </form>
            </div>

            {/* Side Summary */}
            <div className="lg:col-span-5">
              <div className="bg-white p-10 border border-stone-100 sticky top-32 shadow-sm">
                <h3 className="text-[11px] font-black text-stone-900 uppercase tracking-[0.3em] mb-10 pb-4 border-b border-stone-100">Selection Manifest</h3>
                
                <div className="space-y-8 mb-12 max-h-96 overflow-y-auto pr-4 scrollbar-thin">
                  {items.map((item) => (
                    <div key={item._id || item.id} className="flex items-center space-x-6">
                      <div className="w-16 h-20 bg-stone-50 overflow-hidden flex-shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-[11px] font-black text-stone-900 uppercase tracking-tight truncate">{item.name}</h4>
                        <p className="text-[10px] text-stone-400 font-bold uppercase tracking-widest mt-1">{item.quantity} × ₹{item.price}</p>
                      </div>
                      <div className="text-[11px] font-black text-stone-900">
                        ₹{(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-4 pt-8 border-t border-stone-100">
                  <div className="flex justify-between text-[11px] font-bold uppercase tracking-widest">
                    <span className="text-stone-400">Subtotal</span>
                    <span className="text-stone-900">₹{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-[11px] font-bold uppercase tracking-widest">
                    <span className="text-stone-400">Logistics</span>
                    <span className="text-emerald-700">Complimentary</span>
                  </div>
                  <div className="flex justify-between text-[11px] font-bold uppercase tracking-widest">
                    <span className="text-stone-400">Service Tax</span>
                    <span className="text-stone-900">₹{tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-end pt-8 mt-4 border-t border-stone-100">
                    <span className="text-[10px] font-black text-stone-900 uppercase tracking-[0.2em]">Total Investment</span>
                    <span className="text-3xl font-black text-emerald-900 tracking-tighter italic">₹{total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Checkout;