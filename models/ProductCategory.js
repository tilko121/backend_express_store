const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

const ProductCategory = sequelize.define('ProductCategory', {
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
    tableName: 'product_categories'
});

module.exports = ProductCategory;