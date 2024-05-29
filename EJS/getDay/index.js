import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

app.get("/", (req, res) => {
    const today = new Date();
    let day = today.getDay();

    let type = "a weekend"
    let adv = "time to work hard"

    res.render("index.ejs", {dayType: type,
    advice: adv })

    if (day === 0 || day === 6) {
        let type = "the weekend"
        let adv = "time to rest."
    }
});