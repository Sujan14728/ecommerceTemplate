const db = require('../config/database');

exports.addProduct = async (req, res) => {
  const { name, description, price, quantity } = req.body;
  if (!name || !price || !description || !quantity) {
    return res.status(400).json({
      status: 'error',
      message: 'Invalid Input(Fill all the required fields)',
    });
  }
  const q =
    'insert into products (name,description,price,quantity) values (?,?,?,?)';

  db.query(q, [name, description, price, quantity], (productError, results) => {
    if (productError)
      return res
        .status(500)
        .json({ status: 'error', message: productError.message });

    const imagePaths = req.files.map((file) => `/uploads/${file.filename}`);
    for (const imagePath of imagePaths) {
      q2 = 'insert into product_images (product_id,image_path) values (?,?)';
      db.query(q2, [results.insertId, imagePath]);
    }

    return res.status(200).json({
      status: 'success',
      message: 'Product added successfully!!!',
      data: {
        id: results.insertId,
        name,
        description,
        price,
        quantity,
        images: imagePaths,
      },
    });
  });
};

exports.getProduct = async (req, res) => {};

exports.getSingleProduct = async (req, res) => {};

exports.deleteProduct = async (req, res) => {};

exports.updateProduct = async (req, res) => {};
