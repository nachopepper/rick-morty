const User = require("../models/user.model");

const { fetchFavorites } = require("../helpers/getFavorites");

const addFavorite = async (req, res) => {
  try {
    const characterId = parseInt(req.body.characterId);
    const findFavorite = req.user.favorites.find((el) => el === characterId);
    if (findFavorite) {
      return res.status(400).json({
        ok: false,
        message: "Personaje ya está en lista de favoritos",
      });
    }

    await User.updateMany(
      { _id: req.user.id },
      { $push: { favorites: characterId } }
    );

    return res.status(200).json({
      ok: true,
      message: "Personaje añadido correctamente",
    });
  } catch (e) {
    return res.status(400).json({
      ok: false,
      message: "Error inesperado",
    });
  }
};

const deleteFavorite = async (req, res) => {
  try {
    const characterId = parseInt(req.body.characterId);
    const findFavorite = req.user.favorites.indexOf(characterId);

    if (findFavorite === -1) {
      return res.status(400).json({
        ok: false,
        message: "Personaje no está en lista de favoritos",
      });
    }

    let arrayCopy = req.user.favorites;
    arrayCopy.splice(findFavorite, 1);
    await User.updateMany(
      { _id: req.user.id },
      { $pull: { favorites: characterId } }
    );

    const data = await fetchFavorites(arrayCopy);
    return res.status(200).json({
      ok: true,
      message: "Personaje eliminado correctamente",
      results: data,
    });
  } catch (e) {
    return res.status(400).json({
      ok: false,
      message: "Error inesperado",
    });
  }
};

const getFavorites = async (req, res) => {
  try {
    const favorites = req.user.favorites;

    const data = await fetchFavorites(favorites);
    return res.status(200).json({
      ok: true,
      results: data,
    });
  } catch (e) {
    return res.status(400).json({
      ok: false,
      message: "Error inesperado",
    });
  }
};

module.exports = {
  addFavorite,
  deleteFavorite,
  getFavorites,
};
