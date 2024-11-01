import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
//import bcrypt from bcrypt;
// import anime from 'animejs'
// const routes = require('src/routes/routes');
// const bodyParser = require('body-parser');
const _dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;
// const anime = require('animejs');

// include middleware to process forms (gives the request a body)
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(_dirname + '/public'));
// app.use('/node_modules', express.static(_dirname + '/node_modules'));

app.get("/homepage", (req, res) => {
    console.log(_dirname + "/public/homepage.html");
    res.sendFile(_dirname + "/public/homepage.html");
});

app.get("/login", (req, res) => {
    console.log(_dirname + "/public/login.html");
    res.sendFile(_dirname + "/public/login.html");
});

app.get("/flashcards", (req, res) => {
    console.log(_dirname + "/public/flashcards.html");
    res.sendFile(_dirname + "/public/flashcards.html");
});

app.post("/submit", (req, res) => {
    console.log(req.body);
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);

});
