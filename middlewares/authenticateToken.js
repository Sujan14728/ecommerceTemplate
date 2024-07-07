require('dotenv').config();
const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token)
    return res.status(401).json({ status: 'error', message: 'Unauthorized' });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err)
      return res.status(403).json({ status: 'error', message: 'Forbidden' });
    req.user = user;
    next();
  });
};

module.exports = { authenticateToken };
