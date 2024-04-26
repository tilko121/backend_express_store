const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

const ProductStatus = sequelize.define('ProductStatus', {
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
    tableName: 'product_statuses'
});

module.exports = ProductStatus;
