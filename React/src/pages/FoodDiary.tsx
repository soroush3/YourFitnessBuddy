import { useState } from "react";
import QuickAddModal from "../components/QuickAddModal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const MEAL_TYPES = ["Breakfast", "Lunch", "Dinner"];

const FoodDiary = () => {
  const [date, setDate] = useState(new Date());
  const [isModalShown, setIsModalShown] = useState(false);

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
        {MEAL_TYPES.map((type) => {
          return (
            <div key={type}>
              <h1 className="text-xl pb-3">{type}</h1>
              <div className="pl-3 space-x-1 inline-flex text-blue-500">
                <button className="text-sm">Add Food</button>
                <div className="text-black text-sm">|</div>
                <QuickAddModal mealType={type}></QuickAddModal>
              </div>
              <hr className="my-3" />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FoodDiary;
