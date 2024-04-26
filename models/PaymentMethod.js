const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

const PaymentMethod = sequelize.define('PaymentMethod', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    method: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'payment_methods'
});

module.exports = PaymentMethod;
