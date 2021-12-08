'use strict';

require('dotenv').config();
require('./src/db/connection');
const express = require('express');
const bodyParser = require('body-parser');
const router = require('./src/routes/auth');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/api',router);

module.exports = app;
