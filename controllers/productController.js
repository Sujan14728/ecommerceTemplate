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
  const { id } = req.params;
  try {
    const q = 'select * from products where id=?';
    const [product] = await db.promise().query(q, [id]);
    if (product.length === 0)
      return res
        .status(404)
        .json({ status: 'error', message: 'Product not found' });
    const q2 = 'select image_path from product_images where product_id =?';
    const [images] = await db.promise().query(q2, [product[0].id]);
    product[0].images = images.map((img) => img.image_path);
    res.status(200).json({ status: 'success', data: product[0] });
  } catch (error) {
    res.statu(500).json({ status: 'error', message: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const q = 'DELETE FROM products WHERE id = ?';
    const [result] = await db.promise().query(q, [id]);
    if (result.affectedRows === 0)
      return res
        .status(404)
        .json({ status: 'error', message: 'Product not found' });
    res
      .status(200)
      .json({ status: 'success', message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, quantity } = req.body;
  try {
    const q = 'select * from products where id=?';
    const [product] = await db.promise().query(q, [id]);
    if (product.length === 0)
      return res
        .status(404)
        .json({ status: 'error', message: 'Product not found' });
    const updatedProduct = {
      name: name || product[0].name,
      description: description || product[0].description,
      price: price || product[0].price,
      quantity: quantity || product[0].quantity,
    };
    const q2 =
      'update products set name=?, description=?,price=?,quantity=? where id=?';
    await db
      .promise()
      .query(q2, [
        updatedProduct.name,
        updatedProduct.description,
        updatedProduct.price,
        updatedProduct.quantity,
        id,
      ]);

    if (req.files.length > 0) {
      await db
        .promise()
        .query('delete from product_images where product_id=?', [id]);
      const imagePaths = req.files.map((file) => `/uploads/${file.filename}`);
      for (const imagePath of imagePaths) {
        await db
          .promise()
          .query(
            'insert into product_images (product_id,image_path) values(?,?)',
            [id, imagePath]
          );
      }
    }
    res
      .status(200)
      .json({ status: 'success', message: 'Product updated successfully' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};
