// routes.js
const express = require('express');
const router = express.Router();


const Transaction = require('./models/Transaction'); // Import the Transaction model

router.get('/', async (req, res) => {
    // Fetch transactions from the database (this will be implemented later)
    try {
        const transactions = await Transaction.findAll();
        res.json(transactions);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching transactions!' });
    }
});

router.get('/userId/:userId', async (req, res) => {
    const userId = req.params.userId;
    try {
        const transactions = await Transaction.findAll({
            where: {
                userId: userId
            }
        });
        if (!transactions) {
            return res.status(404).json({ error: 'Transactions not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error fetching transactions!' });
    }
});

router.get('/type/:typeId', async (req, res) => {
    const typeId = req.params.typeId;
    try {
        const transactions = await Transaction.findAll({
            where: {
                typeId: typeId
            }
        });
        if (!transactions) {
            return res.status(404).json({ error: 'Transactions not found' });
        
        }
    } catch (error) {
        res.status(500).json({ error: 'Error fetching transactions!' });
    }
});

router.get('/status/:statusId', async (req, res) => {
    const statusId = req.params.statusId;
    try {
        const transactions = await Transaction.findAll({
            where: {
                statusId: statusId
            }
        });
        if (!transactions) {
            return res.status(404).json({ error: 'Transactions not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error fetching transactions!' });
    }
});

router.get('/currency/:currencyId', async (req, res) => {
    const currencyId = req.params.currencyId;
    try {
        const transactions = await Transaction.findAll({
            where: {
                currencyId: currencyId
            }
        });
        if (!transactions) {
            return res.status(404).json({ error: 'Transactions not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error fetching transactions!' });
    }
});

router.get('/paymentMethod/:paymentMethodId', async (req, res) => {
    const paymentMethodId = req.params.paymentMethodId;
    try {
        const transactions = await Transaction.findAll({
            where: {
                paymentMethodId: paymentMethodId
            }
        });
        if (!transactions) {
            return res.status(404).json({ error: 'Transactions not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error fetching transactions!' });
    }
});

router.get('/merchantId/:merchantId', async (req, res) => {
    const merchantId = req.params.merchantId;
    try {
        const transactions = await Transaction.findAll({
            where: {
                merchantId: merchantId
            }
        });
        if (!transactions) {
            return res.status(404).json({ error: 'Transactions not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error fetching transactions!' });
    }
});

router.post('/add', async (req, res) => {
    const { userId, typeId, statusId, currencyId, paymentMethodId, merchantId, amount, description } = req.body;
    try {
        const transaction = await Transaction.create({
            userId: userId,
            typeId: typeId,
            statusId: statusId,
            currencyId: currencyId,
            paymentMethodId: paymentMethodId,
            merchantId: merchantId,
            amount: amount,
            description: description
        });
        res.json(transaction);
    } catch (error) {
        res.status(500).json({ error: 'Error adding transaction!' });
    }
});

module.exports = router;