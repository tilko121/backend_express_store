const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

const TransactionType = sequelize.define('TransactionType', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'transaction_types'
});

module.exports = TransactionType;
