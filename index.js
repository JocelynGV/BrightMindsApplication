import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
import sqlite3 from 'sqlite3';

//import bcrypt from bcrypt;
// import anime from 'animejs'
// const routes = require('src/routes/routes');
// const bodyParser = require('body-parser');
const _dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;
// const anime = require('animejs');


// Open a database connection using the Database constructor
const db = new sqlite3.Database('public/js/my-database.db', (err) => {
    if (err) {
        console.error('Error opening database ' + err.message);
    } else {
        console.log('Connected to the SQLite database.');
    }
});

// include middleware to process forms (gives the request a body)
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(_dirname + '/public'));
// app.use('/node_modules', express.static(_dirname + '/node_modules'));

app.get("/homepage", (req, res) => {
    console.log(_dirname + "/public/homepage.html");
    res.sendFile(_dirname + "/public/homepage.html");
});

app.get("/create", (req, res) => {
    console.log(_dirname + "/public/create.html");
    res.sendFile(_dirname + "/public/create.html");
});

app.get("/login", (req, res) => {
    console.log(_dirname + "/public/login.html");
    res.sendFile(_dirname + "/public/login.html");
});

app.get("/flashcards", (req, res) => {
    console.log(_dirname + "/public/flashcards.html");
    res.sendFile(_dirname + "/public/flashcards.html");
});

app.get("/matching", (req, res) => {
    console.log(_dirname + "/public/matching.html");
    res.sendFile(_dirname + "/public/matching.html");
});

app.get("/selectGame", (req, res) => {
    console.log(_dirname + "/public/selectGame.html");
    res.sendFile(_dirname + "/public/selectGame.html");
});

app.post("/submit", (req, res) => {
    console.log(req.body);
});

let sql;
app.get("/cards", (req, res) => {
    sql = "SELECT * FROM subjects";
    try {
        db.all(sql, [], (err, rows) => {
            if (err) return res.json({ status: 300, success: false, error: err });
            
            if (rows.length < 1) 
                return res.json({ status: 300, success: false, error: "No Match" });

            return res.json({ status:200, data: rows, success: true });
            
        });
    } catch (error) {
        return res.json({
            status: 400,
            success:false
        });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);

});
