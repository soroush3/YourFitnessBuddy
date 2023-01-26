import { useState } from "react";
import styles from "./FoodDiary.module.css";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function FoodDiary() {
  const [date, setDate] = useState(new Date());

  return (
    <div className="w-6/12 m-auto pt-8">
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
      <div className="p-6">
        <h1 className="text-xl pb-3">Breakfast</h1>
        <div className="pl-3 space-x-1 inline-flex text-blue-500">
          <button className="text-sm">Add Food</button>
          <div className="text-black text-sm">|</div>
          <button className="text-sm">Quick Tools</button>
        </div>
        {/* {renderFoodEntries("breakfast")} */}
        <hr className="my-3" />
        <h1 className="text-xl pb-3">Lunch</h1>
        <div className="pl-3 space-x-1 inline-flex text-blue-500">
          <button className="text-sm">Add Food</button>
          <div className="text-black text-sm">|</div>
          <button className="text-sm">Quick Tools</button>
        </div>
        {/* {renderFoodEntries("lunch")} */}
        <hr className="my-3" />
        <h1 className="text-xl pb-3">Dinner</h1>
        <div className="pl-3 space-x-1 inline-flex text-blue-500">
          <button className="text-sm">Add Food</button>
          <div className="text-black text-sm">|</div>
          <button className="text-sm">Quick Tools</button>
        </div>
        {/* {renderFoodEntries("dinner")} */}
        <hr className="my-3" />
      </div>
    </div>
  );
}

export default FoodDiary;
