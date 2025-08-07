//imported in data from the local data file

import localData from "../../localData";
import CountryCard from "../Components/CountryCard";

function Home({ data }) {
  //console.log to insure accurate data
  // console.log(localData);
  // console.log(localData[1].name.common);

  return (
    <>
      <div id="linksCard">
        <h1>Welcome to the Home Page</h1>
        {data?.map((item, index) => {
          //looped to map over the collected data. Item is the value of localData.
          // console.log(item, "item");
          //console log to insure data accuracy
          return <CountryCard country={item} key={index}></CountryCard>;
        })}
      </div>
    </>
  );
}
export default Home;
