import { useParams } from "react-router";
function CountryDetails({ data }) {
  //got the parameter from the url
  //countryName is the name of the country the user selected
  const countryName = useParams().countryName;
  //find the object with selected country's details from data.
  //loop through all the counrties in data and find the country whose common name matches the countryname variable
  let found = data.find((item) => {
    //console.log(item)
    if (countryName === item.name.common) return true;
  });
  //console.log(countryName);
  //console.log(data);
  console.log(found);
  if (!found) {
    return <div>Loading country details... or Country not found.</div>;
  }
  return (
    <>
      <div>
        <nav>
          <h1>Welcome to the CountryDetails page</h1>
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
        </nav>
      </div>
    </>
  );
}

export default CountryDetails;
