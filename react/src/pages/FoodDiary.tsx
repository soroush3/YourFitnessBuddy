import {useEffect, useState} from "react";
import "./FoodDiary.css";

import {
  FoodEntry,
  getFoodEntriesForDate,
  deleteFoodEntry,
  createFoodEntry,
} from "../API";
import DiaryTable from "../components/DiaryTable";

const FoodDiary = () => {
  const [date, setDate] = useState(new Date().toLocaleDateString("en-CA"));
  const [foodEntries, setFoodEntries] = useState<Array<FoodEntry>>([]);

  const getFoodEntries = async () => {
    const entries = await getFoodEntriesForDate(date);
    setFoodEntries(entries);
  };

  const handleCreateEntry = async (foodEntry: FoodEntry) => {
    await createFoodEntry(foodEntry);
    await getFoodEntries();
  };

  const handleDeleteEntry = async (foodEntryId: string) => {
    await deleteFoodEntry(foodEntryId);
    await getFoodEntries();
  };

  useEffect(() => {
    getFoodEntries();
  }, [date]);

  return (
    <div className="wrapper">
      <div className="container">
        <div className="date-input">
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div className="pt-8">
          <DiaryTable
            foodEntries={foodEntries}
            date={date}
            handleCreateEntry={handleCreateEntry}
            handleDeleteEntry={handleDeleteEntry}
          />
        </div>
      </div>
    </div>
  );
};

export default FoodDiary;
