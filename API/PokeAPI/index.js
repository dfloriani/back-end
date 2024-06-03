import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://pokeapi.co/api/v2/pokemon/"
const SPRITES_BASE_URL = "https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/"

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index.ejs");
});

function randomNum() {
    let num = Math.floor(Math.random() * 100);
    return num;
}

app.get("/pokemon", async (req, res) => {
    let random = randomNum();
    try {
        const result = await axios.get(API_URL + random);
        const spriteUrl = SPRITES_BASE_URL + random + ".svg"
        res.render("pokemon.ejs", { content: result.data, spriteUrl: spriteUrl });
      } catch (error) {
        res.status(404).send(error.message);
      }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });