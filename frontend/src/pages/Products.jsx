import React, { useState, useMemo, useEffect } from 'react';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
import Layout from '../components/Layout';
import ProductCard from '../components/ProductCard';
import ProductSkeleton from '../components/ProductSkeleton';
import { Filter, Search, SlidersHorizontal, Sparkles } from 'lucide-react';

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

const Products = () => {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const initialSearch = searchParams.get('q');
    const initialCategory = searchParams.get('category');

    if (initialSearch) {
      setSearchTerm(initialSearch);
    }

    if (initialCategory) {
      const normalizedCategory = initialCategory.toLowerCase().replace(/\s+/g, '-');
      setSelectedCategory(normalizedCategory);
    }
  }, [searchParams]);

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

  const categories = useMemo(() => {
    const counts = products.reduce((acc, product) => {
      acc[product.category] = (acc[product.category] || 0) + 1;
      return acc;
    }, {});

    return [
      { id: 'all', name: 'All Products', count: products.length },
      { id: 'nuts', name: 'Nuts', count: counts.nuts || 0 },
      { id: 'dates', name: 'Dates', count: counts.dates || 0 },
      { id: 'dried-fruits', name: 'Dried Fruits', count: counts['dried-fruits'] || 0 },
    ];
  }, [products]);

  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    if (selectedCategory !== 'all') {
      filtered = filtered.filter((product) => product.category === selectedCategory);
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        default:
          return 0;
      }
    });

    return filtered;
  }, [products, selectedCategory, searchTerm, sortBy]);

  const normalizedProducts = useMemo(() => {
    return filteredProducts.map((product) => ({
      ...product,
      image: legacyToPublicImageMap[product.image] || product.image,
    }));
  }, [filteredProducts]);

  return (
    <Layout>
      <section className="relative overflow-hidden bg-[#112114]">
        <div className="absolute inset-0 bg-[url('/dry-fruits-black-premium-jar-hamper.png')] bg-cover bg-center opacity-25" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#112114]/95 via-[#112114]/80 to-[#112114]/40" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-24 relative">
          <div className="max-w-2xl">
            <span className="inline-flex items-center text-[#d4af37] font-black tracking-[0.3em] uppercase text-[10px] mb-6">
              <Sparkles className="w-3 h-3 mr-3" />
              Premium Dry Fruit Collection
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-tight">
              Taste The Finest Harvests
            </h1>
            <p className="mt-6 text-stone-200/90 max-w-xl text-sm md:text-base italic leading-relaxed">
              Handpicked nuts, dates, and dried fruits curated for everyday wellness and premium gifting.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12 py-12">
            {[...Array(8)].map((_, i) => (
              <ProductSkeleton key={i} />
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-48">
            <p className="text-stone-400 font-light italic">{error}</p>
          </div>
        ) : (
          <>
            <div className="mb-12 rounded-3xl border border-stone-200/80 bg-gradient-to-br from-stone-50 to-white p-5 md:p-8 shadow-sm">
              <div className="flex items-center justify-between mb-6 gap-4">
                <h2 className="flex items-center text-[11px] md:text-xs font-black uppercase tracking-[0.25em] text-emerald-900">
                  <SlidersHorizontal className="w-4 h-4 mr-2" />
                  Refine Your Selection
                </h2>
                <p className="text-stone-500 text-[10px] uppercase tracking-[0.2em] font-bold">
                  {normalizedProducts.length} Product{normalizedProducts.length !== 1 ? 's' : ''}
                </p>
              </div>

              <div className="flex flex-col lg:flex-row gap-4 md:gap-6 mb-6">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-stone-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search nuts, dates, dried fruits..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-white border border-stone-200 rounded-2xl focus:ring-0 focus:border-emerald-900 transition-all font-light tracking-wide outline-none"
                  />
                </div>

                <div className="w-full lg:w-72">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full px-4 py-4 bg-white border border-stone-200 rounded-2xl focus:ring-0 focus:border-emerald-900 transition-all font-black text-[10px] uppercase tracking-widest outline-none"
                  >
                    <option value="name">Sort by Name</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                  </select>
                </div>

                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden flex items-center justify-center px-4 py-3 border border-stone-200 rounded-2xl hover:bg-white font-black text-[10px] uppercase tracking-widest"
                >
                  <Filter className="w-5 h-5 mr-2" />
                  Filters
                </button>
              </div>

              <div className={`lg:block ${showFilters ? 'block' : 'hidden'}`}>
                <div className="flex flex-wrap gap-3 mb-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`px-6 md:px-8 py-3 rounded-full border transition-all duration-300 text-[10px] font-black uppercase tracking-[0.18em] ${
                        selectedCategory === category.id
                          ? 'bg-emerald-900 border-emerald-900 text-white'
                          : 'bg-white border-stone-200 text-stone-600 hover:border-emerald-900 hover:text-emerald-900 shadow-sm'
                      }`}
                    >
                      {category.name}
                      <span className={`ml-2 ${selectedCategory === category.id ? 'text-white/70' : 'text-stone-400'}`}>
                        ({category.count})
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mb-10 flex items-center justify-between border-b border-stone-200 pb-4">
              <p className="text-stone-500 text-[10px] uppercase tracking-widest font-bold">
                Showing {normalizedProducts.length} product{normalizedProducts.length !== 1 ? 's' : ''}
                {selectedCategory !== 'all' && ` in ${categories.find((c) => c.id === selectedCategory)?.name}`}
                {searchTerm && ` for "${searchTerm}"`}
              </p>
            </div>

            {normalizedProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
                {normalizedProducts.map((product) => (
                  <ProductCard key={product._id || product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-24">
                <div className="text-stone-200 mb-8 flex justify-center">
                  <Search className="w-12 h-12" />
                </div>
                <h3 className="text-xl font-black text-stone-900 uppercase tracking-widest mb-4">No results found</h3>
                <p className="text-stone-400 font-light mb-8 max-w-md mx-auto italic">
                  We couldn't find any products matching your current criteria. Try widening your search.
                </p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('all');
                    setSortBy('name');
                  }}
                  className="px-8 py-4 border border-emerald-900 text-emerald-900 font-black text-[10px] uppercase tracking-[0.2em] hover:bg-emerald-900 hover:text-white transition-all duration-300"
                >
                  Reset All Filters
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </Layout>
  );
};

export default Products;
