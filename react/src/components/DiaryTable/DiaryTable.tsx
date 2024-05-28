import "./DiaryTable.css";

import {Fragment, useState} from "react";
import {FoodEntry} from "../../API";
import QuickAddModal from "../Modals/QuickAddModal/QuickAddModal";
import DeleteButton from "../buttons/DeleteButton";

export type MEAL_TYPES = "Breakfast" | "Lunch" | "Dinner";
export const MEALS: Array<MEAL_TYPES> = ["Breakfast", "Lunch", "Dinner"];

type DiaryTableProps = {
  readonly foodEntries: Array<FoodEntry>;
  readonly date: string;
  readonly handleCreateEntry?: (entry: FoodEntry) => Promise<void>;
  readonly handleDeleteEntry?: (entryId: string) => Promise<void>;
};

export default function DiaryTable({
  foodEntries,
  date,
  handleCreateEntry,
  handleDeleteEntry,
}: DiaryTableProps) {
  const [showQuickAddModal, setShowQuickAddModal] = useState<
    MEAL_TYPES | false
  >(false);

  return (
    <>
      <QuickAddModal
        isVisible={!!showQuickAddModal}
        mealType={showQuickAddModal || "Breakfast"}
        date={date}
        closeModal={() => setShowQuickAddModal(false)}
        handleCreateEntry={handleCreateEntry}
      />
      <table className="diary-table-container" width={"100%"}>
        <colgroup>
          <col width={350} />
          <col width={50} />
          <col width={50} />
          <col width={50} />
          <col width={50} />
          <col width={25} />
        </colgroup>
        <tbody>
          {MEALS.map((mealType, idx) => {
            const totals = {
              calories: 0,
              fat: 0,
              carbs: 0,
              protein: 0,
              count: 0,
            };
            return (
              <Fragment key={mealType}>
                <tr className="bordered">
                  <td
                    style={{
                      paddingLeft: "10px",
                      fontSize: "larger",
                    }}
                  >
                    {mealType}
                  </td>
                  {mealType === "Breakfast" ? (
                    // Table headers only for Breakfast row (Calories, Fat, Carbs, Protein)
                    <>
                      <td className="breakfast-td">
                        <div>Calories</div>
                        <div style={{fontSize: "smaller", opacity: "75%"}}>
                          kcal
                        </div>
                      </td>
                      <td className="breakfast-td">
                        <div>Fat</div>
                        <div style={{fontSize: "smaller", opacity: "75%"}}>
                          g
                        </div>
                      </td>
                      <td className="breakfast-td">
                        <div>Carbs</div>
                        <div style={{fontSize: "smaller", opacity: "75%"}}>
                          g
                        </div>
                      </td>
                      <td className="breakfast-td">
                        <div>Protein</div>
                        <div style={{fontSize: "smaller", opacity: "75%"}}>
                          g
                        </div>
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
                      <tr className="entry-row" key={entry._id}>
                        <td className="text-center">{entry.title}</td>
                        <td className="quantity-col">{entry.calories.count}</td>
                        <td className="quantity-col">{entry.fat.count}</td>
                        <td className="quantity-col">{entry.carbs.count}</td>
                        <td className="quantity-col">{entry.protein.count}</td>
                        <td>
                          <DeleteButton
                            handleDelete={() => handleDeleteEntry?.(entry._id!)}
                          />
                        </td>
                      </tr>
                    );
                  }
                })}
                <tr className="totals-row">
                  <td className="add-buttons">
                    <button>Add Food</button>
                    <button onClick={() => setShowQuickAddModal(mealType)}>
                      Quick Add
                    </button>
                  </td>
                  {totals.count != 0 ? (
                    <>
                      <td className="quantity-col purp-text">
                        {totals.calories}
                      </td>
                      <td className="quantity-col purp-text">{totals.fat}</td>
                      <td className="quantity-col purp-text">{totals.carbs}</td>
                      <td className="quantity-col purp-text">
                        {totals.protein}
                      </td>
                    </>
                  ) : null}
                </tr>
                {idx !== MEALS.length - 1 ? (
                  <tr>
                    <td colSpan={6}>
                      <hr />
                    </td>
                  </tr>
                ) : null}
              </Fragment>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
