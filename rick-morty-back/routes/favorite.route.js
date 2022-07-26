const express = require('express');
const passport = require('passport');
const app = express ();

const { addFavorite, deleteFavorite, getFavorites } = require('../controllers/favorite.controller');

app.get('/', passport.authenticate('jwt', { session: false }), getFavorites);
app.post('/', passport.authenticate('jwt', { session: false }), addFavorite);
app.delete('/', passport.authenticate('jwt', { session: false }), deleteFavorite);

module.exports = app;