const express = require("express");
const router = express.Router();
const Categories = require("../Models/ModelCategories");
const slugify = require("slugify");

router.get("/new", (req, res) => {
  res.render("Pages/Categories/New");
});

router.get("/", (req, res) => {
  Categories.findAll().then((categories) => {
    res.render("Pages/Categories/AllCategories", { categories });
  });
});

router.get("/edit/:id", (req, res) => {
  const id = req.params.id;

  if (isNaN(id)) {
    res.redirect("/categories"); // Se não é um número então redireciona (evita que seja passado textos)
  }
  Categories.findByPk(id)
    .then((categories) => {
      if (categories != undefined) {
        res.render("Pages/Categories/Edit", { categories });
      } else {
        res.redirect("/categories");
      }
    })
    .catch((error) => {
      console.log(error);
      res.redirect("/categories");
    });
});

router.post("/new", (req, res) => {
  const title = req.body.title;

  if (title != undefined) {
    Categories.create({ title, slug: slugify(title) }).then(() => {
      res.redirect("/categories");
    });
  } else {
    res.redirect("/categories/new");
  }
});

router.post("/update", (req, res) => {
    var id = req.body.id;
    var title = req.body.title;

    Categories.update({title, slug: slugify(title)},{ where: {id}
    }).then(() => {
        res.redirect("/categories");    
    });
});

router.post("/delete", (req, res) => {
  const id = req.body.id;
  if (id != undefined) {
    if (!isNaN(id)) {
      Categories.destroy({ where: { id } }).then(() => {
        res.redirect("/categories");
      });
    }
  } else {
    res.redirect("/categories");
  }
});

module.exports = router;
