import { useState, useEffect } from "react";
import React from "react";
// import CountryCard from "../components/CountryCard";
//import { useParams } from "react-router-dom";
//-----------SECTION FOR CREATED FORM DATA--------------------
function SavedCountries({ data }) {
  //local Variables declared to store  the form data.
  const [savedCountriesList, setSavedCountriesList] = useState([]);
  const [inputs, setInputs] = useState({
    username: "",
    country: "",
    email: "",
    bio: "",
  });
  const [gottenInfo, setGottenInfo] = useState(null);

  //global variable declared to store (set mode function)and display data (render in jsx.not set variable)from the api

  // //function defined to handle changes made to the form when user inputs data.
  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputs((prevInputs) => ({ ...prevInputs, [name]: value }));
  };

  // //post request created to send the form data to the API.
  async function storeFormData() {
    await fetch("/api/add-one-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      //form data
      body: JSON.stringify({
        name: inputs.username,
        country_name: inputs.country,
        email: inputs.email,
        bio: inputs.bio,
      }),
    });
  }
  const retrievedFormData = async () => {
    try {
      const response = await fetch(`/api/get-newest-user`);
      //created  a fetch to get the newest user information.Named the function retrieved form data
      const data = await response.json();
      //console.log(data, "data from get newest user");
      //console.log(data[0].name, "new user name");

      setGottenInfo(
        data[0].name,
        data[0].flags,
        data[0].capital,
        data[0].region
      );
      //console.log(setGottenInfo, "gotten info label");
      //     //saved the api data into the state variable called gathered ApiInfo state variable and changed the value to data

      //     //data is passed as props to the other pages for the information gathered.
    } catch (error) {
      console.error("Oopsies! Error fetching data:", error);
    }
  };
  // run use effect on page load
  useEffect(() => {
    retrievedFormData();
  }, []);

  //function created to handle the form when the user submits it and prevent defaults.
  const handleSubmit = (event) => {
    event.preventDefault();
    storeFormData();
  };
  //----------SECTION CREATED FOR THE SAVED COUNTRIES LIST-------------------
  //get request created to retrieve a list of all saved countries.

  const AllSavedCountries = async () => {
    try {
      const response = await fetch(`api/get-all-saved-countries`);
      //created  a fetch to Retrieve all saved country names..Named the function allSavedCountries
      const data = await response.json();
      console.log(data, "data from get new country");

      setSavedCountriesList(data);
      //console.log(setSavedCountriesList, "saved]);
      //  console.log(setStoredCountryData, "storedCountryDataLabel");
    } catch (error) {
      console.error("Oopsies! Error fetching data:", error);
    }
  };

  useEffect(() => {
    AllSavedCountries();
  }, []);

  if (data) {
    data.find((item) => {
      //console.log(item, "looking for item");
    });
    //console.log(savedCountriesDataList, "label for saved countries data info");
  }

  return (
    <>
      <h1>My Profile</h1>
      <p>Welcome {gottenInfo}</p>

      <div className="savedCountriesList">
        <h2>Saved Countries</h2>
        {savedCountriesList?.length === 0 ? (
          <p>Saved Countries List</p>
        ) : (
          <div className="countryCard">
            {savedCountriesList?.map((found) => (
              <h3 key={found.country_name}>
                {found.country_name || found.country_name}
              </h3>
            ))}
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit}>
        <div id="container">
          <nav>
            <label>
              Full Name
              <input
                type="text"
                name="username"
                value={inputs?.username || ""}
                onChange={handleChange}
              />
            </label>
            <label>
              Email:
              <input
                type="text"
                name="email"
                value={inputs?.email || ""}
                onChange={handleChange}
              />
            </label>
            <label>
              Country
              <input
                type="text"
                name="country"
                value={inputs?.country || ""}
                onChange={handleChange}
              />
            </label>
            <label>
              Bio
              <input
                type="text"
                name="bio"
                value={inputs?.bio || ""}
                onChange={handleChange}
              />
            </label>
            <input type="submit" />
          </nav>
        </div>
      </form>
    </>
  );
}

export default SavedCountries;
