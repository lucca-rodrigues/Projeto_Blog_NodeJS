const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./Database/connection");

// Controllers
const ControllerCategories = require("./Controllers/ControllerCategories");
const ControllerArticles = require("./Controllers/ControllerArticles");

// Models
const ModelCategories = require("./Models/ModelCategories");
const ModelArticles = require("./Models/ModelArticles");

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

connection.authenticate()
    .then(() => {
        console.log("Database connection Successfuly!");
    }).catch((error) =>{
        console.log(error);
    });

app.use("/categories", ControllerCategories);
app.use("/articles", ControllerArticles);


// ARTICLES
app.get("/", (req, res) => {
    ModelArticles.findAll({
        order:[
            ['id','DESC']
        ],
        limit: 4
    }).then(articles => {
        ModelCategories.findAll().then(categories => {
            res.render("Pages/Home/index", {articles, categories});
        });
    });
});


app.get("/:slug",(req, res) => {
    var slug = req.params.slug;

    ModelArticles.findOne({where: {slug}
    }).then(article => {
        if(article != undefined){
            ModelCategories.findAll().then(categories => {
                res.render("Pages/Articles/Details", {article, categories});
            });
        }else{
            res.redirect("/");
        }
    }).catch( err => {
        res.redirect("/");
    });
})


app.listen(8080, () => {
    console.log("Server starter in port 8080 ✅");
})