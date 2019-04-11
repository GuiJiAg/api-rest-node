'use strict'

const express = require('./node_modules/express');
const bodyParser = require('./node_modules/body-parser');

const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/api/menu/carnes', (req, res) => {
    res.send(200, { menu: { carnes: [] }});
});

app.get('/api/menu/carnes/:carneId', (req, res) => {

});

app.post('/api/manu/carnes/', (req, res) => {
    console.log(req.body);
    res.send(200, {message: 'El producto se ha recibido'});
});

app.put('/api/menu/carnes/:carneId', (req, res) => {

});

app.delete('/api/menu/carnes/:carneId', (req, res) => {

});

app.listen(port, () => {
    console.log(`API REST corriendo en un http://localhost:${port}`);
});