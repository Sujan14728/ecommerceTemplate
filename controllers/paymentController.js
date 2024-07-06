const { Payment } = require('../models');

exports.createPayment = async (req, res) => {
  try {
    const { orderId, amount, method, status } = req.body;
    const payment = await Payment.create({ orderId, amount, method, status });
    res.status(201).json(payment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getPayment = async (req, res) => {
  try {
    const payment = await Payment.findByPk(req.params.id);
    if (!payment) {
      return res.status(404).json({ error: 'Payment not found' });
    }
    res.status(200).json(payment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Add more payment-related actions as needed
