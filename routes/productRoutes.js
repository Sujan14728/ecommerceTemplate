const express = require('express');
const productController = require('../controllers/productController');
const { authenticateToken } = require('../middlewares/authenticateToken');
const { checkAdmin } = require('../middlewares/checkAdmin');
const upload = require('../middlewares/multerConfig');

const router = express.Router();

router.post(
  '/',
  authenticateToken,
  checkAdmin,
  upload.array('images', 10),
  productController.addProduct
);

//get single product by id
router.get('/:id', productController.getSingleProduct);

//get all products
router.get('/', productController.getProduct);

router.delete(
  '/:id',
  authenticateToken,
  checkAdmin,
  productController.deleteProduct
);

router.put(
  '/:id',
  authenticateToken,
  checkAdmin,
  productController.updateProduct
);

module.exports = router;
