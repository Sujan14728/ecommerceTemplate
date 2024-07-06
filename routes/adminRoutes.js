const express = require('express');
const adminController = require('../controllers/adminController');

const router = express.Router();

// Route to create an admin
router.post('/admin/create', adminController.createAdmin);

// Route to get all users
router.get('/admin/users', adminController.getUsers);

// Route to get all orders
router.get('/admin/orders', adminController.getOrders);

// Route to manage products
router.get('/admin/products', adminController.manageProducts);

module.exports = router;
