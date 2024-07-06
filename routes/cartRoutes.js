const express = require('express');
const cartController = require('../controllers/cartController');

const router = express.Router();

router.post('/carts', cartController.createCart);
router.post('/carts/items', cartController.addItemToCart);

module.exports = router;
