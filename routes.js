// routes.js
const express = require('express');
const router = express.Router();
const product_routes = require('./product_routes');

const User = require('./models/User'); // Import the User model
const Product = require('./models/Product'); // Import the Product model

router.get('/', (req, res) => {
    res.send('Welcome to the API!');
});
// Route handler for fetching products
router.use('/product', product_routes);

router.use('/transaction', transaction_routes);

module.exports = router;