import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views')

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

app.use(express.static(__dirname + "/public"));

app.get("/about", (req, res) => {
  res.render("about.ejs");
});

app.get("/contact", (req, res) => {
  res.render("contact.ejs");
});

app.get("/", (req, res) => {
  res.render("index.ejs")
});
