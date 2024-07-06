const express = require('express');
const shippingController = require('../controllers/shippingController');

const router = express.Router();

router.post('/shipping', shippingController.createShipping);
router.get('/shipping/:id', shippingController.getShipping);

module.exports = router;
