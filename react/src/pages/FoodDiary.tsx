import { useEffect, useState } from "react";
import QuickAddModal from "../components/QuickAddModal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { FoodEntry, getFoodEntriesForDate } from "../API";

const FoodDiary = () => {
  const [date, setDate] = useState(new Date());
  const [foodEntries, setFoodEntries] = useState(Array<FoodEntry>);

  const getFoodEntries = async () => {
    const entries = await getFoodEntriesForDate(date);
    setFoodEntries(entries);
  };

  useEffect(() => {
    getFoodEntries();
  }, [date]);

  return (
    <div className="max-w-[800px] m-auto pt-8">
      <h1 className="text-2xl">Food Diary</h1>
      <div className="text-center flex p-3">
        <DatePicker
          todayButton="Today"
          popperPlacement="bottom"
          shouldCloseOnSelect={true}
          selected={date}
          onChange={(newDate: Date) => setDate(newDate)}
          customInput={
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              {date.toDateString()}
            </button>
          }
        />
      </div>
      <div className="pt-8">
        <table width={"100%"}>
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
            <tr className="leading-4">
              <td className="text-xl block mb-5">Breakfast</td>
              {/* Table headers (Calories, Fat, Carbs, Protein) */}
              <td className=" bg-blue-500 text-center border-r-[1px] rounded-md text-white min-w-[12px]">
                <div className="font-semibold">Calories</div>
                <div className="opacity-75">kcal</div>
              </td>
              <td className="bg-blue-500 text-center border-r-[1px] rounded-md text-white">
                <div className="font-semibold">Fat</div>
                <div className="opacity-75">g</div>
              </td>
              <td className="bg-blue-500 text-center border-r-[1px] rounded-md text-white">
                <div className="font-semibold">Carbs</div>
                <div className="opacity-75">g</div>
              </td>
              <td className="bg-blue-500 text-center rounded-md text-white">
                <div className="font-semibold">Protein</div>
                <div className="opacity-75">g</div>
              </td>
            </tr>
            {foodEntries.map((entry: FoodEntry) => {
              if (entry.meal == "breakfast") {
                return (
                  <tr className="bg-slate-200" key={entry._id}>
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
                      <button className="block m-auto">
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
            <tr className="border-b-2">
              <td className="pl-3 space-x-2 text-blue-500">
                <button className="text-sm">Add Food</button>
                <span className="border-r-[1px] border-blue-500 border-solid text-sm" />
                <QuickAddModal
                  mealType={"breakfast"}
                  date={date}
                  getFoodEntries={getFoodEntries}
                ></QuickAddModal>
              </td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>

            <tr>
              <td className="text-xl block mt-5 mb-5">Lunch</td>
            </tr>
            {foodEntries.map((entry: FoodEntry) => {
              if (entry.meal == "lunch") {
                return (
                  <tr className="bg-slate-200" key={entry._id}>
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
                      <button className="block m-auto">
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
            <tr className="border-b-2">
              <td className="pl-3 space-x-2 text-blue-500">
                <button className="text-sm">Add Food</button>
                <span className="border-r-[1px] border-blue-500 border-solid text-sm" />
                <QuickAddModal
                  mealType={"Lunch"}
                  date={date}
                  getFoodEntries={getFoodEntries}
                ></QuickAddModal>
              </td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FoodDiary;
