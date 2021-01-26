const Sequelize = require("sequelize");

const connection = new Sequelize('projetoblog', 'root', 'Shopboyz1!',{
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection;