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
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://youtu.be/m1JakODvYhA?si=E4zriM5M3sVIFjjY&t=18"
            >
              <img className="buddy-image" src={myBuddy} />
            </a>
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
