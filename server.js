const express = require("express");
const { connectToDb, getDb } = require("./db");
const app = express();
const cors = require("cors");

app.use(cors());
//app.use(express.json());

let db;

connectToDb((err) => {
  if (!err) {
    app.listen(5000, () => {
      console.log("App listening");
    });
    db = getDb();
  }
});

app.get("/", (req, res) => {
  let recipes = [];
  db.collection("recipes")
    .find()
    .sort({ title: 1 })
    .forEach((recipe) => recipes.push(recipe))
    .then(() => {
      res.status(200).json(recipes);
      console.log("data fetch");
    })
    .catch(() => {
      res.status(500).json({ error: "Could not fetch the documetns" });
    });
});

const recipeRouter = require("./routes/recipes");
const userRouter = require("./routes/users");

app.use("/recipes", recipeRouter);
app.use("/users", userRouter);
