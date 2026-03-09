const asyncHandler = require('express-async-handler');
const Product = require('../models/Product');

const IMAGE_MAP = {
  '/almond.webp': '/dry-fruits-gift-jar-trio.png',
  '/cashew.webp': '/dry-fruits-ivory-three-compartment-box.png',
  '/Pistachio.webp': '/dry-fruits-black-display-assorted-nuts.png',
  '/dates.webp': '/dry-fruits-wooden-gourmet-maroon-ribbon-box.png',
  '/walnut.webp': '/dry-fruits-charcoal-jar-gift-box.png',
  '/Apricots.webp': '/dry-fruits-festive-basket-in-hands.png',
  '/figs.webp': '/dry-fruits-wooden-chest-almond-dates-figs.png',
  '/hazelnut.webp': '/dry-fruits-ivory-family-12-compartment-box.png',
  '/dryfruits-dry-fruits-01.webp': '/dry-fruits-blue-gold-ribbon-box.png',
  '/Cranberries.webp': '/dry-fruits-holi-special-hamper.png',
};

const normalizeProductImage = (productDoc) => {
  const product = productDoc.toObject ? productDoc.toObject() : { ...productDoc };
  if (product.image && IMAGE_MAP[product.image]) {
    product.image = IMAGE_MAP[product.image];
  }
  return product;
};

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products.map(normalizeProductImage));
});

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(normalizeProductImage(product));
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

module.exports = {
  getProducts,
  getProductById,
};

