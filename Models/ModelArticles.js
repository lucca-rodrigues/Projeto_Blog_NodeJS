const Sequelize = require("sequelize");
const connection = require("../Database/connection");
const Category = require("../Models/ModelCategories");

const Articles = connection.define("articles", {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    }, slug: {
        type: Sequelize.STRING,
        allowNull: false
    },
    content:{
        type: Sequelize.TEXT,
        allowNull: false
    }
});

Category.hasMany(Articles); // uma categoria tem muitos artigos
Articles.belongsTo(Category); // Um artigo pertence a uma categoria

//Articles.sync({force: true}); // Cria a tabela quando o projeto é executado
module.exports = Articles;