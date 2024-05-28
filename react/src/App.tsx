import FoodDiary from "./pages/FoodDiary/FoodDiary";
import "./index.css";
import "./App.css";

import myBuddy from "../public/terrance-philip-logo-transparent.png";

function App() {
  return (
    <div>
      <div className="nav-wrapper">
        <div className="nav-container">
          <div className="buddy-nav">
            <a href="/">YourFitnessBuddy</a>
            <img
              style={{
                objectFit: "contain",
                width: "75px",
                height: "75px",
                marginTop: "20px",
              }}
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
