// sequelize.js
const { Sequelize, QueryTypes, Op } = require('sequelize');

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD, {
        host: process.env.DB_HOST,
        dialect: 'mysql',
        dialectOptions: {
            // Specify the authentication plugin if required by your MySQL server
            authPlugins: {
                mysql_clear_password: () => () => Buffer.from(process.env.DB_PASSWORD)
            }
        },
        port: process.env.DB_PORT,
        logging: console.log // Consider turning off logging or adjusting it based on the environment
    }
);

// Log SQL queries
sequelize.query('SET GLOBAL general_log = 1;', { type: QueryTypes.RAW });

module.exports = sequelize;