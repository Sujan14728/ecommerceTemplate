const checkAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res
      .status(403)
      .json({ status: 'error', message: 'Access denied: Admins only' });
  }
  next();
};

module.exports = { checkAdmin };
