import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom"; // Link can be imported here directly

function CountryDetails({ data }) {
  const { countryName } = useParams(); // Destructure directly for cleaner code
  const [viewCount, setViewCount] = useState(0);

  // Function to update the view count of the current country
  const updateCountryViewCount = async () => {
    try {
      const response = await fetch("/api/update-one-country-count", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          country_name: countryName,
        }),
      });

      if (!response.ok) {
        // error message
        throw new Error(
          `HTTP error! Status: ${response.status} - ${response.statusText}`
        );
      }

      const countryData = await response.json();
      setViewCount(countryData.newCount); // Update the state with the new count
    } catch (error) {
      console.error("Error updating view count:", error);
      //  an error state here to display a message to the user
    }
  };

  // useEffect to call updateCountryViewCount when the component mounts or countryName changes
  useEffect(() => {
    if (countryName) {
      // Ensure countryName exists before making the API call
      updateCountryViewCount();
    }
  }, [countryName]); // Dependency array: re-run effect if countryName changes
  console.log(data);
  console.log(countryName);

  // Find the selected country's details from the 'data' prop
  const foundCountry = data?.find((item) => item.name.common === countryName);

  // Display a loading message if the country data is not yet found
  if (!foundCountry) {
    return <div>Loading country details or country not found...</div>;
  }

  // Function to save the current country to a list
  const saveCountryToList = async () => {
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

      if (!response.ok) {
        const errorData = await response.text(); // Get error message from backend
        throw new Error(`Failed to save country: ${errorData}`);
      }

      console.log("Country successfully saved!");
      alert("Country saved successfully!");
    } catch (error) {
      console.error("Save country failed:", error.message);
      alert(`Error saving country: ${error.message}`);
    }
  };

  return (
    <div>
      {" "}
      <nav>
        {/* Link to home page */}
        <Link to="/">
          <h1>Back to Home</h1>
        </Link>
      </nav>
      <div className="country-details-container">
        {" "}
        <h2>{foundCountry.name.common}</h2> {/* Display country name  */}
        <img
          className="country-detail-flag"
          src={foundCountry.flags.png}
          alt={`${foundCountry.name.common} flag`}
        />
        <button className="save-button" onClick={saveCountryToList}>
          Save Country
        </button>
        <p>View Count: {viewCount}</p> {/* Display the view count */}
        <ul>
          <li>
            <strong>Official Name:</strong> {foundCountry.name.official}
          </li>
          <li>
            <strong>Population:</strong>{" "}
            {foundCountry.population.toLocaleString()}{" "}
            {/* Format population for readability */}
          </li>
          <li>
            <strong>Region:</strong> {foundCountry.region}
          </li>
          <li>
            <strong>Capital:</strong>{" "}
            {foundCountry.capital ? foundCountry.capital[0] : "N/A"}{" "}
            {/* Handle cases where capital might be an array or missing */}
          </li>
        </ul>
      </div>
    </div>
  );
}

export default CountryDetails;
