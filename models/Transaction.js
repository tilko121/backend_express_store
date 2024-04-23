// models/Transaction.js

const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

const Transaction = sequelize.define('Transaction', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
},{
    tableName: 'transactions',
});

module.exports = Transaction;