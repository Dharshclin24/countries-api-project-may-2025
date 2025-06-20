import { useState } from "react";

function SavedCountries({ data }) {
  const [inputs, setInputs] = useState({});
  //function created to handle changes made to the form when user inputs data.
  const handleChange = (event) => {
    const name = event.target.name.email.country.bio;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };
  //function created to handle the form when the user submits it and prevent defaults.
  const handleSubmit = (event) => {
    event.preventDefault();
    alert(inputs);
  };
  console.log(data);

  return (
    <>
      <h1>My Profile</h1>
      <form onSubmit={handleSubmit}>
        <div id="container">
          <nav>
            <label>
              Full Name
              <input
                type="text"
                name="username"
                value={inputs.username || ""}
                onChange={handleChange}
              />
            </label>
            <label>
              Email
              <input
                type="text"
                name="email"
                value={inputs.email || ""}
                onChange={handleChange}
              />
            </label>
            <label>
              Country
              <input
                type="text"
                name="country"
                value={inputs.country || ""}
                onChange={handleChange}
              />
            </label>
            <label>
              Bio
              <input
                type="text"
                name="bio"
                value={inputs.bio || ""}
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
