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

var topic = "";

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

app.post("/create", (req, res) => {
    console.log(req.body);
    res.send(req.json());
});

app.get("/login", (req, res) => {
    console.log(_dirname + "/public/login.html");
    res.sendFile(_dirname + "/public/login.html");
});

app.get("/flashcards", (req, res) => {
    console.log(_dirname + "/public/flashcards.html");
    res.sendFile(_dirname + "/public/flashcards.html");
});

app.get("/flashcards/:topic", (req, res) => {
    topic = req.params.topic;
    console.log(topic);
    res.sendFile(_dirname + "/public/flashcards.html");
});

app.get("/matching", (req, res) => {
    console.log(_dirname + "/public/matching.html");
    res.sendFile(_dirname + "/public/matching.html");
});

app.get("/matching/:topic", (req, res) => {
    topic = req.params.topic;   
    console.log(topic);
    res.sendFile(_dirname + "/public/matching.html");
});

app.get("/selectGame", (req, res) => {
    console.log(_dirname + "/public/selectGame.html");
    res.sendFile(_dirname + "/public/selectGame.html");
});

// fix logic to get topic from select Topic page

// app.get("/selectGame/:topic", (req, res) => {
//     console.log(_dirname + "/public/selectGame.html");
//     res.sendFile(_dirname + "/public/selectGame.html");
// });

app.post("/submit", (req, res) => {
    console.log(req.body);
});

// let sql;
app.get("/cards", (req, res) => {
    console.log("my new topic: " + topic);
    const sqlGetTopicId = "SELECT tID FROM topics WHERE name = ?";
    
    db.get(sqlGetTopicId, [topic], (err, row) => {
        if (err) {
            console.error("Error fetching topic_id:", err);
            return res.json({ status: 300, success: false, error: err.message });
        }

        if (!row) {
            console.log("No topic found for:", topic);
            return res.json({ status: 300, success: false, error: "Topic not found" });
        }

        const topicId = row.tID; // Get topic_id from the row

        console.log("Found topic_id:", topicId);

        // Now, use the topic_id to get the questions from the questions table
        const sqlGetQuestions = "SELECT * FROM questions WHERE tID = ?";

        db.all(sqlGetQuestions, [topicId], (err, questions) => {
            if (err) {
                console.error("Error fetching questions:", err);
                return res.json({ status: 300, success: false, error: err.message });
            }

            if (questions.length < 1) {
                return res.json({ status: 300, success: false, error: "No questions found" });
            }
          
            return res.json({ status: 200, data: questions, topic: topic, success: true });
        });
    });
});

app.get("/cards/:topic", (req, res) => {
    console.log(req.params.topic);

});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);

});
