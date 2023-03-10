import { useState } from "react";
import { createFoodEntry, FoodEntry } from "../API";

type Props = {
  mealType: string;
  date: Date;
  getFoodEntries: () => Promise<void>;
};

const INPUT_MACROS = [
  { type: "Calories", unit: "kcal" },
  { type: "Fats", unit: "g" },
  { type: "Carbs", unit: "g" },
  { type: "Protein", unit: "g" },
];
const MEAL_TYPES = ["Breakfast", "Lunch", "Dinner"];

const QuickAddModal = ({ mealType, date, getFoodEntries }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement> | any) => {
    e.preventDefault();
    const t = e.target;
    const foodEntry: FoodEntry = {
      title: t[1].value,
      meal: t[0].value.toLowerCase(),
      calories: {
        count: Number(t[2].value),
        unit: "kcal",
      },
      fat: {
        count: Number(t[3].value),
        unit: "gram",
      },
      carbs: {
        count: Number(t[4].value),
        unit: "gram",
      },
      protein: {
        count: Number(t[5].value),
        unit: "gram",
      },
      date: date,
    };
    await createFoodEntry(foodEntry);
    getFoodEntries();
    setIsModalOpen(false);
  };

  return (
    <>
      <button
        className="text-sm hover:text-blue-400"
        onClick={() => {
          setIsModalOpen(!isModalOpen);
        }}
      >
        Quick Add
      </button>
      {isModalOpen ? (
        // modal backdrop
        <div
          className="fixed -left-4 right-0 top-0 bottom-0 flex justify-center items-center z-10"
          tabIndex={-1}
          style={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }}
          onClick={() => {
            setIsModalOpen(false);
          }}
        >
          {/* model contents */}
          <div
            aria-hidden={true}
            className="w-[500px] min-h-[300] p-6 bg-white relative rounded-lg shadow dark:bg-gray-700"
            onClick={(e) => {
              // do not close modal if anything inside modal content is clicked
              e.stopPropagation();
            }}
          >
            {/* close button */}
            <button
              className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200
               hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
              onClick={() => setIsModalOpen(false)}
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 
                  1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
            <div className="px-6 py-2 lg:px-8">
              <h3 className="mb-10 text-xl font-medium text-gray-900 dark:text-white">
                Quick Add
              </h3>
              <form
                id="quickAddModal"
                name="quickAddModal"
                className="space-y-6"
                onSubmit={handleSubmit}
              >
                <div>
                  <label
                    htmlFor="mealType"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Meal Type
                  </label>
                  <select
                    id="mealType"
                    required
                    defaultValue={mealType}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                           focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600
                            dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  >
                    {MEAL_TYPES.map((type) => {
                      return (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="mealName"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Meal Name
                  </label>
                  <input
                    id="mealName"
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                           focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600
                            dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="Meal Name (Required)"
                    required
                  />
                </div>
                {INPUT_MACROS.map((macro) => {
                  const placeholder =
                    macro.type +
                    (macro.type == "Calories" ? " (Required)" : "");
                  return (
                    <div key={macro.type}>
                      <label
                        htmlFor="quantity"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        {`${macro.type} (${macro.unit})`}
                      </label>
                      <input
                        id={macro.type}
                        type="number"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                           focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600
                            dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        placeholder={placeholder}
                        required={macro.type == "Calories"}
                        min={0}
                      />
                    </div>
                  );
                })}
                <button
                  form="quickAddModal"
                  type="submit"
                  className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none
                   focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center 
                   dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Add to Diary
                </button>
              </form>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default QuickAddModal;
