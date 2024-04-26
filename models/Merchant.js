const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

const Merchant = sequelize.define('Merchant', {
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
    tableName: 'merchants'
});

module.exports = Merchant;
