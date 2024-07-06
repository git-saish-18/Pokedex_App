export const API = {
  GET_SINGLE: (id) => {
    return `https://pokeapi.co/api/v2/pokemon/${id}/`;
  },
  GET_ALL: (offSetCount) => {
    return `https://pokeapi.co/api/v2/pokemon?offset=${offSetCount}&limit=20`;
  },
  GET_CATEGORY: (Categery) => {
    return `https://pokeapi.co/api/v2/type/${Categery}`;
  },
  GET_GENDER: (Gender) => {
    return `https://pokeapi.co/api/v2/gender/${Gender}`;
  },
};

export const GenderType = ["female", "male", "genderless"];

export const FilterTypes = [
  "normal",
  "fighting",
  "flying",
  "poison",
  "ground",
  "rock",
];
