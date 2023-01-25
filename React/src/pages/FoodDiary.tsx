import { useState } from "react";
import styles from "./FoodDiary.module.css";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function FoodDiary() {
  const [date, setDate] = useState(new Date());

  return (
    <div className={styles.container}>
      <h1 className={styles.mainTitle}>Food Diary</h1>
      <div
        style={{
          textAlign: "center",
          display: "flex",
          alignContent: "center",
          justifyContent: "center",
          margin: 15,
        }}
      >
        <DatePicker
          todayButton="Today"
          popperPlacement="bottom"
          shouldCloseOnSelect={true}
          selected={date}
          onChange={(newDate: Date) => setDate(newDate)}
          customInput={<button>{date.toDateString()}</button>}
        />
      </div>
      <div className={styles.wrapper}>
        <h3>Breakfast</h3>
        <div>
          <button>Add Food</button>
          <button>Quick Tools</button>
        </div>
        {/* {renderFoodEntries("breakfast")} */}
        <hr></hr>
        <h3>Lunch</h3>
        {/* {renderFoodEntries("lunch")} */}
        <hr></hr>
        <h3>Dinner</h3>
        {/* {renderFoodEntries("dinner")} */}
        <hr></hr>
      </div>
      <h2>Add Foods</h2>
      <div className={[styles.wrapper, styles.addFoodsContainer].join(" ")}>
        <div>
          <h3>Food</h3>
          {/* <input
            type="text"
            value={foodInput}
            onChange={handleFoodInputChange}
          /> */}
        </div>
        <div>
          <h3>Description</h3>
          {/* <input
            type="text"
            value={descriptionInput}
            onChange={handleDescriptionInputChange}
          /> */}
        </div>
        <div>
          <h3>Meal</h3>
          {/* <select value={mealDropdown} onChange={handleMealDropdownChange}>
            <option value="">Choose Meal</option>
            <option value="lunch">Breakfast</option>
            <option value="lunch">Lunch</option>
            <option value="dinner">Dinner</option>
          </select> */}
        </div>
        {/* <button className={styles.addButton} onClick={addFood}> */}+
        {/* </button> */}
      </div>
    </div>
  );
}

export default FoodDiary;
