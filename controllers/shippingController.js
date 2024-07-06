const { Shipping } = require('../models');

exports.createShipping = async (req, res) => {
  try {
    const { orderId, shippingMethod, trackingNumber, status } = req.body;
    const shipping = await Shipping.create({
      orderId,
      shippingMethod,
      trackingNumber,
      status,
    });
    res.status(201).json(shipping);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getShipping = async (req, res) => {
  try {
    const shipping = await Shipping.findByPk(req.params.id);
    if (!shipping) {
      return res.status(404).json({ error: 'Shipping not found' });
    }
    res.status(200).json(shipping);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Add more shipping-related actions as needed
