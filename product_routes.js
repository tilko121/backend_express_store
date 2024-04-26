// routes.js
const express = require('express');
const router = express.Router();

const Product = require('./models/Product'); // Import the Product model

router.get('/', async (req, res) => {
    // Fetch products from the database (this will be implemented later)
    try{
        const products = await Product.findAll();
        console.log(products);
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching products!' });
    }
});

router.get('/id/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching product!' });
    }
});

router.get('sku/:sku', async (req, res) => {
    const sku = req.params.sku;
    try {
        const product = await Product.findOne({
            where: {
                sku: sku
            }
        });
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching product!' });
    }
});

router.get('/category/:categoryId', async (req, res) => {
    const categoryId = req.params.categoryId;
    try {
        const products = await Product.findAll({
            where: {
                categoryId: categoryId
            }
        });
        if (!products) {
            return res.status(404).json({ error: 'Products not found' });
        }
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching products!' });
    }
});

router.get('/status/:statusId', async (req, res) => {
    const statusId = req.params.statusId;
    try {
        const products = await Product.findAll({
            where: {
                statusId: statusId
            }
        });
        if (!products) {
            return res.status(404).json({ error: 'Products not found' });
        }
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching products!' });
    }
});

router.post('/add', async (req, res) => {
    const { name, price, stockAmount, reservedAmount, description, sku, expirationDate, categoryId, imageUrl, statusId } = req.body;
    try {
        const product = await Product.create({
            name,
            price,
            stockAmount,
            reservedAmount,
            description,
            sku,
            expirationDate,
            categoryId,
            imageUrl,
            statusId
        });
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: 'Error adding product!' });
    }
});



module.exports = router;


/*
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    stockAmount: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    reservedAmount: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    sku: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: true,
    },
    expirationDate: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    categoryId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'product_categories', // This references the table name
            key: 'id', // This is the column name of the referenced model
        }
    },
    imageUrl: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    statusId: {
        type: DataTypes.INTEGER,
        references: {
            model: ProductStatus, // This is a reference to another model
            key: 'id', // This is the column name of the referenced model
        }
    },

*/