import React from "react";
import "../App.css";
import { Link } from "react-router";

export default function CountryCard({ country }) {
  return (
    <>
      <Link to={`/countryDetails/${country.name.common}`}>
        {/*connection to Country details page*/}
        <div id="card">
          {/* list items to retrieve specific data from item...name population capital, region and flags(images)  */}
          <nav>
            <ul>
              {/* id tags to style the parts of the cards */}
              <img
                src={country.flags.png} //</ul>'https://flagcdn.com/w320/jp.png', svg: 'https://flagcdn.com/jp.svg', alt: 'The flag of Japan features a crimson-red circle at the center of a white field.'}
                alt="country flags"
                width="500"
                id="imgCard"
              ></img>
              <li id="nameCard">
                <strong>Name</strong> {country.name.common}
              </li>
              <li id="popCard">
                <strong>Poulation</strong> {country.population}
              </li>
              <li id="regionCard">
                <strong>Region</strong> {country.region}
              </li>
              <li id="capDard">
                <strong>Capital</strong> {country.capital}
              </li>
            </ul>
          </nav>
        </div>
      </Link>
    </>
  );
}
