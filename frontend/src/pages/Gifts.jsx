import React, { useState, useMemo, useEffect } from 'react';
import Layout from '../components/Layout';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, Plus, Minus, Package, Sparkles, Loader2 } from 'lucide-react';
import axios from 'axios';
import { useCart } from '../context/CartContext';
const legacyToPublicImageMap = {
  '/almond.webp': '/dry-fruits-gift-jar-trio.png',
  '/cashew.webp': '/dry-fruits-ivory-three-compartment-box.png',
  '/Pistachio.webp': '/dry-fruits-black-display-assorted-nuts.png',
  '/dates.webp': '/dry-fruits-wooden-gourmet-maroon-ribbon-box.png',
  '/walnut.webp': '/dry-fruits-charcoal-jar-gift-box.png',
  '/Apricots.webp': '/dry-fruits-festive-basket-in-hands.png',
  '/figs.webp': '/dry-fruits-wooden-chest-almond-dates-figs.png',
  '/hazelnut.webp': '/dry-fruits-ivory-family-12-compartment-box.png',
};

const preMadeHampers = [
  {
    _id: 'h1',
    name: 'The Royal Collection',
    description: 'A grand assortment of our finest jumbo cashews, organic almonds, and saffron-infused pistachios in a handcrafted wooden box.',
    price: 2499,
    image: '/dry-fruits-blue-gold-ribbon-box.png',
    category: 'hampers',
    items: ['Jumbo Cashews', 'Organic Almonds', 'Iranian Pistachios'],
    rating: 5,
    reviews: 42
  },
  {
    _id: 'h2',
    name: 'Wellness Treasure',
    description: 'The perfect gift for the health-conscious. Includes organic walnuts, goji berries, and premium flax seeds.',
    price: 1850,
    image: '/dry-fruits-ivory-family-12-compartment-box.png',
    category: 'hampers',
    items: ['Walnuts', 'Dates', 'Almonds'],
    rating: 4.8,
    reviews: 28
  },
  {
    _id: 'h3',
    name: 'Silk Route Delights',
    description: 'Explore the flavors of the ancient Silk Route with exotic dates, dried figs, and roasted apricots.',
    price: 1599,
    image: '/dry-fruits-festive-basket-in-hands.png',
    category: 'hampers',
    items: ['Medjool Dates', 'Figs', 'Apricots'],
    rating: 4.9,
    reviews: 35
  }
];

