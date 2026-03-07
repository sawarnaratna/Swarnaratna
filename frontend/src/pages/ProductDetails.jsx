import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Star, ShoppingCart, Minus, Plus, ArrowLeft, Heart, Share2, Loader2 } from 'lucide-react';
import axios from 'axios';
import Layout from '../components/Layout';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    const fetchProductAndRelated = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/products/${id}`);
        setProduct(data);
        
        // Fetch all products to filter related ones
        const { data: allProducts } = await axios.get(`${import.meta.env.VITE_API_URL}/api/products`);
        const related = allProducts
          .filter(p => p.category === data.category && p._id !== data._id)
          .slice(0, 4);
        setRelatedProducts(related);
        
        setLoading(false);
      } catch (err) {
        setError('Failed to load product details');
        setLoading(false);
      }
    };
    fetchProductAndRelated();
  }, [id]);

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center py-48">
          <Loader2 className="w-16 h-12 text-emerald-900 animate-spin" />
        </div>
      </Layout>
    );
  }

  if (error || !product) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
          <h1 className="text-4xl font-black text-stone-900 uppercase tracking-tighter mb-6">Product Not Found</h1>
          <p className="text-stone-400 font-light italic mb-12">{error || 'The treasure you seek has eluded our collection.'}</p>
          <Link
            to="/products"
            className="inline-block px-12 py-5 border border-emerald-900 text-emerald-900 font-black uppercase tracking-[0.2em] text-[11px] hover:bg-emerald-900 hover:text-white transition-all duration-500"
          >
            Return to Collection
          </Link>
        </div>
      </Layout>
    );
  }

  const handleQuantityChange = (change) => {
    setQuantity(prev => Math.max(1, prev + change));
  };

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  };

  // Mock additional images
  const productImages = [
    product.image,
    "/dryfruits-dry-fruits-01.webp",
    "/hazelnut.webp"
  ];

  return (
    <Layout>
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Breadcrumb - Minimal */}
          <nav className="flex mb-12" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-4 text-[10px] font-black uppercase tracking-[0.2em]">
              <li><Link to="/" className="text-stone-400 hover:text-emerald-900 transition-colors">Home</Link></li>
              <li className="text-stone-200">/</li>
              <li><Link to="/products" className="text-stone-400 hover:text-emerald-900 transition-colors">Collection</Link></li>
              <li className="text-stone-200">/</li>
              <li className="text-emerald-900">{product.name}</li>
            </ol>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            {/* Product Images - High Impact */}
            <div className="space-y-6">
              <div className="aspect-[4/5] bg-stone-50 overflow-hidden relative group">
                <img
                  src={productImages[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                {product.originalPrice > product.price && (
                  <div className="absolute top-8 left-8 bg-emerald-900 text-white px-4 py-2 text-[10px] font-black uppercase tracking-widest">
                    Offer
                  </div>
                )}
              </div>
              <div className="grid grid-cols-3 gap-6">
                {productImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square overflow-hidden transition-all duration-500 ${
                      selectedImage === index ? 'opacity-100 border border-emerald-900' : 'opacity-40 hover:opacity-100 border border-transparent'
                    }`}
                  >
                    <img src={image} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info - Editorial Style */}
            <div className="flex flex-col">
              <div className="border-b border-stone-100 pb-10 mb-10">
                <p className="text-emerald-900 text-[10px] font-black tracking-[0.4em] uppercase mb-4">{product.category}</p>
                <h1 className="text-4xl md:text-6xl font-black text-stone-900 leading-tight tracking-tighter mb-6">{product.name}</h1>
                
                <div className="flex items-center mb-8 space-x-4">
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className={`w-1.5 h-1.5 rounded-full ${i < Math.floor(product.rating) ? 'bg-[#d4af37]' : 'bg-stone-200'}`} />
                    ))}
                  </div>
                  <span className="text-[10px] text-stone-400 font-bold uppercase tracking-widest">{product.reviews} Master Reviews</span>
                </div>

                <div className="flex items-baseline space-x-4">
                  <span className="text-4xl font-black text-emerald-900 tracking-tighter">₹{product.price}</span>
                  {product.originalPrice > product.price && (
                    <span className="text-xl text-stone-300 line-through font-light">₹{product.originalPrice}</span>
                  )}
                </div>
              </div>

              <div className="space-y-10">
                <p className="text-stone-500 font-light leading-relaxed text-lg italic">
                  {product.description}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-8 border-y border-stone-100">
                  <div>
                    <h3 className="text-[10px] font-black uppercase tracking-[0.3em] mb-6 text-stone-900">Provenance & Care</h3>
                    <ul className="space-y-4">
                      {product.features && product.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-[12px] text-stone-500 uppercase tracking-widest">
                          <span className="w-1 h-[1px] bg-emerald-900 mr-4"></span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-[10px] font-black uppercase tracking-[0.3em] mb-6 text-stone-900">Specifications</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between text-[12px] uppercase tracking-widest border-b border-stone-50 pb-2">
                        <span className="text-stone-400">Net Weight</span>
                        <span className="text-stone-900 font-bold">{product.weight}</span>
                      </div>
                      <div className="flex justify-between text-[12px] uppercase tracking-widest border-b border-stone-50 pb-2">
                        <span className="text-stone-400">Availability</span>
                        <span className="text-emerald-700 font-bold">In Stock</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Interaction Section */}
                <div className="pt-4 space-y-6">
                  <div className="flex items-center space-x-6">
                    <div className="flex items-center border border-stone-200">
                      <button
                        onClick={() => handleQuantityChange(-1)}
                        className="p-5 hover:bg-stone-50 transition-colors"
                        disabled={quantity <= 1}
                      >
                        <Minus className="w-4 h-4 text-stone-400" />
                      </button>
                      <span className="w-12 text-center font-black text-sm">{quantity}</span>
                      <button
                        onClick={() => handleQuantityChange(1)}
                        className="p-5 hover:bg-stone-50 transition-colors"
                      >
                        <Plus className="w-4 h-4 text-stone-400" />
                      </button>
                    </div>

                    <button
                      onClick={handleAddToCart}
                      className="flex-1 bg-emerald-900 text-white py-5 px-10 text-[11px] font-black uppercase tracking-[0.2em] hover:bg-emerald-950 transition-all duration-500 shadow-2xl"
                    >
                      Acquire to Cart
                    </button>
                  </div>

                  <div className="flex space-x-4">
                    <button className="flex-1 flex items-center justify-center py-4 border border-stone-200 text-[10px] font-black uppercase tracking-widest hover:border-emerald-900 transition-colors">
                      <Heart className="w-4 h-4 mr-3" />
                      Add to Wishlist
                    </button>
                    <button className="flex-1 flex items-center justify-center py-4 border border-stone-200 text-[10px] font-black uppercase tracking-widest hover:border-emerald-900 transition-colors">
                      <Share2 className="w-4 h-4 mr-3" />
                      Inquire / Share
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Nutrition Section - Refined */}
          {product.nutrition && (
            <div className="mt-32 pt-24 border-t border-stone-100">
              <div className="text-center mb-16">
                <h2 className="text-[10px] font-black text-emerald-900 uppercase tracking-[0.4em] mb-4">Nutritional Profile</h2>
                <h3 className="text-4xl font-black text-stone-900 tracking-tight">Pure Vitality</h3>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-1px bg-stone-100 border border-stone-100 max-w-4xl mx-auto">
                {[
                  { label: "Calories", value: product.nutrition.calories, unit: "kcal" },
                  { label: "Protein", value: product.nutrition.protein, unit: "g" },
                  { label: "Healthy Fats", value: product.nutrition.fat, unit: "g" },
                  { label: "Total Carbs", value: product.nutrition.carbs, unit: "g" }
                ].map((item, i) => (
                  <div key={i} className="bg-white p-12 text-center">
                    <div className="text-3xl font-black text-emerald-900 mb-2">{item.value}<span className="text-xs font-light text-stone-400 ml-1">{item.unit}</span></div>
                    <div className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-400">{item.label}</div>
                  </div>
                ))}
              </div>
              <p className="text-[10px] text-stone-400 mt-12 text-center uppercase tracking-widest font-bold">
                * Values based on 100g serving. Authentically harvested.
              </p>
            </div>
          )}

          {/* Related Collection */}
          {relatedProducts.length > 0 && (
            <div className="mt-32">
              <div className="flex items-end justify-between mb-16">
                <div>
                  <h2 className="text-[10px] font-black text-emerald-900 uppercase tracking-[0.4em] mb-4">Complementary Selection</h2>
                  <h3 className="text-4xl font-black text-stone-900 tracking-tight">You May Also Desire</h3>
                </div>
                <Link to="/products" className="text-[10px] font-black uppercase tracking-widest border-b border-emerald-900 pb-1 text-emerald-900">View Entire Collection</Link>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
                {relatedProducts.map((relatedProduct) => (
                  <ProductCard key={relatedProduct._id} product={relatedProduct} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;