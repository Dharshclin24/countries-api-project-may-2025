import React, { useState, useEffect } from "react";

// --- SECTION FOR USER FORM DATA & PROFILE ---
function SavedCountries({allCountriesData }) {
  // State variables for form inputs and retrieved user information
  const [inputs, setInputs] = useState({
    username: "",
    country: "",
    email: "",
    bio: "",
  });
  const [newestUserInfo, setNewestUserInfo] = useState(null);

  // State variable for the list of saved countries
  const [savedCountriesList, setSavedCountriesList] = useState([]);
  const [loadingSavedCountries, setLoadingSavedCountries] = useState(true); // New loading state
  const [errorSavedCountries, setErrorSavedCountries] = useState(null); // New error state

  // Function to handle changes in form input fields
  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputs((prevInputs) => ({ ...prevInputs, [name]: value }));
  };

  // Function to send form data to the API (POST request)
  const storeFormData = async () => {
    try {
      const response = await fetch("/api/add-one-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: inputs.username,
          preferred_country: inputs.country, // Renamed 'country' to 'preferred_country' for backend clarity if it's not a *saved* country
          email: inputs.email,
          bio: inputs.bio,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Failed to save user data: ${response.status} ${response.statusText} - ${errorText}`
        );
      }

      const responseData = await response.json(); // Assuming your backend returns JSON on success
      console.log("User data saved successfully:", responseData);
      alert("Profile updated successfully!");

      // After successfully storing data, re-fetch the newest user to update the profile display
      getNewestUserData();
    } catch (error) {
      console.error("Error storing form data:", error);
      alert(`Error updating profile: ${error.message}`);
    }
  };

  // Function to retrieve the newest user's data from the API (GET request)
  const getNewestUserData = async () => {
    try {
      const response = await fetch(`/api/get-newest-user`);
      if (!response.ok) {
        throw new Error(`Failed to fetch user data: ${response.status} .`);
      }
      const data = await response.json();
      // Assuming data is an array and you want the first item
      if (data && data.length > 0) {
        // Only set the relevant user info to state
        setNewestUserInfo({
          name: data[0].name,
          email: data[0].email,
          bio: data[0].bio,
          // If you want to display country flag/capital from here,
          // ensure your /api/get-newest-user endpoint provides that data,
          // or fetch it separately based on data[0].country_name
        });
      } else {
        setNewestUserInfo(null); // No user found
      }
    } catch (error) {
      console.error("Error fetching newest user data:", error);
      setNewestUserInfo(null); // Reset if error occurs
    }
  };

  // useEffect to fetch the newest user data when the component mounts
  useEffect(() => {
    getNewestUserData();
  }, []); // Empty dependency array means this runs once on mount

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission behavior (page reload)
    storeFormData(); // Call the async function to store data
  };

  // --- SECTION FOR SAVED COUNTRIES LIST ---
  // Function to retrieve all saved countries from the API (GET request)
  const fetchAllSavedCountries = async () => {
    setLoadingSavedCountries(true); // Set loading true before fetch
    setErrorSavedCountries(null); // Clear previous errors
    try {
      const response = await fetch(`/api/get-all-saved-countries`);
      if (!response.ok) {
        throw new Error(
          `Failed to fetch saved countries: ${response.status} ${response.statusText}`
        );
      }
      const savedCountriesNames = await response.json();
      console.log("Saved countries data:", savedCountriesNames); // More descriptive log

      setSavedCountriesList(savedCountriesNames);
    } catch (error) {
      console.error("Error fetching saved countries:", error);
      setErrorSavedCountries(error.message); // Set error message
      setSavedCountriesList([]); // Clear list on error
    } finally {
      setLoadingSavedCountries(false); // Set loading false after fetch (success or error)
    }
  };

  // useEffect to fetch all saved countries when the component mounts
  useEffect(() => {
    fetchAllSavedCountries();
  }, []); // Empty dependency array means this runs once on mount

  if (data) {
    data.find((item) => {
      //console.log(item, "looking for item");
    });
  }

  return (
    <>
      <h1>My Profile</h1>
      {/* Display user's basic info */}
      <div className="user-profile-info">
        {newestUserInfo ? (
          <p>
            Welcome, <strong>{newestUserInfo.name}</strong>!
            <br />
            Email: {newestUserInfo.email}
            <br />
            Bio: {newestUserInfo.bio}
          </p>
        ) : (
          <p>Please complete your profile below.</p>
        )}
      </div>
      <hr /> {/* Horizontal rule for separation */}
      {/* Form for updating user profile */}
      <div className="profile-form-container">
        <h2>Update Your Profile</h2>
        <form onSubmit={handleSubmit}>
          <div id="containerForm">
            {" "}
            <label>
              Full Name:
              <input
                type="text"
                name="username"
                value={inputs.username}
                onChange={handleChange}
                placeholder="Enter your full name"
              />
            </label>
            <label>
              Email:
              <input
                type="email"
                name="email"
                value={inputs.email}
                onChange={handleChange}
                placeholder="Enter your email"
              />
            </label>
            <label>
              Preferred Country (e.g., for profile):
              <input
                type="text"
                name="country"
                value={inputs.country}
                onChange={handleChange}
                placeholder="Your favorite country"
              />
            </label>
            <label>
              Bio:
              <textarea
                name="bio"
                value={inputs.bio}
                onChange={handleChange}
                placeholder="Tell us about yourself"
              />
            </label>
            <button type="submit">Save Profile</button>{" "}
          </div>
        </form>
      </div>
      <hr />
      {/* Display Saved Countries List */}
      <div className="saved-countries-section">
        <h2>Your Saved Countries</h2>
        {loadingSavedCountries ? (
          <p>Loading saved countries...</p>
        ) : errorSavedCountries ? (
          <p className="error-message">Error: {errorSavedCountries}</p>
        ) : savedCountriesList.length === 0 ? (
          <p>You haven't saved any countries yet. Go explore!</p>
        ) : (
          <div className="country-cards-grid">
            {" "}
            {/* Consider grid for displaying cards */}
            {savedCountriesList.map((country, index) => (
              // Assuming 'country' object has 'country_name' and potentially other details
              <div
                key={country.country_name || index}
                className="saved-country-card"
              >
                <h3>{country.country_name}</h3>

                {
                  <img
                    src={country.flag_url}
                    alt={`${country.country_name} flag`}
                  />
                }
                {<p>Capital: {country.capital}</p>}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default SavedCountries;