const Gifts = () => {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [customItems, setCustomItems] = useState([]);
  const [activeTab, setActiveTab] = useState('curated'); // 'curated' or 'custom'

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get('https://swarnaratna.onrender.com/api/products');
        setProducts(data);
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch products');
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const totalPrice = useMemo(() => {
    const basePrice = 250; // Packaging cost
    const itemsPrice = customItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    return basePrice + itemsPrice;
  }, [customItems]);

  const handleAddCustomItem = (product) => {
    setCustomItems(prev => {
      const existing = prev.find(item => (item._id || item.id) === (product._id || product.id));
      if (existing) {
        return prev.map(item => (item._id || item.id) === (product._id || product.id) ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (id, change) => {
    setCustomItems(prev => prev.map(item => {
      if ((item._id || item.id) === id) {
        const newQty = Math.max(0, item.quantity + change);
        return newQty === 0 ? null : { ...item, quantity: newQty };
      }
      return item;
    }).filter(Boolean));
  };

  const handleAddHamperToCart = (hamper) => {
    addToCart({
      ...hamper,
      _id: `hamper-${hamper._id}`, // Unique ID for cart
      name: `${hamper.name} (Curated Hamper)`,
    });
  };

  const handleAddCustomHamperToCart = () => {
    if (customItems.length === 0) return;
    
    addToCart({
      _id: `custom-hamper-${Date.now()}`,
      name: 'Bespoke Gift Hamper',
      price: totalPrice,
      image: '/dry-fruits-blue-gold-ribbon-box.png',
      description: `Custom hamper containing: ${customItems.map(i => `${i.name} x${i.quantity}`).join(', ')}`,
      weight: 'Custom',
      isCustom: true
    });
    setCustomItems([]);
    alert('Your custom hamper has been added to the cart.');
  };

  return (
    <Layout>
      <div className="bg-white">
        {/* Hero Section */}
        <div className="bg-[#1a2e1a] text-white py-32 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl">
              <h2 className="text-[#d4af37] text-[10px] font-black tracking-[0.4em] uppercase mb-8 flex items-center">
                <Gift className="w-4 h-4 mr-3" />
                The Art of Giving
              </h2>
              <h1 className="text-5xl md:text-8xl font-black leading-none tracking-tighter mb-12">
                Elegance <br />
                <span className="italic font-light text-[#d4af37]">Enclosed.</span>
              </h1>
              <p className="text-xl text-stone-300 font-light leading-relaxed">
                Whether curated by our masters or designed by your vision, a Swarnaratna gift is a legacy shared. Discover our exquisite hamper collections.
              </p>
            </div>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="border-b border-stone-100 sticky top-0 bg-white/80 backdrop-blur-md z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center space-x-12">
              <button
                onClick={() => setActiveTab('curated')}
                className={`py-8 text-[11px] font-black uppercase tracking-[0.3em] transition-all relative ${
                  activeTab === 'curated' ? 'text-emerald-900' : 'text-stone-400 hover:text-emerald-900'
                }`}
              >
                Curated Collections
                {activeTab === 'curated' && <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 w-full h-1 bg-emerald-900" />}
              </button>
              <button
                onClick={() => setActiveTab('custom')}
                className={`py-8 text-[11px] font-black uppercase tracking-[0.3em] transition-all relative ${
                  activeTab === 'custom' ? 'text-emerald-900' : 'text-stone-400 hover:text-emerald-900'
                }`}
              >
                Build Your Own
                {activeTab === 'custom' && <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 w-full h-1 bg-emerald-900" />}
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <AnimatePresence mode="wait">
            {activeTab === 'curated' ? (
              <motion.div
                key="curated"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <div className="text-center mb-24">
                  <h2 className="text-[10px] font-black text-emerald-900 uppercase tracking-[0.4em] mb-4">Masterpiece Hampers</h2>
                  <h3 className="text-4xl font-black text-stone-900 tracking-tight">Ready to Inspire</h3>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                  {preMadeHampers.map((hamper) => (
                    <div key={hamper._id} className="group">
                      <div className="aspect-[4/5] bg-stone-50 overflow-hidden relative mb-8">
                        <img 
                          src={hamper.image} 
                          alt={hamper.name} 
                          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                        />
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                           <button 
                             onClick={() => handleAddHamperToCart(hamper)}
                             className="px-10 py-4 bg-emerald-900 text-white text-[10px] font-black uppercase tracking-widest shadow-2xl"
                           >
                             Add to Collection
                           </button>
                        </div>
                      </div>
                      <div className="text-center space-y-4 px-4">
                        <h4 className="text-xl font-black text-stone-900 uppercase tracking-tight">{hamper.name}</h4>
                        <p className="text-stone-400 text-sm font-light leading-relaxed line-clamp-2 italic">{hamper.description}</p>
                        <p className="text-2xl font-black text-emerald-900">Rs. {hamper.price}</p>
                        <div className="pt-4 border-t border-stone-50">
                          <ul className="flex flex-wrap justify-center gap-2">
                            {hamper.items.map((item, idx) => (
                              <li key={idx} className="text-[9px] font-black uppercase tracking-widest text-stone-400 bg-stone-50 px-3 py-1">
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="custom"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-16"
              >
                {/* Product Selection List */}
                <div className="lg:col-span-7 space-y-12">
                  <div className="border-b border-stone-100 pb-8">
                    <h2 className="text-3xl font-black text-stone-900 tracking-tighter uppercase italic">Select Your Ingredients</h2>
                    <p className="text-stone-400 text-sm font-light mt-4 italic">Choose from our harvest to fill your bespoke hamper.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    {loading ? (
                      <div className="col-span-2 flex justify-center py-24">
                        <Loader2 className="w-10 h-10 text-emerald-900 animate-spin" />
                      </div>
                    ) : (
                      products.map((product) => (
                        <div key={product._id || product.id} className="flex items-center space-x-6 p-6 border border-stone-100 bg-stone-50/30 hover:bg-stone-50 transition-colors rounded-2xl">
                          <img src={legacyToPublicImageMap[product.image] || product.image} className="w-16 h-20 object-cover rounded-lg" alt={product.name} />
                          <div className="flex-1">
                            <h4 className="text-[11px] font-black text-stone-900 uppercase tracking-widest">{product.name}</h4>
                            <p className="text-emerald-900 font-black text-sm mt-1">Rs. {product.price}</p>
                          </div>
                          <button 
                            onClick={() => handleAddCustomItem(product)}
                            className="p-3 bg-white border border-stone-100 hover:border-emerald-900 transition-colors shadow-sm"
                          >
                            <Plus className="w-4 h-4 text-emerald-900" />
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* Custom Hamper Preview / Summary */}
                <div className="lg:col-span-5">
                  <div className="bg-[#1a2e1a] text-white p-10 sticky top-32 shadow-2xl overflow-hidden">
                    {/* Background Sparkle Effect */}
                    <div className="absolute top-0 right-0 p-4 opacity-20"><Sparkles className="w-12 h-12" /></div>
                    
                    <h2 className="text-[11px] font-black text-[#d4af37] uppercase tracking-[0.4em] mb-12 border-b border-white/10 pb-6">Your Bespoke Treasure</h2>

                    <div className="space-y-8 min-h-[300px]">
                      {customItems.length === 0 ? (
                        <div className="h-[300px] flex flex-col items-center justify-center text-center space-y-6">
                          <Package className="w-12 h-12 text-white/20" />
                          <p className="text-white/40 font-light italic text-sm">Select items to begin your <br /> artisanal arrangement.</p>
                        </div>
                      ) : (
                        <ul className="space-y-6">
                          {customItems.map((item) => (
                            <li key={item._id || item.id} className="flex items-center justify-between border-b border-white/5 pb-6">
                              <div className="flex-1">
                                <h4 className="text-[12px] font-black uppercase tracking-widest">{item.name}</h4>
                                <p className="text-[#d4af37] text-[10px] font-bold mt-1">Rs. {item.price * item.quantity}</p>
                              </div>
                              <div className="flex items-center space-x-4">
                                <button onClick={() => handleUpdateQuantity(item._id || item.id, -1)} className="p-1 text-white/40 hover:text-white transition-colors"><Minus className="w-4 h-4" /></button>
                                <span className="text-[12px] font-black w-4 text-center">{item.quantity}</span>
                                <button onClick={() => handleUpdateQuantity(item._id || item.id, 1)} className="p-1 text-white/40 hover:text-white transition-colors"><Plus className="w-4 h-4" /></button>
                              </div>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>

                    <div className="mt-12 pt-10 border-t border-white/10">
                      <div className="flex justify-between text-[11px] font-bold uppercase tracking-widest mb-4">
                        <span className="text-white/40">Premium Packaging</span>
                        <span>Rs. 250</span>
                      </div>
                      <div className="flex justify-between items-end">
                        <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">Total Estimate</span>
                        <span className="text-5xl font-black text-[#d4af37] tracking-tighter italic">Rs. {totalPrice}</span>
                      </div>

                      <button 
                        disabled={customItems.length === 0}
                        onClick={handleAddCustomHamperToCart}
                        className="w-full bg-[#d4af37] text-emerald-950 py-6 px-4 text-[11px] font-black uppercase tracking-[0.2em] hover:bg-white transition-all duration-500 mt-12 disabled:opacity-20 disabled:cursor-not-allowed"
                      >
                        Finalize & Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </Layout>
  );
};

export default Gifts;

