const express = require('express');
const app = express ();

const { getCharacters, filterCharacters } = require('../controllers/character.controller');

app.get('/getCharacters', getCharacters);
app.post('/filterCharacters', filterCharacters);


module.exports = app;