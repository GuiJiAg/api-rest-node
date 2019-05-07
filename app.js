'use strict'

const express = require('./node_modules/express');
const bodyParser = require('./node_modules/body-parser');
const hbs = require('express-handlebars');
const app = express();
const api = require('./routes/index');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.engine('.hbs', hbs({
    defaultLayout: 'default',
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

app.use('/api', api);
app.get('/login', (req, res) => {
    res.render('login');
});
app.get('/menu/entrees', (req, res) => {
    res.render('entrees');
});

module.exports = app;