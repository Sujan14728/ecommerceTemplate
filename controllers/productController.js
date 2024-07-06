const { Product } = require('../models');

exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, quantity, imageUrl } = req.body;
    const product = await Product.create({
      name,
      description,
      price,
      quantity,
      imageUrl,
    });
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Add more product-related actions as needed
