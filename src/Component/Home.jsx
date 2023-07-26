import react, { useState, useEffect } from "react";
import "../CSS/Home.css";
import Pokemon from "./Pokemon";
const Home = () => {
  const [Id, setId] = useState("");
  const [Entity, setEntity] = useState("Loding.....");
  let sigledata;
  const getDetailsSingle = async () => {
    const url = `https://pokeapi.co/api/v2/pokemon/${Id}/`;
    const responace = await fetch(url);
    const resStatus = responace.status;
    if (resStatus !== 200) {
      alert("Enter the Correct Id");
      setId("");
    } else {
      const data = await responace.json();
      let imgurl = data.sprites.other.dream_world.front_default;
      sigledata = <Pokemon key={Id} index={Id} data={data} imgurl={imgurl} />;
      setEntity(sigledata);
    }
  };
  let Alldata;
  const getAllDetails = async () => {
    setId("");
    const url = "https://pokeapi.co/api/v2/pokemon";
    const responace = await fetch(url);
    const data = await responace.json();
    Alldata = data.results.map((data, index) => {
      return <Pokemon key={index} index={index + 1} data={data} />;
    });
    setEntity(Alldata);
  };
  useEffect(() => {
    getAllDetails()
  },[]);
  return (
    <>
      <div className="Headling">
        <h3 className="childhead1">Pokédex</h3>
        <p className="childhead2">|</p>
        <p className="childhead3">
          Search for any Pokemon that exists on the planet
        </p>
      </div>
      <div className="main2">
        <div>
          <p className="searchText">Search by</p>
          <span>
            {" "}
            <input
              type="text"
              name=""
              id=""
              placeholder="Name or Number"
              value={Id}
              onChange={(e) => {
                setId(e.target.value);
              }}
              className="SearchBox"
            />
          </span>
          <span>
            <button type="button" className="searchButton">
              <img
                src="icons8-search-ios-16-32.png"
                alt="search"
                onClick={getDetailsSingle}
                className="SearchImg"
              />
            </button>
          </span>
        </div>
      </div>
      <div>
      </div>
      <div className="HomeMain">{Entity}</div>      
    </>
    
  );
};

export default Home;
