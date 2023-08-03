import react, { useState, useEffect } from "react";
import "../CSS/Home.css";
import "../CSS/Mobile.css";
import Pokemon from "./Pokemon";
const Home = () => {
  const [Id, setId] = useState("");
  const [Entity, setEntity] = useState("Loding.....");

  let sigledata;
  const getDetailsSingle = async () => {
    try {
      const url = `https://pokeapi.co/api/v2/pokemon/${Id}/`;
      const responace = await fetch(url);
      const resStatus = responace.status;
      if (resStatus !== 200) {
        alert("Enter the Correct Id or Name !");
        setId("");
      } else {
        const data = await responace.json();

        let imgurl = data.sprites.other.dream_world.front_default;
        sigledata = (
          <Pokemon key={data.id} index={data.id} data={data} imgurl={imgurl} />
        );
        setEntity(sigledata);
      }
    } catch (err) {
      alert("Fetching data....");
    }
  };

  let Alldata;
  const getAllDetails = async () => {
    try {
      setId("");
      const url = "https://pokeapi.co/api/v2/pokemon";
      const responace = await fetch(url);
      let data = await responace.json();
      Alldata = data.results.map((data, index) => {
        return <Pokemon key={index} index={index + 1} data={data} />;
      });
      setEntity(Alldata);
    } catch (err) {
      alert("Fetching data....");
    }
  };
  useEffect(() => {
    getAllDetails();
  }, []);


  const FilterTypes = [
    "normal",
    "fighting",
    "flying",
    "poison",
    "ground",
    "rock",
  ];

  const gender = ["female", "male", "genderless"];
  const [categery, setcategery] = useState(FilterTypes);
  const [Gender, setGender] = useState(gender);

  let alldata;
  const fiterdata = async (e) => {
    try {
      let categery = e.target.value;
      const url = `https://pokeapi.co/api/v2/type/${categery}/`;
      const responace = await fetch(url);
      const data = await responace.json();
      const status = responace.status;
      if (status !== 200) {
        alert("Wait fetching data....");
      }
      alldata = data.pokemon.map((res, index) => {
        let id = res.pokemon.url.substring(34).replace("/", "");
        return <Pokemon key={index} index={id} data={res.pokemon} />;
      });
      setEntity(alldata);
    } catch (err) {
      alert("Wait fetching data....");
    }
  };
  const ResetAll = () => {
    getAllDetails();
    setEntity(Alldata);
  };
  const ResetAllGender = () => {
    getAllDetails();
    setEntity(Alldata);
  };
  
  const [show, setshow] = useState({ display: "none" });
  const [showGender, setshowGender] = useState({ display: "none" });

  const displayTypes = () => {
    if (show.display === "none") {
      setshow({ display: "block" });
    } else {
      setshow({ display: "none" });
    }
  };
  const displayGender = () => {
    if (showGender.display === "none") {
      setshowGender({ display: "block" });
    } else {
      setshowGender({ display: "none" });
    }
  };
  const fiterdataOnGender = async (e) => {
    try {
      let gender = e.target.value;
      const url = `https://pokeapi.co/api/v2/gender/${gender}/`;
      const responace = await fetch(url);
      const data = await responace.json();
      const status = responace.status;
      if (status !== 200) {
        alert("Wait fetching data....");
      }
      alldata = data.pokemon_species_details.map((res, index) => {
        let id = res.pokemon_species.url.substring(42).replace("/", "");
        return <Pokemon key={index} index={id} data={res.pokemon_species} />;
      });
      setEntity(alldata);
    } catch (err) {
      alert("Wait fetching data....");
    }
  };
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
              require
              className="SearchBox"
            />
          </span>
          <span>
            <button type="button" className="searchButton">
              <img
                src="SearchIcon.svg"
                alt="search"
                onClick={getDetailsSingle}
                className="SearchImg"
              />
            </button>
          </span>
        </div>
        <input
          type="button"
          value="Filter/Types     ᐯ "
          className="setFliter"
          onClick={displayTypes}
        />
        <div className="FiterTypes" style={show}>
          {categery.map((Type) => {
            return (
              <li>
                <label htmlFor={Type}>
                  <input
                    className="MyFilter"
                    type="button"
                    name={Type}
                    id={Type}
                    value={Type}
                    onClick={fiterdata}
                  />
                </label>
              </li>
            );
          })}
          <li>
            <label htmlFor="Reset1">
              <button onClick={ResetAll} name="Reset" id="Reset1">
                Reset
              </button>
            </label>
          </li>
        </div>
        <input
          type="button"
          value="Filter/Gender     ᐯ "
          className="setFliterGender"
          onClick={displayGender}
        />
        <div className="FiterGender" style={showGender}>
          {Gender.map((gender) => {
            return (
              <li>
                <label htmlFor={gender}>
                  <input
                    className="MyFilterGender"
                    type="button"
                    name={gender}
                    id={gender}
                    value={gender}
                    onClick={fiterdataOnGender}
                  />
                </label>
              </li>
            );
          })}
          <li>
            <label htmlFor="Reset2">
              <button
                className="MyFilter"
                onClick={ResetAllGender}
                name="Reset"
                id="Reset2"
              >
                Reset
              </button>
            </label>
          </li>
        </div>
      </div>
      <div className="HomeMain">{Entity}</div>
    </>
  );
};

export default Home;
