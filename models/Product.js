const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');
const ProductStatus = require('./ProductStatus');
const ProductCategory = require('./ProductCategory');

const Product = sequelize.define('Product', {
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
}, {
    tableName: 'products'
});

Product.belongsTo(ProductStatus, { foreignKey: 'statusId' });

module.exports = Product;
