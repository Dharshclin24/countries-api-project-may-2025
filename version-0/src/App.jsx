import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home.jsx";
import CountryDetails from "./pages/CountryDetails.jsx";
import SavedCountries from "./pages/SavedCountries.jsx";
import "./App.css";

function App() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <h1 style={{ backgroundColor: "lightblue" }}>
              "Where in the world?"
            </h1>
            <button>
              <Link to="/">Home</Link>
            </button>
            <button>
              <Link to="/savedCountries">SavedCountries</Link>
            </button>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/savedCountries" element={<SavedCountries />} />
        <Route path="/countryDetails" element={<CountryDetails />} />
      </Routes>
    </div>
  );
}

export default App;
