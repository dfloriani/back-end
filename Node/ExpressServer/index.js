// Starting an Express server
import express from "express";
const app = express();
const port = 3000;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})

//res.send for different requests
app.get("/", (req, res) => {
    res.send("<h1>Hello</h1>");
})

app.get("/contact", (req, res) => {
    res.send("<h1>It is a secret.</h1>");
})

app.get("/about", (req, res) => {
    res.send("<h1>I'm a ghost.</h1>");
})