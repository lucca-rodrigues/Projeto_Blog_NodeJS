const Sequelize = require("sequelize");

const connection = new Sequelize('databaseName', 'userDatabase', 'Password',{
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection;