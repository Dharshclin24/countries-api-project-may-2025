import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home.jsx";
import CountryDetails from "./pages/CountryDetails.jsx";
import SavedCountries from "./pages/SavedCountries.jsx";

function App() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <h1>"Where in the world?"</h1>
            <Link to="/">Home</Link>
            <Link to="/savedCountries">SavedCountries</Link>
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
