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
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'users',
            key: 'id',
        }
    },
    typeId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'transaction_types',
            key: 'id'
        }
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    statusId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'transaction_statuses',
            key: 'id'
        }
    },
    currencyId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'currencies',
            key: 'id'
        }
    },
    paymentMethodId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'payment_methods',
            key: 'id'
        }
    },
    referenceNumber: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    merchantId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'merchants',
            key: 'id'
        }
    },
    ipAddress: {
        type: DataTypes.STRING,
        allowNull: true,
    }
}, {
    tableName: 'transactions'
});

module.exports = Transaction;
