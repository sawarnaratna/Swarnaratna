import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Star, Shield, Truck, Award, ChevronRight, ArrowRight, 
  ShoppingCart, CheckCircle, Package, Globe, Loader2, 
  Quote, Heart, Sparkles, Gem, Leaf, Instagram 
} from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import axios from 'axios';
import Layout from '../components/Layout';
import ProductCard from '../components/ProductCard';
import ProductSkeleton from '../components/ProductSkeleton';
import Hero from '../components/Hero';
import Carousel from '../components/Carousel';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 100]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/products`);
        setProducts(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load products');
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const bestSellers = Array.isArray(products) ? products.slice(0, 8) : [];
  
  const categories = [
    { name: 'Exotic Nuts', img: '/almond.webp', color: 'bg-emerald-50' },
    { name: 'Premium Dates', img: '/dates.webp', color: 'bg-amber-50' },
    { name: 'Dry Berries', img: '/Cranberries.webp', color: 'bg-stone-50' },
    { name: 'Luxury Gifts', img: '/dryfruits-dry-fruits-01.webp', color: 'bg-emerald-50' },
  ];

  const processSteps = [
    { icon: Globe, title: "Global Sourcing", desc: "Hand-picked from the most fertile lands on Earth." },
    { icon: Gem, title: "Artisanal Sorting", desc: "Each kernel undergoes meticulous quality inspection." },
    { icon: Sparkles, title: "Goverment Curing", desc: "Traditional methods to lock in natural oils and flavor." },
    { icon: Award, title: "Elegant Packaging", desc: "Sealed in oxygen-free environments for lasting freshness." }
  ];

  return (
    <Layout>
      <Hero />

      {/* Trust Badges - Refined & Minimal */}
      <div className="bg-stone-50 py-20 relative overflow-hidden">
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
                <div className="mb-6 p-5 rounded-full bg-white shadow-xl border border-stone-100 group-hover:bg-[#1a2e1a] group-hover:text-[#d4af37] transition-all duration-500">
                  <item.icon className="w-6 h-6" />
                </div>
                <span className="font-black uppercase text-[11px] tracking-[0.3em] text-emerald-950 mb-1">{item.text}</span>
                <span className="text-[10px] text-stone-400 uppercase tracking-widest font-medium">{item.sub}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* The Process Section - NEW */}
      <section className="py-32 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-24">
            <motion.p 
              initial={{ opacity: 0, letterSpacing: '0.2em' }}
              whileInView={{ opacity: 1, letterSpacing: '0.6em' }}
              className="text-[#d4af37] text-[10px] font-black uppercase mb-6"
            >
              The Swarnaratna Legacy
            </motion.p>
            <h2 className="text-4xl md:text-6xl font-black text-stone-900 tracking-tighter uppercase italic">From Soil to Soul</h2>
            <div className="w-24 h-[1px] bg-emerald-900 mx-auto mt-10" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 relative">
            <div className="hidden lg:block absolute top-1/4 left-0 w-full h-[1px] bg-stone-100 -z-10" />
            {processSteps.map((step, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
                className="flex flex-col items-center text-center"
              >
                <div className="w-20 h-20 bg-white border border-stone-100 rounded-full flex items-center justify-center mb-8 shadow-sm group hover:border-[#d4af37] transition-colors duration-500 relative">
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-[#1a2e1a] text-[#d4af37] rounded-full flex items-center justify-center text-xs font-black">
                    0{i + 1}
                  </div>
                  <step.icon className="w-8 h-8 text-emerald-950 group-hover:scale-110 transition-transform duration-500" />
                </div>
                <h4 className="font-black uppercase tracking-[0.2em] text-emerald-950 text-xs mb-4">{step.title}</h4>
                <p className="text-stone-400 font-light text-[13px] leading-relaxed italic">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Shop By Category - Modern Squares */}
      <section className="py-32 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center mb-24">
            <h2 className="text-[10px] font-black text-[#d4af37] uppercase tracking-[0.6em] mb-6">Curated Selections</h2>
            <h3 className="text-4xl md:text-6xl font-black text-stone-900 tracking-tighter uppercase italic">Our Collections</h3>
            <div className="w-24 h-[1px] bg-emerald-900 mt-8" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
            {categories.map((cat, i) => (
              <Link key={i} to={`/products?category=${cat.name.toLowerCase()}`} className="group relative aspect-[4/5] overflow-hidden bg-white shadow-2xl">
                <img 
                  src={cat.img} 
                  alt={cat.name} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/90 via-emerald-950/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 p-10 w-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <h4 className="text-[#d4af37] font-black uppercase tracking-[0.4em] text-[10px] mb-2">Category</h4>
                  <h5 className="text-white text-2xl font-black uppercase tracking-tight mb-6">{cat.name}</h5>
                  <div className="w-0 h-[1px] bg-[#d4af37] transition-all duration-500 group-hover:w-full" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Gift Hampers Section - NEW */}
      <section className="py-32 bg-white texture-marble">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-24">
            <h2 className="text-[10px] font-black text-harvest-gold uppercase tracking-[0.6em] mb-6">Imperial Gifting</h2>
            <h3 className="text-4xl md:text-6xl font-black text-warm-brown tracking-tighter uppercase italic">Curated Hampers</h3>
            <div className="w-24 h-[1px] bg-warm-brown mx-auto mt-10" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { name: "The Royal Treasury", price: "₹2,499", img: "/figs.webp" },
              { name: "Majestic Harvest", price: "₹4,999", img: "/walnut.webp" },
              { name: "Imperial Gold", price: "₹8,999", img: "/Pistachio.webp" }
            ].map((hamper, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="relative aspect-[4/5] overflow-hidden mb-8 shadow-xl">
                  <img src={hamper.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt={hamper.name} />
                  <div className="absolute inset-0 bg-warm-brown/20 group-hover:bg-transparent transition-all" />
                  <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-warm-brown/80 to-transparent">
                    <span className="text-white font-black uppercase tracking-widest text-[10px]">Premium Hamper</span>
                  </div>
                </div>
                <h4 className="font-black text-warm-brown uppercase tracking-[0.2em] text-sm mb-2">{hamper.name}</h4>
                <p className="text-harvest-gold font-serif italic text-xl">{hamper.price}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products - High Contrast */}
      <section className="py-32 bg-white">
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[...Array(4)].map((_, i) => (
                <ProductSkeleton key={i} />
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-24 bg-stone-50 border border-stone-100">
              <p className="text-stone-400 font-light italic">{error}</p>
            </div>
          ) : (
            <Carousel>
              {bestSellers?.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </Carousel>
          )}
        </div>
      </section>

      {/* Testimonials - NEW */}
      <section className="py-32 bg-stone-50 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-24 items-center">
            <div className="lg:col-span-1 space-y-8">
              <h2 className="text-[10px] font-black text-emerald-900 uppercase tracking-[0.6em]">Whispers of Quality</h2>
              <h3 className="text-5xl font-black text-stone-900 tracking-tighter uppercase italic leading-none">Patron <br /> Stories</h3>
              <p className="text-stone-400 font-light italic leading-relaxed text-sm">
                Join thousands of discerning individuals who have made Swarnaratna their trusted purveyor of natural luxury.
              </p>
              <div className="flex space-x-4">
                <div className="w-12 h-[1px] bg-emerald-900 self-center" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-900">Over 10,000+ Hearts Won</span>
              </div>
            </div>

            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { name: "Anita Kapoor", role: "Luxury Event Designer", text: "The presentation is unmatched. Each date feels like a piece of jewelry. Simply stunning for my high-end clients." },
                { name: "Vikram Malhotra", role: "Wellness Consultant", text: "Finally, a brand that doesn't compromise on purity. The almonds are always fresh, crunchy, and full of natural oils." }
              ].map((test, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  className="bg-white p-12 shadow-sm border border-stone-100 flex flex-col relative"
                >
                  <Quote className="absolute top-8 right-8 w-12 h-12 text-stone-50" />
                  <div className="flex mb-8">
                    {[...Array(5)].map((_, j) => <Star key={j} className="w-3 h-3 text-[#d4af37] fill-[#d4af37] mr-1" />)}
                  </div>
                  <p className="text-stone-600 font-light italic leading-relaxed mb-10 flex-grow text-lg">"{test.text}"</p>
                  <div>
                    <p className="font-black text-xs uppercase tracking-widest text-emerald-950 mb-1">{test.name}</p>
                    <p className="text-[9px] text-stone-400 uppercase tracking-widest font-bold">{test.role}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Patrons of Swarnaratna - Instagram Gallery */}
      <section className="py-32 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-24">
            <h2 className="text-[10px] font-black text-harvest-gold uppercase tracking-[0.6em] mb-6">Social Heritage</h2>
            <h3 className="text-4xl md:text-6xl font-black text-warm-brown tracking-tighter uppercase italic">Patrons of Swarnaratna</h3>
            <div className="w-24 h-[1px] bg-warm-brown mx-auto mt-10" />
            <p className="mt-10 text-stone-400 font-light italic text-lg">Tag us to be featured in our imperial gallery.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              "/almond.webp",
              "/cashew.webp",
              "/Pistachio.webp",
              "/walnut.webp",
              "/dates.webp",
              "/Cranberries.webp"
            ].map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="relative aspect-square group overflow-hidden cursor-pointer"
              >
                <img src={img} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110" alt="" />
                <div className="absolute inset-0 bg-harvest-gold/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                  <Instagram className="text-white w-8 h-8" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter / VIP - NEW */}
      <section className="py-32 bg-white px-4">
        <div className="max-w-5xl mx-auto bg-[#1a2e1a] rounded-[2rem] overflow-hidden relative shadow-2xl border border-[#d4af37]/20 p-12 md:p-24 text-center">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('/dryfruits-dry-fruits-01.webp')] bg-cover bg-center opacity-10 pointer-events-none" />
          <div className="relative z-10 space-y-12">
            <div className="space-y-4">
              <span className="inline-block p-4 bg-[#d4af37] text-emerald-950 rounded-full mb-6">
                <Gem className="w-6 h-6" />
              </span>
              <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter uppercase italic">The Swarnaratna Circle</h2>
              <p className="text-stone-300 font-light italic text-sm md:text-lg max-w-xl mx-auto leading-relaxed">
                Join our private registry for exclusive access to limited edition harvests, luxury gifting previews, and artisanal wellness insights.
              </p>
            </div>

            <form className="max-w-lg mx-auto flex flex-col sm:flex-row gap-4">
              <input 
                type="email" 
                placeholder="Enter your email identity"
                className="flex-grow bg-white/5 border border-white/10 px-8 py-5 rounded-full text-white focus:outline-none focus:border-[#d4af37] transition-all italic font-light"
              />
              <button className="bg-[#d4af37] text-emerald-950 px-10 py-5 rounded-full font-black text-[10px] uppercase tracking-[0.2em] hover:bg-white transition-all duration-500 shadow-xl whitespace-nowrap">
                Join Now
              </button>
            </form>
            <p className="text-stone-500 text-[9px] uppercase tracking-[0.3em]">No Spam • Only Excellence • Unsubscribe Anytime</p>
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-24 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-20">
            {[
              { icon: Leaf, title: "Pure Heritage", desc: "Generations of expertise in selecting only the most premium grades." },
              { icon: Globe, title: "Global Reach", desc: "Sourcing from 20+ countries to ensure variety and authenticity." },
              { icon: Heart, title: "Freshly Crafted", desc: "Small-batch processing to maintain the natural oils and flavors." }
            ].map((item, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="space-y-6"
              >
                <div className="w-12 h-[1px] bg-emerald-900" />
                <div className="flex items-center space-x-4">
                  <item.icon className="w-5 h-5 text-emerald-900" />
                  <h4 className="font-black uppercase tracking-[0.2em] text-emerald-950 text-xs">{item.title}</h4>
                </div>
                <p className="text-stone-500 font-light leading-relaxed text-[13px] italic">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Home;
