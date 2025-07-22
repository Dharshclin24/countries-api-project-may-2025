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
async function getNewestUsersInfo(newestUserName) {
  const result = await db.query("SELECT * FROM users WHERE name = $1", [
    newestUserName,
  ]);
  return result.rows[0];
}
async function getAllSavedCountriesInfo() {
  const result = await db.query("SELECT * FROM saved_countries");
  console.log(result);
  return result.rows;
}
async function saveOneCountry(newCountry) {
  await db.query("INSERT INTO saved_countries (country_name) VALUES ($1)", [

 ]);
}
async function addOneUser(addedUser) {
    await db.query(
      "INSERT INTO users (name) VALUES ($1)",
      [addedUser.name]

    );
  }
  async function updateCountryCount(countryCounts) {
    await db.query(
        "UPDATE countryCounts SET count = count + 1  WHERE country_name =  $1",
        [countryCounts.country_name]
    );
  }

/*--------------------------------
API ENDPOINTS
---------------------------------*/
app.get("/get-all-users", async (req, res) => {
  const allUsers = await getAllUsersInfo();
  res.json(allUsers);
});
app.get("/get-newest-user", async (req, res) => {
  const newestUserName = await getNewestUsersInfo();
  res.json(newestUserName);
});
app.get("/get-all-saved-countries", async (req, res) => {
  const allSavedCountries = await getAllSavedCountriesInfo();
  res.json(allSavedCountries);
});
app.post("/save-one-country", async (req, res) => {
  const newCountry = req.body;
  saveOneCountry(newCountry);
  res.send("The country was successfully saved!");
});
app.post("/add-one-user", async (req, res) => {
    const addedUser = req.body;
    addOneUser(addedUser);
    res.send("The user was successfully added!");
  });
  app.post(`/update-one-country-count`, async (req, res) => {
    const countryCounts = req.body;
    updateCountryCount(countryCounts);
    res.send("The country count was successfully updated!");
  });
