export const products = [
  {
    id: 1,
    name: "Premium Almonds",
    description: "Fresh, crunchy almonds sourced from the finest orchards. Rich in healthy fats and perfect for snacking.",
    price: 450,
    originalPrice: 500,
    weight: "500g",
    image: "/dry-fruits-gift-jar-trio.png",
    category: "nuts",
    rating: 4.8,
    reviews: 124,
    inStock: true,
    features: ["Premium Quality", "Rich in Nutrients", "No Preservatives"],
    nutrition: {
      calories: 579,
      protein: 21.2,
      fat: 49.9,
      carbs: 21.6
    }
  },
  {
    id: 2,
    name: "California Cashews",
    description: "Buttery, creamy cashews with a delicate flavor. Perfect for cooking and snacking.",
    price: 520,
    originalPrice: 600,
    weight: "500g",
    image: "/dry-fruits-ivory-three-compartment-box.png",
    category: "nuts",
    rating: 4.9,
    reviews: 89,
    inStock: true,
    features: ["Premium Quality", "Buttery Texture", "Versatile Use"],
    nutrition: {
      calories: 553,
      protein: 18.2,
      fat: 43.8,
      carbs: 30.2
    }
  },
  {
    id: 3,
    name: "Iranian Pistachios",
    description: "Premium pistachios with vibrant green kernels. Naturally sweet and crunchy.",
    price: 680,
    originalPrice: 750,
    weight: "500g",
    image: "/dry-fruits-black-display-assorted-nuts.png",
    category: "nuts",
    rating: 4.7,
    reviews: 156,
    inStock: true,
    features: ["Premium Quality", "Naturally Sweet", "High Protein"],
    nutrition: {
      calories: 562,
      protein: 20.2,
      fat: 45.3,
      carbs: 27.5
    }
  },
  {
    id: 4,
    name: "Medjool Dates",
    description: "Large, soft, and naturally sweet dates. Perfect for desserts and healthy snacking.",
    price: 380,
    originalPrice: 420,
    weight: "500g",
    image: "/dry-fruits-wooden-gourmet-maroon-ribbon-box.png",
    category: "dates",
    rating: 4.6,
    reviews: 98,
    inStock: true,
    features: ["Naturally Sweet", "High Fiber", "Energy Boost"],
    nutrition: {
      calories: 277,
      protein: 1.8,
      fat: 0.2,
      carbs: 74.9
    }
  },
  {
    id: 5,
    name: "Organic Walnuts",
    description: "Premium walnut kernels, rich in omega-3 fatty acids. Excellent for brain health and baking.",
    price: 750,
    originalPrice: 850,
    weight: "500g",
    image: "/dry-fruits-charcoal-jar-gift-box.png",
    category: "nuts",
    rating: 4.8,
    reviews: 112,
    inStock: true,
    features: ["Organic Certified", "Rich in Omega-3", "Hand-Picked"],
    nutrition: {
      calories: 654,
      protein: 15.2,
      fat: 65.2,
      carbs: 13.7
    }
  },
  {
    id: 6,
    name: "Golden Apricots",
    description: "Sun-dried golden apricots with a chewy texture and sweet-tart flavor.",
    price: 420,
    originalPrice: 480,
    weight: "500g",
    image: "/dry-fruits-festive-basket-in-hands.png",
    category: "dried-fruits",
    rating: 4.7,
    reviews: 76,
    inStock: true,
    features: ["Sun-Dried", "Fiber Rich", "Natural Sweetness"],
    nutrition: {
      calories: 241,
      protein: 3.4,
      fat: 0.5,
      carbs: 63
    }
  },
  {
    id: 7,
    name: "Dried Figs",
    description: "Premium dried figs, naturally sweet and packed with fiber.",
    price: 580,
    originalPrice: 650,
    weight: "500g",
    image: "/dry-fruits-wooden-chest-almond-dates-figs.png",
    category: "dried-fruits",
    rating: 4.5,
    reviews: 64,
    inStock: true,
    features: ["Premium Quality", "Rich in Calcium", "No Added Sugar"],
    nutrition: {
      calories: 249,
      protein: 3.3,
      fat: 0.9,
      carbs: 63.9
    }
  },
  {
    id: 8,
    name: "Premium Hazelnuts",
    description: "Crunchy hazelnuts with a rich, nutty flavor. Perfect for snacking and gourmet recipes.",
    price: 820,
    originalPrice: 900,
    weight: "500g",
    image: "/dry-fruits-ivory-family-12-compartment-box.png",
    category: "nuts",
    rating: 4.6,
    reviews: 52,
    inStock: true,
    features: ["Gourmet Quality", "Heart Healthy", "Perfectly Dried"],
    nutrition: {
      calories: 628,
      protein: 15,
      fat: 61,
      carbs: 17
    }
  }
];

export const categories = [
  { id: "all", name: "All Products", count: products.length },
  { id: "nuts", name: "Nuts", count: products.filter(p => p.category === "nuts").length },
  { id: "dates", name: "Dates", count: products.filter(p => p.category === "dates").length },
  { id: "dried-fruits", name: "Dried Fruits", count: products.filter(p => p.category === "dried-fruits").length }
];

export const reviews = [
  {
    id: 1,
    productId: 1,
    user: "Priya Sharma",
    rating: 5,
    comment: "Absolutely delicious! The quality is outstanding and they arrived fresh.",
    date: "2024-01-15"
  },
  {
    id: 2,
    productId: 1,
    user: "Rajesh Kumar",
    rating: 4,
    comment: "Great almonds, very crunchy and fresh. Will order again.",
    date: "2024-01-10"
  },
  {
    id: 3,
    productId: 2,
    user: "Anita Patel",
    rating: 5,
    comment: "These cashews are perfect for my cooking. Love the buttery texture!",
    date: "2024-01-12"
  }
];


