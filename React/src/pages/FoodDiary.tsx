import styles from "./FoodDiary.module.css";

function FoodDiary() {
  return (
    <div className={styles.container}>
      <h1 className={styles.mainTitle}>Food Diary</h1>
      <h2>Food Diary For: </h2>
      <div className={styles.wrapper}>
        <h3>Breakfast</h3>
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
