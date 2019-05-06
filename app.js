'use strict'

const express = require('./node_modules/express');
const bodyParser = require('./node_modules/body-parser');
const app = express();
const api = require('./routes/index');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api', api);

module.exports = app;