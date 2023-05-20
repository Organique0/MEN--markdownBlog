const express = require("express");
import { Request, Response } from "express";
const articleRouter = require("./routes/articles");
const Article = require("./models/article");
const methodOverride = require("method-override");
require("dotenv").config();
const app = express();

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

app.use(methodOverride("_method"));

app.use("/articles", articleRouter);

app.get("/", async (req: Request, res: Response) => {
  try {
    const articles = await Article.find().sort({ createdAt: "desc" });
    res.render("articles/index", { articles });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

export default app;
