import React, { useEffect, useState } from "react";
import "../CSS/Pokemon.css";
import "../CSS/PopUpModel.css";
const color = require("../Colors/color");
const Pokemon = (props) => {
  const [imglink, setimglink] = useState({});
  const [backcolor, setbackcolor] = useState({});
  const [component, setcomponent] = useState();
  
  
  // popup component
  const close = () => {
    setcomponent("");
  };

  const PopUpModel = (props) => {
    return (
      <>
        <div className="model" onClick={close}></div>
        <div className="container">
          <div className="PokImgContainer" style={backcolor}>
            <img
              src={props.Indivisual.sprites.other.dream_world.front_default}
              alt="Pokemonimg"
              className="PokImg1"
              />
          </div>
          <div className="PokName">{props.Indivisual.name}</div>
          <div className="Line1">|</div>
          <div className="PokID">{props.Indivisual.id}</div>
          <div className="Line2">|</div>
          <button className="closeBtn" onClick={close}>
            X
          </button>
          <div className="PokInfo">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam
            quibusdam voluptatem quam expedita quas quo rerum, ducimus magni
            placeat quisquam dolor exercitationem perspiciatis quos tempore
            necessitatibus ipsa modi, sit eos!
          </div>
          <div className="hight">
            <li>
              <label className="label" htmlFor="">
                Height
              </label>
            </li>
            <li>{Math.round(props.Indivisual.height / 3)}</li>
            <li className="downSkill">
              <label htmlFor="">Abilities</label>
            </li>
            <li className="downSkill">
              <span>{props.ability1}</span>{" "}
              <span>
                {props.ability2 === ""
                  ? ""
                  : props.ability2}
              </span>
            </li>
          </div>
          <div className="Weight">
            <li>
              <label htmlFor="">Weight</label>
            </li>
            <li>{props.Indivisual.weight / 10}Kg</li>
            <li className="downSkill">
              <label htmlFor="">Types</label>
            </li>
            <li className="downSkill">
              <span
                className="special "
                style={{
                  backgroundColor: `${color[props.type1]}`,
                }}
                >
                {props.type1}
              </span>{" "}
              <span
                className="special"
                id="types2"
                style={{
                  backgroundColor: `${color[props.type2]}`,
                }}
                >
                {props.Indivisual.types === undefined ? null : props.type2}
              </span>
            </li>
          </div>
          <div className="Gender">
            <li>
              <label htmlFor="">Gender</label>
            </li>
            <li>
              <span>Male</span> <span>Female</span>
            </li>
            <li className="downSkill">
              <label htmlFor="">Weak Against</label>
            </li>
            <li className="downSkill">
              <span className="special">Fire</span>{" "}
              <span className="special">Flying</span>
            </li>
            <li className="downSkill">
              <span className="special">Fire</span>{" "}
              <span className="special">Flying</span>
            </li>
          </div>

          <div className="EggsGroups">
            <li>
              <label htmlFor="">Eggs Groups</label>
            </li>
            <li>
              <span>Male</span>,<span>Female</span>
            </li>
          </div>

          <div className="statscol1">
            <h1 className="Statshead ">Stats</h1>
            <li className="StatsName1">
              {props.Indivisual.stats[0].stat.name}
              <progress
                className="pogressbar1"
                value={props.Indivisual.stats[0].base_stat}
                max="100"
                />
            </li>
            <li className="StatsName2">
              {props.Indivisual.stats[1].stat.name}
              <progress
                className="pogressbar2"
                value={props.Indivisual.stats[1].base_stat}
                max="100"
                />
            </li>
            <li className="StatsName3">
              Sp.{props.Indivisual.stats[3].stat.name.substring(8)}{" "}
              <progress
                className="pogressbar3"
                value={props.Indivisual.stats[3].base_stat}
                max="100"
                />
            </li>
          </div>
          <div className="statscol2">
            <li className="StatsName4">
              {props.Indivisual.stats[5].stat.name}
              <progress
                className="pogressbar4"
                value={props.Indivisual.stats[5].base_stat}
                max="100"
                />
              <li className="StatsName5">
                {props.Indivisual.stats[2].stat.name}

                <progress
                  className="pogressbar5"
                  value={props.Indivisual.stats[2].base_stat}
                  max="100"
                  />
              </li>
              <li className="StatsName6">
                Sp. {props.Indivisual.stats[4].stat.name.substring(8)}
                <progress
                  className="pogressbar6"
                  value={props.Indivisual.stats[4].base_stat}
                  max="100"
                  />
              </li>
            </li>
          </div>
          <h1>Evalution</h1>
          <div className="container2">
            <div className="Variant1  " style={backcolor}>
              <img src="samplePok.png" alt="" className="PokvarientImg" />
              <h3 className="PokVarientName">Name</h3>
              <p className="PokVarientId">Id</p>
            </div>
            <h3 className="Arrow">--></h3>
            <div className="Variant2" style={backcolor}>
              <img src="samplePok.png" alt="" className="PokvarientImg" />
              <h3 className="PokVarientName">Name</h3>
              <p className="PokVarientId">Id</p>
            </div>
            <h3 className="Arrow">--></h3>
            <div className="Variant3" style={backcolor}>
              <img src="samplePok.png" className="PokvarientImg" />
              <h3 className="PokVarientName">Name</h3>
              <p className="PokVarientId">Id</p>
            </div>
          </div>
        </div>
      </>
    );
  };
  
  const popupMycomponent = async () => {
    const url = `https://pokeapi.co/api/v2/pokemon/${props.index}/`;
    const responace = await fetch(url);
    const Indivisual = await responace.json();
    
    let ability1="";
    let ability2="";
    if(Indivisual.abilities.length===2)
    {
      ability1=Indivisual.abilities[0].ability.name;
      ability2=Indivisual.abilities[1].ability.name;
    }else
    {
      ability1=Indivisual.abilities[0].ability.name;
      ability2="";
    }
    let arr = [];
    Indivisual.types.forEach((element) => {
      arr.push(element.type.name);
      const backgroundColor = {
        backgroundImage: `linear-gradient(${color[arr[0]]},${
          color[arr[1] === undefined ? arr[0] : arr[1]]
        })`,
      };
      setbackcolor(backgroundColor);
    });
    let popupcomponent = (
      <PopUpModel
        Indivisual={Indivisual}
        backcolor={backcolor}
        type1={arr[0]}
        type2={arr[1]}
        ability1={ability1}
        ability2={ability2}
      />
    );
    setcomponent(popupcomponent);
  };

  const getImgColor = async () => {
    const url = `https://pokeapi.co/api/v2/pokemon/${props.index}/`;
    const responace = await fetch(url);
    const Indivisual = await responace.json();
    setimglink(Indivisual.sprites.other.dream_world.front_default);
    let arr = [];
    Indivisual.types.forEach((element) => {
      arr.push(element.type.name);
      const backgroundColor = {
        backgroundImage: `linear-gradient(${color[arr[0]]},${
          color[arr[1] === undefined ? arr[0] : arr[1]]
        })`,
      };
      setbackcolor(backgroundColor);
    });
  };

  useEffect(() => {
    getImgColor();
  },);

  return (
    <>
      <div style={backcolor} className="main">
        <img
          src={props.imgurl === undefined ? imglink : props.imgurl}
          alt=""
          className="pokemonImg"
          onClick={popupMycomponent}
        />
        <h3 className="pokemoName">{props.data.name}</h3>
        <h4 className="pokemoId ">{props.index}</h4>
      </div>
      <span>{component}</span>
    </>
  );
};

export default Pokemon;
