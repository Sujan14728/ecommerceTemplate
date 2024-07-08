const express = require('express');
const cartController = require('../controllers/cartController');

const router = express.Router();

router.post('/', cartController.addCartItem);
router.get('/:userId', cartController.getCart);
router.put('/', cartController.updateCartItem);
router.delete('/', cartController.deleteCartItem);

module.exports = router;
