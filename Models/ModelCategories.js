const Sequelize = require("sequelize");
const connection = require("../Database/connection");

const Categories = connection.define("categories", {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    }, slug: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

Categories.sync({force: true}); // Atualiza a tabela

module.exports = Categories;