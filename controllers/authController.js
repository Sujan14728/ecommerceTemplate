const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../config/database');

exports.registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res
      .status(401)
      .json({ status: 'error', message: 'Invalid Credentials' });
  }

  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);

  const q = 'insert into users(`username`,`email`,`password`) value (?,?,?)';

  db.query(q, [username, email, hashedPassword], (error, results) => {
    if (error)
      return res.status(500).json({ status: 'error', message: error.message });

    return res.status(201).json({ status: 'success', data: results });
  });
};

exports.loginUser = async (req, res) => {
  try {
    if (!req.body.email || !req.body.password) {
      return res
        .status(400)
        .json({ status: 'error', message: 'Email and password are required' });
    }

    const q = 'select * from users where email=?';

    db.query(q, [req.body.email], (error, [results]) => {
      if (error)
        return res
          .status(500)
          .json({ status: 'error', message: error.message });
      if (!results) {
        return res
          .status(404)
          .json({ status: 'error', message: 'User not found' });
      }

      const isPasswordValid = bcrypt.compareSync(
        req.body.password,
        results.password
      );

      if (!isPasswordValid) {
        return res
          .status(401)
          .json({ status: 'error', message: 'Invalid credentials' });
      }

      const payload = {
        userId: results.id,
        username: results.username,
        role: results.role,
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '24h',
      });

      const { password, ...others } = results;

      res.cookie('token', token, {
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 1000,
        secure: process.env.NODE_ENV === 'production',
      });

      res.status(200).json({ status: 'success', data: others, token });
    });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ status: 'error', message: 'Server error' });
  }
};
