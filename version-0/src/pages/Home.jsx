//imported in data from the local data file
import localData from "../../localData";

function Home() {
  //console.log to insure accurate data
  console.log(localData);
  console.log(localData[1].name.common);

  return (
    <>
      <div>
        {" "}
        <h1>Welcome to the Home Page</h1>
        {localData.map((item, index) => {
          //looped to map over and collected data. Item is the value of localData.
          console.log(item);
          //console log to insure data accuracy
          return (
            //div to categorize list items(helps with styling) gave key the value of index
            <div key={index}>
              {/* list items to retrieve specific data from item...name population capital, region and flags(images)  */}
              <div id="container" >
              <ul>
                {/* id tags to style the parts of the cards */}
                <img
                  src={item.flags.png}
                  alt="country flags"
                  width="500"
                  id="imgCard"
                ></img>
                <li id="nameCard">{item.name.common}</li>
                <li id="popCard">{item.population}</li>
                <li id="regionCard">{item.region}</li>
                <li id="capDard">{item.capital}</li>
              </ul>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
export default Home;
