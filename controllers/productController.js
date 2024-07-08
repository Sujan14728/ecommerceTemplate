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

exports.getProduct = async (req, res) => {
  try {
    const start = parseInt(req.body.start) || 0;
    const limit = parseInt(req.body.limit) || 10;

    const q = `select * from products limit ? offset ?`;

    const [productResults] = await db.promise().query(q, [limit, start]);

    const productWithImages = await Promise.all(
      productResults.map(async (product) => {
        const q2 = 'select image_path from product_images where product_id=?';
        const [imageResults] = await db.promise().query(q2, [product.id]);
        product.images = imageResults.map((img) => img.image_path);
        return product;
      })
    );
    res.status(200).json({ status: 'success', data: productWithImages });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

exports.getSingleProduct = async (req, res) => {
  
};

exports.deleteProduct = async (req, res) => {};

exports.updateProduct = async (req, res) => {};
