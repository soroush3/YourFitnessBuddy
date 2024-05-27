import {useEffect, useState} from "react";
import "./FoodDiary.css";

import {
  FoodEntry,
  getFoodEntriesForDate,
  deleteFoodEntry,
  createFoodEntry,
} from "../../API";
import DiaryTable from "../../components/DiaryTable/DiaryTable";
import DateInput from "../../components/DateInput/DateInput";

function FoodDiary() {
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
      <DateInput date={date} handleDateChange={(newDate) => setDate(newDate)} />
      <div className="main-content">
        <div className="main-container">
          <DiaryTable
            foodEntries={foodEntries}
            date={date}
            handleCreateEntry={handleCreateEntry}
            handleDeleteEntry={handleDeleteEntry}
          />
        </div>

        <div className="side-container">hello</div>
      </div>
    </div>
  );
}

export default FoodDiary;
