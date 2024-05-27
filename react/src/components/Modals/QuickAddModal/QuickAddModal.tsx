import {useState} from "react";
import {FoodEntry} from "../../../API";
import {MEALS, MEAL_TYPES} from "../../DiaryTable/DiaryTable";

import "./QuickAddModal.css";
import ModalWrapper from "../ModalWrapper";

type QuickAddModalProps = {
  readonly isVisible: boolean;
  readonly mealType: MEAL_TYPES;
  readonly date: string;
  readonly closeModal: () => void;
  readonly handleCreateEntry?: (foodEntry: FoodEntry) => Promise<void>;
};

const INPUT_MACROS = [
  {type: "Calories", unit: "kcal"},
  {type: "Fats", unit: "g"},
  {type: "Carbs", unit: "g"},
  {type: "Protein", unit: "g"},
];

const DEFAULT_TITLE = "Quick Add";

const QuickAddModal = ({
  isVisible,
  mealType,
  date,
  closeModal,
  handleCreateEntry,
}: QuickAddModalProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement> | any) => {
    e.preventDefault();
    if (isLoading) return;
    const formData = new FormData(e.target);
    const foodEntry: FoodEntry = {
      title: formData.get("meal-name")?.toString() ?? "",
      meal: mealType.toLowerCase(),
      calories: {
        count: Number(formData.get("Calories")?.toString()),
        unit: "kcal",
      },
      fat: {
        count: Number(formData.get("Fats")),
        unit: "gram",
      },
      carbs: {
        count: Number(formData.get("Carbs")),
        unit: "gram",
      },
      protein: {
        count: Number(formData.get("Protein")),
        unit: "gram",
      },
      date: date,
    };

    try {
      await handleCreateEntry?.(foodEntry);
    } catch (err) {}
    setIsLoading(false);
    closeModal();
  };

  return (
    <ModalWrapper showContents={isVisible} closeModal={closeModal}>
      {/* model contents */}
      <div
        aria-hidden={true}
        className="modal-container"
        onClick={(e) => {
          // do not close modal if anything inside modal content is clicked
          e.stopPropagation();
        }}
      >
        <div className="modal-header">
          <div className="modal-title">{`Quick Add | ${mealType}`}</div>
          {/* close button */}
          <button className="close-modal-button" onClick={closeModal}>
            <svg
              aria-hidden="true"
              style={{width: "20px", height: "20px"}}
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
          </button>
        </div>

        <div className="modal-contents">
          <form
            id="quickAddModal"
            name="quickAddModal"
            className="quick-add-modal-form"
            onSubmit={handleSubmit}
          >
            {/* <div>
                  <label
                    htmlFor="mealType"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Meal Type
                  </label>
                  <select
                    id="mealType"
                    name="meal-type"
                    required
                    defaultValue={mealType}
                    className="input"
                  >
                    {MEALS.map((type) => {
                      return (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      );
                    })}
                  </select>
                </div> */}
            <div className="input-row">
              <label htmlFor="mealName">Meal Name</label>
              <input
                id="mealName"
                defaultValue={DEFAULT_TITLE}
                name="meal-name"
                type="text"
                className="input"
                placeholder="Meal Name (Required)"
                required
              />
            </div>
            {INPUT_MACROS.map((macro) => {
              const isCalories = macro.type === "Calories";
              const placeholder =
                macro.type + (isCalories ? " (Required)" : "");
              return (
                <div key={macro.type} className="input-row">
                  <label htmlFor={macro.type}>
                    {`${macro.type} (${macro.unit})`}
                  </label>
                  <input
                    autoFocus={isCalories}
                    id={macro.type}
                    name={macro.type}
                    type="number"
                    className="input"
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
              disabled={isLoading}
              style={{height: "35px"}}
            >
              Add to Diary
            </button>
          </form>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default QuickAddModal;
