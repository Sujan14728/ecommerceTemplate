const { Cart, CartItem } = require('../models');

exports.createCart = async (req, res) => {
  try {
    const { userId } = req.body;
    const cart = await Cart.create({ userId });
    res.status(201).json(cart);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.addItemToCart = async (req, res) => {
  try {
    const { cartId, productId, quantity } = req.body;
    const cartItem = await CartItem.create({ cartId, productId, quantity });
    res.status(201).json(cartItem);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Add more cart-related actions as needed
