import FoodDiary from "./pages/FoodDiary";
import "./index.css";
import "./App.css";

import myBuddy from "./assets/terrance-philip.jpg";

function App() {
  return (
    <div>
      <div className="nav-container">
        <div className="buddy-nav">
          <a href="/">YourFitnessBuddy</a>
          <img width={"50px"} height={"50px"} src={myBuddy} />
        </div>

        <div className="middle-nav">
          <nav>
            <a href="/food-diary">Food Diary</a>
          </nav>
        </div>
      </div>

      <FoodDiary />
    </div>
  );
}

export default App;
