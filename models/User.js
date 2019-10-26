const Sequelize = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize({
    database: process.env.DB,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    dialect: 'mysql'
});

const User = sequelize.define('user', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    gender: {
        type: Sequelize.STRING
    },
    birthdate: {
        type: Sequelize.DATE,
        allowNull: false
    },
    address: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

// Test the database connection
sequelize
    .authenticate()
    .then(() => console.log('database connected!'))
    .catch(err => console.log('something went wrong, please check your database connection', err));

// Test the table creation
User.sync()
    .then(() => console.log('user table created successfully'))
    .catch(err => console.log('unable to create the user table', err));

module.exports = User;
