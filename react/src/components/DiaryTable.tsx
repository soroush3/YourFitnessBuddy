import {Fragment} from "react";
import {FoodEntry} from "../API";
import QuickAddModal from "./QuickAddModal";
import DeleteButton from "./buttons/DeleteButton";

export const MEAL_TYPES: Array<"Breakfast" | "Lunch" | "Dinner"> = [
  "Breakfast",
  "Lunch",
  "Dinner",
];

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
  return (
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
                        <DeleteButton
                          handleDelete={() => handleDeleteEntry?.(entry._id!)}
                        />
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
                    handleCreateEntry={handleCreateEntry}
                  />
                </td>
                {totals.count != 0 ? (
                  <>
                    <td className="text-center text-blue-600">
                      {totals.calories}
                    </td>
                    <td className="text-center text-blue-600">{totals.fat}</td>
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
  );
}
