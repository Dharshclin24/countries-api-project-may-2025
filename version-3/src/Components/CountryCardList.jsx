import React from "react";
import "../App.css";
import CountryCard from "./CountryCard";
import { Link } from "react-router-dom";

export default function CountryCardList({ data }) {
  console.log("DATA", data);
  return (
    <>
      <div className="allCards">
        {data.map((item) => (
          <Link
            to={`/country-detail/${item.name.common}`}
            key={item.cca3}
            className="cardDetail"
          >
            <CountryCard
              img={found.flags.png}
              name={found.name.common}
              population={found.population}
              region={found.region}
              capital={foundcapital?.[0] || "N/A"}
            />
          </Link>
        ))}
        ;
      </div>
    </>
  );
}
