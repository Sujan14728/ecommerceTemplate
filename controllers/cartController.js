// addCartItem Logic
//Check for missing Fields
// Check if the cart exists for the user
// Create a new cart if it does not exists
// Check if the product is already in the cart
// Add new product to the cart
// Update the quantity of the existing product in the cart

const db = require('../config/database');

exports.addCartItem = async (req, res) => {
  const { userId, productId, quantity } = req.body;
  if ((!userId, !productId, !quantity)) {
    return res.status(400).json({
      status: 'error',
      message: 'Invalid Input(Fill all the required fields)',
    });
  }

  try {
    // Check if the user exists
    const [userResult] = await db
      .promise()
      .query('SELECT * FROM users WHERE id = ?', [userId]);
    if (userResult.length === 0) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found',
      });
    }

    const q = 'select * from carts where user_id=?';
    const [cartResult] = await db.promise().query(q, [userId]);
    let cartId;
    if (cartResult.length === 0) {
      const insertQuery = 'insert into carts (user_id) values (?)';
      const [newCartResult] = await db.promise().query(insertQuery, [userId]);

      cartId = newCartResult.insertId;
    } else {
      cartId = cartResult[0].id;
    }
    const q2 = 'select * from cart_items where cart_id = ? and product_id = ?';
    const [cartItemResult] = await db.promise().query(q2, [cartId, productId]);
    // console.log(cartItemResult);

    if (cartItemResult.length === 0) {
      const q3 =
        'insert into cart_items (cart_id,product_id,quantity) values (?,?,?)';
      await db.promise().query(q3, [cartId, productId, quantity]);
    } else {
      const q4 =
        'update cart_items set quantity = quantity+? where cart_id=? and product_id=?';
      await db.promise().query(q4, [quantity, cartId, productId]);
    }

    return res.status(200).json({
      status: 'success',
      message: 'Product added to cart successfully',
    });
  } catch (error) {
    return res.status(500).json({ status: 'error', message: error.message });
  }
};

exports.getCart = async (req, res) => {
  const { userId } = req.params;
  if (!userId) {
    return res.status(400).json({
      status: 'error',
      message: 'user id is required',
    });
  }

  try {
    const [userResult] = await db
      .promise()
      .query('select * from users where id =?', [userId]);
    if (userResult.length === 0) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found',
      });
    }
    const [cartResult] = await db
      .promise()
      .query('select * from carts where user_id = ?', [userId]);
    if (cartResult.length === 0) {
      return res.status(404).json({
        status: 'error',
        message: 'Cart not found',
      });
    }

    const cartId = cartResult[0].id;

    const q = `
      SELECT 
        ci.product_id, 
        ci.quantity, 
        p.name, 
        p.description, 
        p.price,
        pi.image_path
      FROM 
        cart_items ci
      JOIN 
        products p ON ci.product_id = p.id
      LEFT JOIN 
        product_images pi ON ci.product_id = pi.product_id
      WHERE 
        ci.cart_id = ?;
    `;
    const [cartItemsResult] = await db.promise().query(q, [cartId]);

    const cartItems = cartItemsResult.reduce((acc, item) => {
      const existingProductIndex = acc.findIndex(
        (product) => product.productId === item.product_id
      );
      if (existingProductIndex !== -1) {
        if (item.image_path) {
          acc[existingProductIndex].images.push(item.image_path);
        }
      } else {
        acc.push({
          productId: item.product_id,
          name: item.name,
          description: item.description,
          price: item.price,
          quantity: item.quantity,
          images: item.image_path ? [item.image_path] : [],
        });
      }
      return acc;
    }, []);

    return res.status(200).json({
      status: 'success',
      data: cartItems,
    });
  } catch (error) {
    return res.status(500).json({ status: 'error', message: error.message });
  }
};

exports.updateCartItem = async (req, res) => {};

exports.deleteCartItem = async (req, res) => {};
