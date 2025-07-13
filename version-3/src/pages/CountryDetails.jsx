import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
//import "../App.css";
import { Link } from "react-router-dom";
//--------SECTION CREATED TO COUNT THE VIEWED COUNTRIES-------------------
function CountryDetails({ data }) {
  const countryName = useParams().countryName;
  const [count, setCount] = useState(0);
  //function created to update the count of viewed  countries  when the user views a country.
  //fetch created to gather viewed country data from the api.
  const updateCount = async () => {
    try {
      const response = await fetch("/api/update-one-country-count", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        //body of request count data to get the country name and json the data.
        body: JSON.stringify({
          country_name: countryName,
        }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
        //if no response throw an error
      }
      const countryData = await response.json();
      //console.log(countryData, "country data label");
      //created to change the information that was gathered from the response of the api to json.
      setCount(countryData.newCount);
      //created to give the setCount function the value of countryData and new count
    } catch (error) {
      console.error("Error updating count:", error);
    }
  };

  useEffect(() => {
    updateCount();
  }, [countryName]);

  //find the object with selected country's details from data.
  //loop through all the counrties in data and find the country whose common name matches the countryname variable
  let found;
  if (data) {
    found = data.find((item) => {
      //console.log(item, "looking for item");
      //console.log(found, "label for found info");
      console.log(countryName, "country name label");
      //console.log(item.name.common, "item name label");

      if (countryName === item.name.common) return true;

      //console.log(countryName, "Where is the country name")
    });
  }
  //console.log(countryName, "looking for country name");
  //console.log(data);
  //console.log(found, "looking for found");
  if (!found) {
    return <div>Loading country details...</div>;
  }

  function countrySavedList() {
    const saveCountryList = async () => {
      try {
        const response = await fetch("/api/save-one-country", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            country_name: countryName,
          }),
        });
        const newData = await response.text();

        if (!response.ok) {
          alert("Failed to save country" + newData);
          return;
        }
        console.log("SAVED TO BACKEND:", newData);
        alert("Country saved!");
      } catch (error) {
        console.error("Save failed:", error.message);
        alert("Error saving country. ");
      }
    };
    saveCountryList();
  }

  return (
    <>
      <div>
        <Link to="/">
          <nav>
            <h1>Welcome to the CountryDetails page</h1>
            <button className="back-button">&larr; Back</button>

          <img
            className="country-detail-flag"
            src={found.flags.png}
            alt={`${found.name.common} flag`}
          />
          <button className="save-button" onClick={countrySavedList}>
            Save
          </button>

            <p>{count} Count Details</p>
            {found && (
              <ul>
                <img src={found.flags.png} alt="country flags" id="imgCard" />

                <li id="nameCard2">
                  <strong>Name</strong> {found.name.common}
                </li>
                <li id="popCard2">
                  <strong>Poulation</strong> {found.population}
                </li>
                <li id="regionCard2">
                  <strong>Region</strong> {found.region}
                </li>
                <li id="capDard2">
                  <strong>Capital</strong> {found.capital}
                </li>
              </ul>
            )}
          </nav>
        </Link>
      </div>
    </>
  );
}
export default CountryDetails;
