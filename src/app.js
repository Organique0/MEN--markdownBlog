const express = require("express");
const app = express(); // Change this to "app" if you prefer to use "app" consistently

const articleRouter = require("./routes/articles");
const Article = require("./models/article");
const methodOverride = require("method-override");
require("dotenv").config();

const path = require("path");

app.set("views", path.join(__dirname, "views"));

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

app.use(methodOverride("_method"));

app.use("/articles", articleRouter);

app.get("/", async (req, res) => {
  try {
    const articles = await Article.find().sort({ createdAt: "desc" });
    res.render("articles/index", { articles });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = app;
