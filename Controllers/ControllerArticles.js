const express = require("express");
const router = express.Router();
const Articles = require("../Models/ModelArticles");
const Categories = require("../Models/ModelCategories");

router.get("/", (req, res) => {
    Articles.findAll({
        include: [{model: Categories}]
    }).then(articles => {
        res.render("Pages/Articles/AllArticles",{articles: articles})
    });
});
router.get("/new", (req, res) => {
    Categories.findAll()
    .then(categories => {
        res.render("Pages/Articles/New", {categories})
    });
})

module.exports = router;