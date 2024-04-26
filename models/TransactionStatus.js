const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

const TransactionStatus = sequelize.define('TransactionStatus', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'transaction_statuses'
});

module.exports = TransactionStatus;
