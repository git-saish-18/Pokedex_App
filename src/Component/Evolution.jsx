import React, { useState, useEffect } from "react";
import "../CSS/Pokemon.css";
import "../CSS/Mobile.css";
const color = require("../Colors/color");
const MyComp = (props) => {
  const [name, setname] = useState();
  const [imgurl, setimgurl] = useState();
  const [backcolor, setbackcolor] = useState();
  const pull = async () => {
    const url = `https://pokeapi.co/api/v2/pokemon/${props.id}/`;
    const response = await fetch(url);
    const responsedata = await response.json();
    setname(responsedata.name);
    setimgurl(responsedata.sprites.other.dream_world.front_default);
    let arr = [];
    responsedata.types.forEach((element) => {
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
    pull();
  },[]);
  return (
    <>
      <div className="Variant1  " style={backcolor}>
        <img src={imgurl} alt="" className="PokvarientImg" />
        <h3 className="PokVarientName">{name}</h3>
        <p className="PokVarientId">{parseInt(props.id)}</p>
      </div>
    </>
  );
};

const Evolution = (props) => {
  return (
    <>
      {props.EvalutionArray.map((ele, index) => {
        let id = ele.url.substring(42).replace("/", "");
        return <MyComp id={id} key={index} />;
      })}
    </>
  );
};

export default Evolution;
