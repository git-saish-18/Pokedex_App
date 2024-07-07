import { useState, useEffect } from "react";
import "../CSS/Home.css";
import "../CSS/Mobile.css";
import Pokemon from "./Pokemon";
import { API, FilterTypes, GenderType } from "../constant/constant";
import Pagination from "./Pagination";
const Home = () => {
  const [Id, setId] = useState("");
  const [offSetCount, setOffSetCount] = useState(0);
  const [offSetCountForGender, setoffSetCountForGender] = useState(0);
  const [offSetCountForCategory, setoffSetCountForCategory] = useState(0);
  const [Entity, setEntity] = useState("Loding.....");
  const [filterEntity, setFilterEntity] = useState("Loding.....");
  const [GenderEntity, setGenderEntity] = useState("Loding.....");
  const [categeryArr] = useState(FilterTypes);
  const [GenderArr] = useState(GenderType);
  const [Categery, setCategery] = useState();
  const [Gender, setGender] = useState();
  const [show, setshow] = useState({ display: "none" });
  const [showGender, setshowGender] = useState({ display: "none" });

  const getDetailsSingle = async () => {
    try {
      const responace = await fetch(API.GET_SINGLE(Id));
      const resStatus = responace.status;
      if (resStatus !== 200) {
        alert("Enter the Correct Id or Name !");
        setId("");
      } else {
        const data = await responace.json();
        let imgurl = data.sprites.other.dream_world.front_default;
        const sigledata = (
          <Pokemon key={data.id} index={data.id} data={data} imgurl={imgurl} />
        );
        setEntity(sigledata);
      }
    } catch (err) {
      alert("Fetching data....");
    }
  };

  const getAllDetails = async () => {
    try {
      setId("");
      const responace = await fetch(API.GET_ALL(offSetCount));
      let data = await responace.json();
      const Alldata = data.results.map((data, index) => {
        let id = data.url.substring(34).replace("/", "");

        return (
          <Pokemon key={id} index={id} data={data} offSetCount={offSetCount} />
        );
      });
      setEntity(Alldata);
    } catch (err) {
      alert("Fetching data....");
    }
  };

  const fiterdataByCategory = async () => {
    try {
      const responace = await fetch(API.GET_CATEGORY(Categery));
      const data = await responace.json();

      const alldata = data.pokemon.map((res, index) => {
        let id = res.pokemon.url.substring(34).replace("/", "");
        return (
          <Pokemon
            key={index}
            index={id}
            data={res.pokemon}
            Categery={Categery}
          />
        );
      });

      const result = alldata.splice(offSetCountForCategory, 20);

      setFilterEntity(result);
    } catch (err) {}
  };

  const fiterdataOnGender = async () => {
    try {
      const responace = await fetch(API.GET_GENDER(Gender));
      const data = await responace.json();

      const alldata = data.pokemon_species_details.map((res, index) => {
        let id = res.pokemon_species.url.substring(42).replace("/", "");
        return (
          <Pokemon
            key={index}
            index={id}
            data={res.pokemon_species}
            Gender={Gender}
          />
        );
      });

      const result = alldata.splice(offSetCountForGender, 20);

      setGenderEntity(result);
    } catch (err) {}
  };

  const ResetAll = () => {
    getAllDetails();
    setGender(null);
    setCategery(null);
  };

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

  useEffect(() => {
    getAllDetails();
  }, [offSetCount]);

  useEffect(() => {
    fiterdataOnGender();
  }, [Gender, offSetCountForGender]);

  useEffect(() => {
    fiterdataByCategory();
  }, [Categery, offSetCountForCategory]);

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
          {categeryArr.map((Type) => {
            return (
              <li>
                <label htmlFor={Type}>
                  <input
                    className="MyFilter"
                    type="button"
                    name={Type}
                    id={Type}
                    value={Type}
                    onClick={(e) => {
                      setGender(null);
                      setCategery(e.target.value);
                    }}
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
          {GenderArr.map((gender) => {
            return (
              <li>
                <label htmlFor={gender}>
                  <input
                    className="MyFilterGender"
                    type="button"
                    name={gender}
                    id={gender}
                    value={gender}
                    onClick={(e) => {
                      setCategery(null);
                      setGender(e.target.value);
                    }}
                  />
                </label>
              </li>
            );
          })}
          <li>
            <label htmlFor="Reset2">
              <button
                className="MyFilter"
                onClick={ResetAll}
                name="Reset"
                id="Reset2"
              >
                Reset
              </button>
            </label>
          </li>
        </div>
      </div>
      {!Categery && !Gender && (
        <>
          {" "}
          <div className="HomeMain">{Entity}</div>
          <Pagination Count={offSetCount} setCount={setOffSetCount} />
        </>
      )}
      {Categery && (
        <>
          <div className="HomeMain">{filterEntity}</div>
          <Pagination
            Count={offSetCountForCategory}
            setCount={setoffSetCountForCategory}
          />
        </>
      )}
      {Gender && (
        <>
          <div className="HomeMain">{GenderEntity}</div>
          <Pagination
            Count={offSetCountForGender}
            setCount={setoffSetCountForGender}
          />
        </>
      )}
    </>
  );
};

export default Home;
