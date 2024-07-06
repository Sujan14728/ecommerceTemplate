const { Order } = require('../models');

exports.createOrder = async (req, res) => {
  try {
    const { userId, totalAmount, status } = req.body;
    const order = await Order.create({ userId, totalAmount, status });
    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getOrder = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Add more order-related actions as needed
