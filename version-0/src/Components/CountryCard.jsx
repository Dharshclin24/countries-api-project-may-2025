import React from "react";
import "../App.css";
import localData from "../../localData";
import { useState } from "react";

function CountryCard() {
  const [localData, setLocalData] useState=[""];
  return (
    <>
    
      <div className="Card">
        <p>{localData}</p>
      </div>
    </>
  );
}
export default CountryCard;
