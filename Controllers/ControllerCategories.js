const express = require("express");
const router = express.Router();
const Categories = require("../Models/ModelCategories");
const slugify = require("slugify");

router.get("/new", (req, res) => {
    res.render("Pages/Categories/New", );
})

router.post("/new", (req, res) => {
    const title = req.body.title;

    if(title != undefined){
        Categories.create({title, slug: slugify(title)})
        .then(() => {
            res.redirect("/");
        })
    }else{
        res.redirect("/categories/new");
    }
})



module.exports = router;