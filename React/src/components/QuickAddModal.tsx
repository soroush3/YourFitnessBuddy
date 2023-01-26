import { useState } from "react";

type Props = {
  mealType: string;
};

const INPUT_MACROS = [
  { type: "Calories", unit: "kcal" },
  { type: "Fats", unit: "g" },
  { type: "Carbs", unit: "g" },
  { type: "Protein", unit: "g" },
];
const MEAL_TYPES = ["Breakfast", "Lunch", "Dinner"];

const QuickAddModal = ({ mealType }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <button
        className="text-sm"
        onClick={() => {
          setIsModalOpen(!isModalOpen);
        }}
      >
        Quick Add
      </button>
      {isModalOpen ? (
        // modal backdrop
        <div
          className="fixed top-0 bottom-0 -left-[4px] right-0 flex justify-center items-center z-10"
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
            // className="fixed top-0 bottom-0 left-0 right-0 bg-slate-800 flex justify-center items-center z-10"
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
              Close
            </button>
            <div className="px-6 py-2 lg:px-8">
              <h3 className="mb-10 text-xl font-medium text-gray-900 dark:text-white">
                Quick Add
              </h3>
              <form
                id="quickAddModal"
                className="space-y-6"
                onSubmit={(e: React.FormEvent<HTMLFormElement> | any) => {
                  console.log(e.target[0].value);
                  console.log(e.target[1].value);
                  console.log(e.target[2].value);
                  console.log(e.target[3].value);
                  setIsModalOpen(false);
                }}
              >
                <div>
                  <label
                    htmlFor="select"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Meal Name
                  </label>
                  <select
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
