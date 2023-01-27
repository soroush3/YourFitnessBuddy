import mongoose from "mongoose";

const Schema = mongoose.Schema;

// for macro nutrients
const minNumber = {
  count: {
    type: Number,
    min: 0,
    default: 0,
  },
  unit: {
    type: String,
    default: "gram",
  },
};

const FoodEntrySchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  meal: {
    type: String,
    enum: ["breakfast", "lunch", "dinner"],
    default: "breakfast",
    required: true,
  },
  calories: {
    count: {
      type: Number,
      min: 0,
      default: 0,
    },
    unit: {
      type: String,
      default: "kcal",
    },
  },
  fat: minNumber, // in grams
  carbs: minNumber, // in grams
  protein: minNumber, // in grams
  date: { type: Date, default: new Date(), required: true },
});

const FoodEntry = mongoose.model("FoodEntry", FoodEntrySchema);

export default FoodEntry;
