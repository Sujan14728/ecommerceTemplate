const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();

const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const cartRoutes = require('./routes/cartRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const shippingRoutes = require('./routes/shippingRoutes');
const reviewRoutes = require('./routes/reviewRoutes');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Credentials', true);
  next();
});
app.use(
  cors({
    origin: 'http://localhost:5173',
  })
);
app.use(cookieParser());

// Routes
app.use('/api/user', userRoutes);
app.use('/api/product', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/shipping', shippingRoutes);
// app.use('/api/notification', notificationRoutes);
app.use('/api/review', reviewRoutes);
app.use('/api/admin', adminRoutes);
// app.use('/api/analytic', analyticRoutes);
// app.use('/api/search', searchRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server listening at port: http://localhost:${process.env.PORT}`);
});
