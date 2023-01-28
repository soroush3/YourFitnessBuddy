const API_URL =
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1"
    ? "http://localhost:5001"
    : "https://travel-log-api.now.sh";

export type FoodEntry = {
  _id?: string;
  title: string;
  meal: string;
  calories: { count: number; unit: string };
  fat: { count: number; unit: string };
  carbs: { count: number; unit: string };
  protein: { count: number; unit: string };
  date: Date;
};

export const getFoodEntriesForDate = async (
  date: Date
): Promise<FoodEntry[]> => {
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  // timeZone has '/' between, ex: America/Detroit, encodeURI changes to America%2Detroit
  const url = `${API_URL}/foodEntries/${date}/${encodeURIComponent(timeZone)}`;
  const response = await fetch(url);
  return await response.json();
};

export const createFoodEntry = async (foodEntry: FoodEntry) => {
  const response = await fetch(`${API_URL}/foodEntry`, {
    method: "POST",
    body: JSON.stringify(foodEntry),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
};
