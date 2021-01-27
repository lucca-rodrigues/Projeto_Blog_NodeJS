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

router.get("/edit/:id", (req, res) => {
    var id = req.params.id;
    Articles.findByPk(id).then(article => {
        if(article != undefined){
            Categories.findAll().then(categories => {
                res.render("Pages/Articles/Edit", {categories, article})

            });
        }else{
            res.redirect("/");
        }
    }).catch(err => {
        res.redirect("/");
    });
});

router.post("/update", (req, res) => {
    var id = req.body.id;
    var title = req.body.title;
    var content = req.body.content;
    var category = req.body.category;

    Articles.update({
        title, 
        content, 
        categoryId: category, 
        slug:slugify(title)},{
        where: {id}
    }).then(() => {
        res.redirect("/articles");
    }).catch(err => {
        res.redirect("/");
    });
});

router.post("/delete", (req, res) => {
    var id = req.body.id;

    if(id != undefined){
        if(!isNaN(id)){
            Articles.destroy({where: {id}})
            .then(() => {
                res.redirect("/articles");
            });
        }else{
            res.redirect("/articles");
        }
    }else{
        res.redirect("/articles");
    }
});


module.exports = router;