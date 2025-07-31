import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home.jsx";
import CountryDetails from "./pages/CountryDetails.jsx";
import SavedCountries from "./pages/SavedCountries.jsx";
import { useEffect, useState } from "react";
import "./index.css";
let allInfo;

export default function App() {
  const [gatheredApiInfo, setGatheredApiInfo] = useState([]);
  //created local variable for information to be stored after it has  been gathered.

  const getApiInfo = async () => {
    try {
      const response = await fetch(
        `https://restcountries.com/v3.1/all?fields=name,flags,population,region,capital`
      );
      const data = await response.json();
      console.log(data);
      setGatheredApiInfo(data);
      //saved the api data into the state variable called gathered ApiInfo state variable and changed the value to data
      //data is passed as props to the other pages for the information gathered.
    } catch (error) {
      console.error("Oopsies! Error fetching data:", error);
    }
  };

  // we run useEffect when the page loads
  // it has an empty dependency array, meaning no dependencies, but we still have to include because it's required useEffect syntax

  useEffect(() => {
    getApiInfo();
  }, []);

  return (
    <div id="topNav">
      <nav>
        <ul>
          <li>
            <button id="homebutt">
              <Link to="/">Home</Link>
            </button>
            <button id="savedbutt">
              {" "}
              <Link to="/savedCountries">SavedCountries</Link>
            </button>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Home data={gatheredApiInfo} />} />
        <Route
          path="/savedCountries"
          element={<SavedCountries allCountriesData={gatheredApiInfo} />}
        />
        <Route
          path="/countryDetails/:countryName"
          element={<CountryDetails allCountriesData={gatheredApiInfo} />}
        />
      </Routes>
    </div>
  );
}
