const express = require('express');
const app = express();

app.use('/user/', require('./user.route'));
app.use('/character/', require('./character.route'));
app.use('/favorite/', require('./favorite.route'));

module.exports = app;
