const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true // Ensuring username is unique
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true // Ensuring email is unique
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.STRING,
        defaultValue: 'user',  // Default role
    },
    last_login: {
        type: DataTypes.DATE,
        allowNull: true, // Nullable to accommodate users who haven't logged in yet
    }
}, {
    tableName: 'users',
    timestamps: true, // This ensures createdAt and updatedAt are managed by Sequelize
});

module.exports = User;