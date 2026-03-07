import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Package, User as UserIcon, Calendar, Clock, ChevronRight, Loader2, ShoppingBag } from 'lucide-react';
import axios from 'axios';
import Layout from '../components/Layout';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchMyOrders = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/orders/myorders`, config);
        setOrders(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch orders');
        setLoading(false);
      }
    };

    fetchMyOrders();
  }, [user, navigate]);

  if (!user) return null;

  return (
    <Layout>
      <div className="bg-white min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-8">
            <div>
              <h2 className="text-[10px] font-black text-emerald-900 uppercase tracking-[0.4em] mb-4">Account Profile</h2>
              <h1 className="text-5xl font-black text-stone-900 tracking-tighter uppercase italic">Welcome, {user.name}</h1>
            </div>
            <button 
              onClick={logout}
              className="px-10 py-4 border border-stone-200 text-stone-400 hover:text-red-600 hover:border-red-100 text-[10px] font-black uppercase tracking-widest transition-all"
            >
              Sign Out of Treasury
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* User Info Card */}
            <div className="lg:col-span-4">
              <div className="bg-stone-50 p-10 border border-stone-100 sticky top-32">
                <div className="flex items-center space-x-6 mb-10">
                  <div className="w-16 h-16 bg-emerald-900 rounded-full flex items-center justify-center text-white text-2xl font-black">
                    {user.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-stone-900 uppercase tracking-tight">{user.name}</h3>
                    <p className="text-[11px] text-stone-400 font-bold tracking-widest uppercase">{user.email}</p>
                  </div>
                </div>
                
                <div className="space-y-6 pt-10 border-t border-stone-200">
                  <div className="flex items-center text-stone-500">
                    <Calendar className="w-4 h-4 mr-4 text-emerald-900" />
                    <span className="text-[11px] font-black uppercase tracking-widest">Member Since: Feb 2024</span>
                  </div>
                  <div className="flex items-center text-stone-500">
                    <Package className="w-4 h-4 mr-4 text-emerald-900" />
                    <span className="text-[11px] font-black uppercase tracking-widest">{orders.length} Acquisitions Made</span>
                  </div>
                </div>

                <div className="mt-12 p-6 bg-white border border-stone-100">
                  <p className="text-[9px] text-stone-400 font-bold uppercase tracking-[0.2em] leading-relaxed italic">
                    "A legacy of taste, preserved for the discerning palate."
                  </p>
                </div>
              </div>
            </div>

            {/* Orders Section */}
            <div className="lg:col-span-8">
              <h3 className="text-[11px] font-black text-stone-900 uppercase tracking-[0.3em] mb-10 pb-4 border-b border-stone-100">Order History</h3>

              {loading ? (
                <div className="flex justify-center py-24">
                  <Loader2 className="w-10 h-10 text-emerald-900 animate-spin" />
                </div>
              ) : error ? (
                <div className="text-center py-20 bg-stone-50 border border-stone-100">
                  <p className="text-stone-400 italic">{error}</p>
                </div>
              ) : orders.length === 0 ? (
                <div className="text-center py-24 bg-stone-50 border border-stone-100">
                  <ShoppingBag className="w-12 h-12 text-stone-200 mx-auto mb-6" />
                  <p className="text-stone-400 font-light italic mb-8">No treasures have been claimed yet.</p>
                  <Link to="/products" className="text-[11px] font-black text-emerald-900 uppercase tracking-widest border-b border-emerald-900 pb-1">Start Your Collection</Link>
                </div>
              ) : (
                <div className="space-y-8">
                  {orders.map((order) => (
                    <motion.div 
                      key={order._id}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      className="bg-white border border-stone-100 hover:shadow-xl transition-all duration-500 group overflow-hidden"
                    >
                      <div className="p-8">
                        <div className="flex flex-col md:flex-row justify-between gap-6 mb-8 pb-8 border-b border-stone-50">
                          <div className="space-y-2">
                            <p className="text-[10px] font-black text-emerald-900 uppercase tracking-[0.2em]">Order Identity</p>
                            <h4 className="text-sm font-black text-stone-900 tracking-tight">{order._id}</h4>
                          </div>
                          <div className="flex gap-10">
                            <div className="space-y-2">
                              <p className="text-[10px] font-black text-stone-400 uppercase tracking-[0.2em]">Date</p>
                              <p className="text-xs font-bold text-stone-900">{new Date(order.createdAt).toLocaleDateString()}</p>
                            </div>
                            <div className="space-y-2">
                              <p className="text-[10px] font-black text-stone-400 uppercase tracking-[0.2em]">Total</p>
                              <p className="text-xs font-black text-emerald-900 tracking-tight">₹{order.totalPrice.toFixed(2)}</p>
                            </div>
                            <div className="space-y-2">
                              <p className="text-[10px] font-black text-stone-400 uppercase tracking-[0.2em]">Status</p>
                              <span className={`inline-block px-3 py-1 text-[9px] font-black uppercase tracking-widest ${
                                order.isPaid ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                              }`}>
                                {order.isPaid ? 'Processed' : 'Awaiting Payment'}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                          <div className="flex -space-x-4">
                            {order.orderItems.map((item, i) => (
                              <div key={i} className="w-14 h-14 rounded-full border-4 border-white overflow-hidden bg-stone-100 shadow-sm relative group-hover:scale-105 transition-transform duration-500" style={{ zIndex: 10 - i }}>
                                <img src={item.image} alt="" className="w-full h-full object-cover" />
                              </div>
                            ))}
                            {order.orderItems.length > 3 && (
                              <div className="w-14 h-14 rounded-full border-4 border-white bg-emerald-900 flex items-center justify-center text-white text-[10px] font-black relative z-0">
                                +{order.orderItems.length - 3}
                              </div>
                            )}
                          </div>
                          <div className="flex justify-end">
                            <button className="flex items-center text-[10px] font-black text-emerald-900 uppercase tracking-widest group-hover:translate-x-2 transition-transform duration-500">
                              View Details
                              <ChevronRight className="w-4 h-4 ml-2" />
                            </button>
                          </div>
                        </div>
                      </div>
                      
                      {/* Delivery Progress Bar - Stylistic */}
                      <div className="h-1 w-full bg-stone-50">
                        <div className="h-full bg-emerald-900/10 w-full relative">
                          <div className={`h-full bg-emerald-900 transition-all duration-1000 ${order.isDelivered ? 'w-full' : 'w-1/3'}`} />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;