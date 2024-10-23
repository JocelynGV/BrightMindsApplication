import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
const _dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;
const anime = require('animejs');

app.get("/", (req, res) => {
    console.log(_dirname + "/public/index.html");
    res.sendFile(_dirname + "/public/index.html");
});

app.get("/login", (req, res) => {
    console.log(_dirname + "/public/login.html");
    res.sendFile(_dirname + "/public/login.html");
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);

});
