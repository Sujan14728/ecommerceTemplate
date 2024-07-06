const express = require('express');
const reviewController = require('../controllers/reviewController');

const router = express.Router();

router.post('/reviews', reviewController.createReview);
router.get('/reviews/:id', reviewController.getReview);

module.exports = router;
