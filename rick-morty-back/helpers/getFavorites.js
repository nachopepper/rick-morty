const axios = require("axios");

const endPointAPI = 'https://rickandmortyapi.com/api/character';

const fetchFavorites = async (favorites = []) => {
  if (favorites.length === 0) return favorites;
  const endpoint = endPointAPI + "/" + favorites + ",";
  const { data } = await axios.get(endpoint);
  return data;
};


module.exports = {
  fetchFavorites,
  endPointAPI
};
