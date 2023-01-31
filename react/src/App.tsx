import FoodDiary from "./pages/FoodDiary";
import "./index.css";

function App() {
  return (
    <div className="pt-6">
      <nav>
        <h1 className="text-slate-700 text-center text-4xl">
          YourFitnessBuddy
        </h1>
      </nav>

      <FoodDiary></FoodDiary>
    </div>
  );
}

export default App;
