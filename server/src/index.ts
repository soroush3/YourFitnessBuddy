import express from "express";
const app = express();

app.get("/", (req, res) => {
  res.send("hello jesus");
});

app.listen(5001);
