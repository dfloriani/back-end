import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { v4 as uuidv4 } from 'uuid';
import methodOverride from "method-override";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;
let title = "";
let blogText = "";
let posts = [];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + "/public"));

app.use(methodOverride('_method'));

function createPost(req, res, next) {
    title = req.body["title"];
    blogText = req.body["blogText"];
  next();
}

app.use(createPost);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });

app.get("/", (req, res) => {
    res.render("index.ejs")
  });

app.post("/submit", (req, res) => {
  const post = {
    id: uuidv4(), // Unique identifier
    title: req.body.title,
    blogText: req.body.blogText
  };
  posts.push(post);
  const title = post.title;
  res.render("congrats.ejs", {title: title})
});

app.get("/blog-posts", (req, res) => {
  console.log(posts)
  res.render("blog-posts.ejs", { posts: posts});
});

app.get('/blog-posts/:id', (req, res) => {
  const post = posts.find(p => p.id === req.params.id);
  if (post) {
    res.render("postComplete.ejs", { post: post });
  }
  else {
    res.status(404).send('Post not found');
  }
});

app.delete('/delete/:id', (req, res) => {
  const postIndex = posts.find(p => p.id === req.params.id);
  if (postIndex !== -1) {
      const post = posts.splice(postIndex, 1)[0]; // Remove post from array
      res.render("delete.ejs", { title: post.title });
  } else {
    res.status(404).send('Post not found');
  }
});

app.get("/edit/:id", (req, res) => {
  const post = posts.find(p => p.id === req.params.id);
  res.render("edit.ejs", { post: post });
});

app.put('/edit/:id', (req, res) => {
  const post = posts.find(p => p.id === req.params.id);
  if (post) {
    post.title = req.body.title;
    post.blogText = req.body.blogText;
    const title = post.title;
    res.render("congrats.ejs", { title: title });
  } else {
    res.status(404).send('Post not found');
  }
});

app.get('/congrats', (req, res) => {
  const title = req.query.title;
  res.render('/congrats/', { title: title });
});
