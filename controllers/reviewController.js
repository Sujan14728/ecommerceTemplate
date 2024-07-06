const { Review } = require('../models');

exports.createReview = async (req, res) => {
  try {
    const { userId, productId, rating, comment } = req.body;
    const review = await Review.create({ userId, productId, rating, comment });
    res.status(201).json(review);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getReview = async (req, res) => {
  try {
    const review = await Review.findByPk(req.params.id);
    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }
    res.status(200).json(review);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Add more review-related actions as needed
