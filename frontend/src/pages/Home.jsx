import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Star, Shield, Truck, Award, ChevronRight, ArrowRight, ShoppingCart, CheckCircle, Package, Globe, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import axios from 'axios';
import Layout from '../components/Layout';
import ProductCard from '../components/ProductCard';
import Hero from '../components/Hero';
import Carousel from '../components/Carousel';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/products');
        setProducts(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load products');
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const bestSellers = products.slice(0, 8);
  
  const categories = [
    { name: 'Exotic Nuts', img: 'https://images.unsplash.com/photo-1596560548464-f010549b84d7?w=800', color: 'bg-emerald-50' },
    { name: 'Premium Dates', img: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800', color: 'bg-amber-50' },
    { name: 'Dry Berries', img: 'https://images.unsplash.com/photo-1564729694921-2e9a7b79c9a5?w=800', color: 'bg-stone-50' },
    { name: 'Luxury Gifts', img: 'https://images.unsplash.com/photo-1623428187969-5da2dcea5ebf?w=800', color: 'bg-emerald-50' },
  ];

  return (
    <Layout>
      <Hero />

      {/* Trust Badges - Refined & Minimal */}
      <div className="bg-stone-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            {[
              { icon: CheckCircle, text: "Certified Organic", sub: "100% Purity Guaranteed" },
              { icon: Package, text: "Sustainable Pack", sub: "Eco-friendly Materials" },
              { icon: Globe, text: "Directly Sourced", sub: "From Global Orchards" },
              { icon: Truck, text: "Express Shipping", sub: "Across All of India" }
            ].map((item, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col items-center text-center group"
              >
                <div className="mb-4 p-4 rounded-full bg-white shadow-sm border border-stone-100 group-hover:scale-110 transition-transform duration-500">
                  <item.icon className="w-6 h-6 text-emerald-900" />
                </div>
                <span className="font-black uppercase text-[10px] tracking-[0.3em] text-emerald-950 mb-1">{item.text}</span>
                <span className="text-[9px] text-stone-400 uppercase tracking-widest">{item.sub}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Shop By Category - Modern Squares */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center mb-24">
            <h2 className="text-[10px] font-black text-[#d4af37] uppercase tracking-[0.6em] mb-6">Curated Selections</h2>
            <h3 className="text-4xl md:text-6xl font-black text-stone-900 tracking-tighter uppercase italic">Our Collections</h3>
            <div className="w-24 h-[1px] bg-emerald-900 mt-8" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
            {categories.map((cat, i) => (
              <Link key={i} to={`/products?category=${cat.name.toLowerCase()}`} className="group relative aspect-[4/5] overflow-hidden bg-stone-100">
                <img 
                  src={cat.img} 
                  alt={cat.name} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/80 via-transparent to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 p-10 w-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <h4 className="text-white font-black uppercase tracking-[0.3em] text-sm mb-4">{cat.name}</h4>
                  <div className="w-0 h-[1px] bg-[#d4af37] transition-all duration-500 group-hover:w-full" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products - High Contrast */}
      <section className="py-32 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8 text-center md:text-left">
            <div>
              <h2 className="text-[10px] font-black text-[#d4af37] uppercase tracking-[0.6em] mb-6">Most Desired</h2>
              <h3 className="text-4xl md:text-5xl font-black text-stone-900 tracking-tighter uppercase italic">Bestsellers</h3>
            </div>
            <Link to="/products" className="group flex items-center justify-center font-black text-emerald-900 uppercase tracking-[0.3em] text-[10px] border-b-2 border-emerald-900/10 pb-2 hover:border-emerald-900 transition-all">
              View All Products
              <ArrowRight className="ml-3 w-4 h-4 transition-transform group-hover:translate-x-2" />
            </Link>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-24">
              <Loader2 className="w-12 h-12 text-emerald-900 animate-spin" />
            </div>
          ) : error ? (
            <div className="text-center py-24 bg-white border border-stone-100">
              <p className="text-stone-400 font-light italic">{error}</p>
            </div>
          ) : (
            <Carousel>
              {bestSellers.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </Carousel>
          )}
        </div>
      </section>

      {/* Luxury Promo Section - Enhanced */}
      <section className="py-32 bg-[#1a2e1a] text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-white/[0.02] -skew-x-12 transform translate-x-20" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-24">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="relative aspect-[4/5] lg:aspect-square group"
            >
              <img 
                src="https://images.unsplash.com/photo-1596560548464-f010549b84d7?w=1000" 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" 
                alt="Craftsmanship" 
              />
              <div className="absolute -inset-6 border border-[#d4af37]/20 -z-10 group-hover:-inset-2 transition-all duration-700" />
              <div className="absolute top-10 -right-10 bg-[#d4af37] text-emerald-950 p-6 hidden md:block">
                <p className="text-[10px] font-black uppercase tracking-[0.3em]">Est. 1995</p>
              </div>
            </motion.div>
            
            <div className="space-y-10">
              <div className="space-y-4">
                <p className="text-[#d4af37] text-[10px] font-black tracking-[0.6em] uppercase">The Swarnaratna Standard</p>
                <h2 className="text-5xl md:text-7xl font-black leading-tight tracking-tighter uppercase italic">Elegance in <br /> Every Kernel.</h2>
              </div>
              <p className="text-stone-300 text-lg md:text-xl font-light leading-relaxed italic border-l-2 border-[#d4af37]/30 pl-8">
                "Our legacy is built on the pursuit of perfection. From the sun-drenched hills of California to the ancient groves of the Middle East, we bring you dry fruits that are as beautiful as they are nutritious."
              </p>
              <div className="pt-8">
                <Link 
                  to="/about" 
                  className="inline-block px-16 py-6 border border-[#d4af37] text-[#d4af37] font-black uppercase tracking-[0.3em] text-[11px] hover:bg-[#d4af37] hover:text-emerald-950 transition-all duration-500 shadow-xl"
                >
                  Our Heritage
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {[
              { title: "Pure Heritage", desc: "Generations of expertise in selecting only the most premium grades." },
              { title: "Global Reach", desc: "Sourcing from 20+ countries to ensure variety and authenticity." },
              { title: "Freshly Crafted", desc: "Small-batch processing to maintain the natural oils and flavors." }
            ].map((item, i) => (
              <div key={i} className="space-y-4">
                <div className="w-12 h-[1px] bg-emerald-900" />
                <h4 className="font-black uppercase tracking-[0.2em] text-emerald-950">{item.title}</h4>
                <p className="text-stone-500 font-light leading-relaxed text-sm italic">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Home;
