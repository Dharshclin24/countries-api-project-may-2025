import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
//import "../App.css";
import { Link } from "react-router-dom";

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
          country_name: "countryName",
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
    return <div>Loading country details... or Country not found.</div>;
  }

  // </script>

  return (
    <>
      <div>
        <Link to="/">
          <nav>
            <h1>Welcome to the CountryDetails page</h1>

            <button onclick={count}>Saved countries</button>
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
