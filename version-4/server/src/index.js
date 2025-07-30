/*--------------------------------
BOILERPLATE CODE TO SET UP SERVER
---------------------------------*/
// Importing our Node modules
import express from "express"; // The framework that lets us easily build a web server
import pg from "pg"; // pg stands for PostgreSQL, for talking to the database
import config from "./config.js"; // we need access to our database connection credentials

// connect to our PostgreSQL database, or db for short
const db = new pg.Pool({
  connectionString: config.databaseUrl, // credentials to access the database — keep this private!
  ssl: true, // we will use SSL encryption when connecting to the database
});

const app = express(); // Creating an instance of the express module

app.use(express.json()); // This server will receive and respond in JSON format

const port = 3000; // Declaring which port to listen to to receive requests

// Turning on our server to listen for requests
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

/*--------------------------------
HELPER FUNCTIONS
---------------------------------*/
async function getAllUsersInfo() {
  const result = await db.query("SELECT * FROM users");
  console.log(result);
  return result.rows;
}
async function getNewestUsersInfo() {
  const result = await db.query(
    "SELECT * FROM users ORDER BY user_id DESC LIMIT 1;"
  );
  console.log(result, "result", []);
  return result.rows;
}
async function getAllSavedCountriesInfo() {
  const result = await db.query("SELECT * FROM saved_countries");
  console.log(result);
  return result.rows;
}
async function saveOneCountry(newCountry) {
  await db.query(
    "INSERT INTO saved_countries (country_name) VALUES ($1) ON CONFLICT (country_name) DO NOTHING;",
    [newCountry.country_name]
  );
}
async function addOneUser(addedUser) {
  await db.query(
    "INSERT INTO users (name, country_name, email, bio) VALUES ($1, $2, $3, $4);",
    [addedUser.name, addedUser.country_name, addedUser.email, addedUser.bio]
  );
}
async function updateCountryCount(countryCounts) {
  const result = await db.query(
    'INSERT INTO country_counts (country_name, count)  VALUES ($1, 1) ON CONFLICT (country_name) DO UPDATE SET count = country_counts.count + 1 RETURNING count AS "newCount";',
    [countryCounts.country_name]
  );
  console.log(result, "result", []);
  const newCountryCount = result.rows[0];
  return newCountryCount;

  // console.log(result, "RSSULT");
  // const newCount = result.rows[0].newCount;
  // console.log(newCount, "NEW COUNT");
  // return {
  //   newCount,
  // };
}

/*--------------------------------
API ENDPOINTS
---------------------------------*/
app.post("/add-one-user", async (req, res) => {
  try {
    const addedUser = req.body;
    addOneUser(addedUser);
    res.send("The user was successfully added!");
  } catch (error) {
    console.log(error);
  }
});
app.get("/get-all-users", async (req, res) => {
  try {
    const allUsers = await getAllUsersInfo();
    res.json(allUsers);
  } catch (error) {
    console.log(error);
  }
});

app.get("/get-newest-user", async (req, res) => {
  // declaring our GET API endpoint
  try {
    const users = await getNewestUsersInfo(); // calling the helper function, and saving the data we get back in a variable
    res.json(users); // sending the data back in the response
  } catch (error) {
    console.log(error);
  }
});
app.get("/get-all-saved-countries", async (req, res) => {
  try {
    const allSavedCountries = await getAllSavedCountriesInfo();
    res.json(allSavedCountries);
  } catch (error) {
    console.log(error);
  }
});
app.post("/save-one-country", async (req, res) => {
  try {
    const newCountry = req.body;
    saveOneCountry();
    res.send(newCountry);
  } catch (error) {
    console.log(error);
  }
});

app.post("/update-one-country-count", async (req, res) => {
  const countryCounts = req.body;
  const savedCountData = await updateCountryCount(countryCounts);
  // console.log(savedCountData, "Label for count data");
  res.json(savedCountData);
});
