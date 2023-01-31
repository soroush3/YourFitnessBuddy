import express, { Request, Response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import { config } from "dotenv";
import FoodEntry from "./models/FoodEntry";

config();
const origins = process.env.ORIGINS!.split(" ");
const app = express();
app.use(morgan("common"));
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

/**
 * Retrieves all food entries for a given day considering the timezone of the client
 */
app.get("/foodEntries/:date/:timeZone", async (req: Request, res: Response) => {
  const startDate = new Date(req.params.date);
  const timeZone = req.params.timeZone;
  startDate.setHours(0, 0, 0); // Set hours, minutes and seconds
  const followingDay = new Date(startDate.getTime() + 86400000); // add 24 hours
  // en-CA gives the string as "yyyy-mm-dd", provide it the timeZone just incase
  const startDateString = startDate.toLocaleDateString("en-CA", {
    timeZone: timeZone,
  });
  const followingDateString = followingDay.toLocaleDateString("en-CA", {
    timeZone: timeZone,
  });
  const foodEntries = await FoodEntry.aggregate([
    {
      $project: {
        title: "$title",
        calories: "$calories",
        fat: "$fat",
        carbs: "$carbs",
        protein: "$protein",
        meal: "$meal",
        date: {
          // convert the UTC Dates within the db to string format considering timezone
          $dateToString: {
            format: "%Y-%m-%d",
            date: "$date",
            timezone: timeZone,
          },
        },
      },
    },
    {
      // find the entries for the given day
      $match: {
        date: { $gte: startDateString, $lt: followingDateString },
      },
    },
  ]);
  res.json(foodEntries);
});

app.post("/foodEntry", async (req: Request, res: Response) => {
  const newFoodEntry = new FoodEntry(req.body);
  const createdFoodEntry = await newFoodEntry.save();
  res.json(createdFoodEntry);
});

app.delete("/foodEntry/:foodEntryId", async (req: Request, res: Response) => {
  const foodEntryId = req.params.foodEntryId;
  const foodEntry = await FoodEntry.findByIdAndDelete(foodEntryId);
  res.json(foodEntry);
});
