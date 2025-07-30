//imported in data from the local data file
import { Link } from "react-router";
import localData from "../../localData";

function Home({ data }) {
  //console.log to insure accurate data
  console.log(localData);
  console.log(localData[1].name.common);

  return (
    <>
      <div id="linksCard">
        <h1>Welcome to the Home Page</h1>
        {data?.map((item, index) => {
          //looped to map over the collected data. Item is the value of localData.
          // console.log(item, "item");
          //console log to insure data accuracy
          return (
            <Link key={index} to={`/countryDetails/${item.name.common}`}>
              {/*connection to Country details page*/}
              <div key={index} id="card">
                {/* list items to retrieve specific data from item...name population capital, region and flags(images)  */}
                <nav>
                  <ul>
                    {/* id tags to style the parts of the cards */}
                    <img
                      src={item.flags.png} //</ul>'https://flagcdn.com/w320/jp.png', svg: 'https://flagcdn.com/jp.svg', alt: 'The flag of Japan features a crimson-red circle at the center of a white field.'}
                      alt="country flags"
                      width="500"
                      id="imgCard"
                    ></img>
                    <li id="nameCard">
                      <strong>Name</strong> {item.name.common}
                    </li>
                    <li id="popCard">
                      <strong>Poulation</strong> {item.population}
                    </li>
                    <li id="regionCard">
                      <strong>Region</strong> {item.region}
                    </li>
                    <li id="capDard">
                      <strong>Capital</strong> {item.capital}
                    </li>
                  </ul>
                </nav>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
}
export default Home;
