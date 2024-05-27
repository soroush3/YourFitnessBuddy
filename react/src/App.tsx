import FoodDiary from "./pages/FoodDiary/FoodDiary";
import "./index.css";
import "./App.css";

import myBuddy from "./assets/terrance-philip.jpg";

function App() {
  return (
    <div>
      <div className="nav-wrapper">
        <div className="nav-container">
          <div className="buddy-nav">
            <a href="/">YourFitnessBuddy</a>
            <img
              style={{objectFit: "cover", width: "35px", height: "35px"}}
              src={myBuddy}
            />
          </div>
          <nav className="middle-nav">
            <a className="nav-button" href="/food-diary">
              Food Diary
            </a>
            <a className="nav-button" href="/">
              Temp
            </a>
          </nav>
        </div>
      </div>

      <div style={{marginTop: "30px"}}>
        <FoodDiary />
      </div>
    </div>
  );
}

export default App;
