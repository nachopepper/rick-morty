const express = require('express');
const cors = require('cors');
const app = express();
const passport = require('passport');

const { dbConnection } = require('./database/config');
require('dotenv').config({ path: './.env' })

const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(cors({ origin: '*' }));
app.use(passport.initialize());
require('./config/passport');
app.use('/api', require('./routes/index'));
dbConnection();
app.listen(process.env.PORT, () => {
    console.log('Escuchando puerto: ', process.env.PORT);
});

