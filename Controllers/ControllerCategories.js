const express = require("express");
const router = express.Router();

router.get("/categories", (req, res) => {
    res.send("Rota de Categorias");
})

router.get("/admin/articles/new", (req, res) => {
    res.send("Rota para criar artigo");
});


module.exports = router;