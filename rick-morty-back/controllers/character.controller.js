const axios = require("axios");
const { endPointAPI } = require("../helpers/getFavorites");

const getCharacters = async (req, res) => {
  try {
    const query = req.query;
    const page = query.page;

    const endPoint = endPointAPI + "?page=" + page;
    const { data } = await axios.get(endPoint);
    const { info, results } = data;

    return res.status(200).json({
      ok: true,
      info,
      results,
    });
  } catch (e) {
    return res.status(400).json({
      ok: false,
      message: "Error inesperado",
    });
  }
};

const filterCharacters = async (req, res) => {
  try {
    const body = req.body;

    const page = body.page;
    const name = body.name.trim();
    const status = body.status;
    const gender = body.gender;

    const endPoint =
      endPointAPI +
      "/?page=" +
      page +
      "&name=" +
      name +
      "&status=" +
      status +
      "&gender=" +
      gender;

    const { data } = await axios.get(endPoint);
    const { info, results } = data;

    return res.status(200).json({
      ok: true,
      info,
      results,
    });
  } catch (e) {
    return res.status(404).json({
      ok: false,
      info: [],
      results: [],
      message: "No existen personajes.",
    });
  }
};

module.exports = {
  getCharacters,
  filterCharacters,
};
