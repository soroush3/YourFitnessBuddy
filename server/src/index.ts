import express, { Request, Response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import { config } from "dotenv";
import FoodEntry from "./models/FoodEntry";

config();
const origins = process.env.ORIGINS!.split(" ");
origins.forEach((item) => console.warn(item));
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: origins,
  })
);

const PORT = process.env.PORT || 5001;

mongoose.set("strictQuery", false);
// connect to mongo db then listen to port
mongoose.connect(process.env.MONGO_URL!).then(() => {
  console.log("Successfully connected to DB");
  app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
  });
});

app.get("/hello", (req: Request, res: Response) => {
  res.send("hello dude");
});

app.post("/foodEntry", async (req: Request, res: Response) => {
  console.log(req.body);
  const newFoodEntry = new FoodEntry({
    title: "Some New Entry",
    meal: "breakfast",
    date: Date.now(),
    calories: {
      count: 50,
      unit: "kcal",
    },
  });
  const createdFoodEntry = await newFoodEntry.save();
  res.json(createdFoodEntry);
});
