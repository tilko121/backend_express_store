// routes.js
const express = require('express');
const router = express.Router();

const User = require('./models/User'); // Import the User model
const Product = require('./models/Product'); // Import the Product model


// Route handler for fetching products
router.get('/products', async (req, res) => {
    // Fetch products from the database (this will be implemented later)
    try{
        console.log("here")
        const products = await Product.findAll();
        console.log(products);
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching products!' });
    }
});

module.exports = router;