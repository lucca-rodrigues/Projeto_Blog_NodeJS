const express = require("express");
const router = express.Router();
const Articles = require("../Models/ModelArticles");
const Categories = require("../Models/ModelCategories");
const slugify = require("slugify");

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

router.post("/new", (req, res) => {
    const {title, content, category} = req.body;
    
    Articles.create({
        title,
        slug: slugify(title),
        content,
        categoryId: category
    }).then(() => {
        res.redirect("/articles");
    });
});


module.exports = router;