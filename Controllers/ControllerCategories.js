const express = require("express");
const router = express.Router();
const Categories = require("../Models/ModelCategories");
const slugify = require("slugify");

router.get("/new", (req, res) => {
    res.render("Pages/Categories/New", );
})

router.get("/", (req, res) => {
    Categories.findAll()
    .then(categories => {
        res.render("Pages/Categories/AllCategories", {categories});
    })
})

router.post("/new", (req, res) => {
    const title = req.body.title;

    if(title != undefined){
        Categories.create({title, slug: slugify(title)})
        .then(() => {
            res.redirect("/categories");
        })
    }else{
        res.redirect("/categories/new");
    }
})

router.post("/delete", (req, res) => {
    const id = req.body.id;
    if(id != undefined){
        if(!isNaN(id)){
            Categories.destroy({where: {id}})
            .then(() => {
                res.redirect("/categories")
            })
        }
    }
    else{
        res.redirect("/categories");
    }
    
})



module.exports = router;