import {useEffect, useState} from "react";
import QuickAddModal from "../components/QuickAddModal";
import "./FoodDiary.css";

import {FoodEntry, getFoodEntriesForDate, deleteFoodEntry} from "../API";
import {Fragment} from "react";

const MEAL_TYPES = ["Breakfast", "Lunch", "Dinner"];

const FoodDiary = () => {
  const [date, setDate] = useState(new Date().toLocaleDateString("en-CA"));
  const [foodEntries, setFoodEntries] = useState<Array<FoodEntry>>([]);

  const getFoodEntries = async () => {
    const entries = await getFoodEntriesForDate(date);
    setFoodEntries(entries);
  };

  const handleDeleteEntry = async (foodEntryId: string) => {
    console.log(foodEntryId);
    await deleteFoodEntry(foodEntryId);
    getFoodEntries();
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
          <table className="leading-relaxed" width={"100%"}>
            <colgroup>
              <col width={400} />
              <col width={50} />
              <col width={50} />
              <col width={50} />
              <col width={50} />
              <col width={25} />
              <col />
            </colgroup>
            <tbody>
              {MEAL_TYPES.map((mealType: string) => {
                // calories, fat, carbs, protein, number of entries for meal type
                const totals = {
                  calories: 0,
                  fat: 0,
                  carbs: 0,
                  protein: 0,
                  count: 0,
                };
                return (
                  <Fragment key={mealType}>
                    <tr className="leading-4">
                      <td
                        className={
                          "text-2xl block mb-3" +
                          (mealType != "Breakfast" ? " mt-5" : "")
                        }
                      >
                        {mealType}
                      </td>
                      {mealType == "Breakfast" ? (
                        // Table headers only for Breakfast row (Calories, Fat, Carbs, Protein)
                        <>
                          <td className=" bg-blue-600 text-center border-r-[1px] rounded-md text-white min-w-[12px]">
                            <div className="font-semibold">Calories</div>
                            <div className="opacity-75">kcal</div>
                          </td>
                          <td className="bg-blue-600 text-center border-r-[1px] rounded-md text-white">
                            <div className="font-semibold">Fat</div>
                            <div className="opacity-75">g</div>
                          </td>
                          <td className="bg-blue-600 text-center border-r-[1px] rounded-md text-white">
                            <div className="font-semibold">Carbs</div>
                            <div className="opacity-75">g</div>
                          </td>
                          <td className="bg-blue-600 text-center rounded-md text-white">
                            <div className="font-semibold">Protein</div>
                            <div className="opacity-75">g</div>
                          </td>
                        </>
                      ) : null}
                    </tr>
                    {foodEntries.map((entry: FoodEntry) => {
                      if (entry.meal == mealType.toLowerCase()) {
                        totals.calories += entry.calories.count;
                        totals.fat += entry.fat.count;
                        totals.carbs += entry.carbs.count;
                        totals.protein += entry.protein.count;
                        ++totals.count;
                        return (
                          <tr
                            className="bg-slate-200 border-b-[1px] border-b-white"
                            key={entry._id}
                          >
                            <td className="pl-3 border-r-[1px] border-white">
                              {entry.title}
                            </td>
                            <td className="text-center border-r-[1px] border-white">
                              {entry.calories.count}
                            </td>
                            <td className="text-center border-r-[1px] border-white">
                              {entry.fat.count}
                            </td>
                            <td className="text-center border-r-[1px] border-white">
                              {entry.carbs.count}
                            </td>
                            <td className="text-center border-r-[1px] border-white">
                              {entry.protein.count}
                            </td>
                            <td className="text-center">
                              {/* Delete entry button */}
                              <button
                                className="block m-auto"
                                onClick={() => handleDeleteEntry(entry._id!)}
                              >
                                <svg
                                  className="w-5 h-5 hover:fill-rose-400"
                                  fill="red"
                                  viewBox="0 0 20 20"
                                >
                                  <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 
                                    1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                  ></path>
                                </svg>
                              </button>
                            </td>
                          </tr>
                        );
                      }
                    })}
                    <tr className="border-b-[1px]">
                      <td className="pl-3 space-x-2 text-blue-600">
                        <button className="text-sm hover:text-blue-400">
                          Add Food
                        </button>
                        <span className="border-r-[1px] border-blue-600 border-solid text-sm" />
                        <QuickAddModal
                          mealType={mealType}
                          date={date}
                          getFoodEntries={getFoodEntries}
                        ></QuickAddModal>
                      </td>
                      {totals.count != 0 ? (
                        <>
                          <td className="text-center text-blue-600">
                            {totals.calories}
                          </td>
                          <td className="text-center text-blue-600">
                            {totals.fat}
                          </td>
                          <td className="text-center text-blue-600">
                            {totals.carbs}
                          </td>
                          <td className="text-center text-blue-600">
                            {totals.protein}
                          </td>
                        </>
                      ) : null}
                    </tr>
                  </Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FoodDiary;
