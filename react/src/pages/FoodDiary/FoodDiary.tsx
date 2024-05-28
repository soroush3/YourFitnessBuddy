import {useEffect, useMemo, useState} from "react";
import "./FoodDiary.css";

import {
  FoodEntry,
  getFoodEntriesForDate,
  deleteFoodEntry,
  createFoodEntry,
} from "../../API";
import DiaryTable from "../../components/DiaryTable/DiaryTable";
import DateInput from "../../components/DateInput/DateInput";
import BarChart from "../../components/charts/bar-chart/BarChart";

function FoodDiary() {
  const [date, setDate] = useState(new Date().toLocaleDateString("en-CA"));
  const [foodEntries, setFoodEntries] = useState<Array<FoodEntry>>([]);

  useEffect(() => {
    getFoodEntries();
  }, [date]);

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

  const {totalCalories, totalFat, totalCarbs, totalProtein} = useMemo(() => {
    let totalCalories = 0,
      totalFat = 0,
      totalCarbs = 0,
      totalProtein = 0;

    for (const foodEntry of foodEntries) {
      const {calories, fat, carbs, protein} = foodEntry;
      totalCalories += calories.count;
      totalFat += fat.count;
      totalCarbs += carbs.count;
      totalProtein += protein.count;
    }

    return {totalCalories, totalFat, totalCarbs, totalProtein};
  }, [foodEntries]);

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

        <div className="side-container">
          <p className="text-center">
            Total Calories: <b className="purp-text">{totalCalories}</b>
          </p>

          <hr />

          <BarChart
            data={[
              {color: "blueviolet", value: totalFat},
              {color: "orange", value: totalCarbs},
              {color: "rgb(67, 67, 233)", value: totalProtein},
            ]}
          />
          <div className="flex center margin-top col-gap">
            <div style={{color: "blueviolet"}}>
              Fat: <b>{totalFat}</b>
            </div>
            <div style={{color: "orange"}}>
              Carbs: <b>{totalCarbs}</b>
            </div>
            <div style={{color: "rgb(67, 67, 233)"}}>
              Protein: <b>{totalProtein}</b>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FoodDiary;
