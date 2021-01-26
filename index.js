const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./Database/connection");

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

app.get("/", (req, res) => {
    res.send("Bem vindo!");
})

app.listen(8080, () => {
    console.log("Server starter in port 8080 ✅");
})