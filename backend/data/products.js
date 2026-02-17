const products = [
  {
    name: "Premium Almonds",
    description: "Fresh, crunchy almonds sourced from the finest orchards. Rich in healthy fats and perfect for snacking.",
    price: 450,
    originalPrice: 500,
    weight: "500g",
    image: "/almond.webp",
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
    name: "California Cashews",
    description: "Buttery, creamy cashews with a delicate flavor. Perfect for cooking and snacking.",
    price: 520,
    originalPrice: 600,
    weight: "500g",
    image: "/cashew.webp",
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
    name: "Iranian Pistachios",
    description: "Premium pistachios with vibrant green kernels. Naturally sweet and crunchy.",
    price: 680,
    originalPrice: 750,
    weight: "500g",
    image: "/Pistachio.webp",
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
    name: "Medjool Dates",
    description: "Large, soft, and naturally sweet dates. Perfect for desserts and healthy snacking.",
    price: 380,
    originalPrice: 420,
    weight: "500g",
    image: "/dates.webp",
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
    name: "Organic Walnuts",
    description: "Premium walnut kernels, rich in omega-3 fatty acids. Excellent for brain health and baking.",
    price: 750,
    originalPrice: 850,
    weight: "500g",
    image: "/walnut.webp",
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
    name: "Golden Apricots",
    description: "Sun-dried golden apricots with a chewy texture and sweet-tart flavor.",
    price: 420,
    originalPrice: 480,
    weight: "500g",
    image: "/Apricots.webp",
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
    name: "Dried Figs",
    description: "Premium dried figs, naturally sweet and packed with fiber.",
    price: 580,
    originalPrice: 650,
    weight: "500g",
    image: "/figs.webp",
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
    name: "Premium Hazelnuts",
    description: "Crunchy hazelnuts with a rich, nutty flavor. Perfect for snacking and gourmet recipes.",
    price: 820,
    originalPrice: 900,
    weight: "500g",
    image: "/hazelnut.webp",
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

module.exports = products;
