'use strict';

const Dessert = require('../models/Dessert');

function getDessert(req, res) {
    let dessertId = req.params.dessertId

    Dessert.findById(dessertId, (err, dessert) => {
        if (err) {
            return res.status(500).send({message: `Error al realizar la petición: ${err}`})
        }
        if (!dessert) {
            return res.status(404).send({message:'Postre no encontrado'});
        }

        res.status(200).send(dessert);
    });
}

function getDesserts(req, res) {
    Dessert.find({}, (err, desserts) => {
        if (err) {
            return res.status(500).send({message:`Error al realizar la petición: ${err}`});
        }
        if (!desserts) {
            return res.status(404).send(`No existe el recurso \"${desserts}\"`);
        }

        var dessertsArray = [];
        for (let i in desserts) {
            dessertsArray.push(desserts[i]);
        }

        res.status(200).send(dessertsArray);
    });
}

function postDessert(req, res) {
    console.log('POST /api/menu/desserts');
    console.log(req.body);

    let dessert = new Dessert();
    dessert.name = req.body.name;
    dessert.description = req.body.description;
    dessert.price = req.body.price;

    dessert.save((err, dessertStored) => {
        if (err) {
            return res.status(500).send({message:`Error al salvar en la base de datos: ${err}`});
        }

        res.status(200).send(dessertStored);
    });
}

function updateDessert(req, res) {
    let dessertId = req.params.dessertId;
    let update = req.body;

    Dessert.findByIdAndUpdate(dessertId, update, (err, dessert) => {
        if (err) {
            return res.status(500).send({message: `Error al realizar la petición: ${err}`});
        }
        
        res.status(200).send(dessert);
    });
}

function deleteDessert(req, res) {
    let dessertId = req.params.dessertId;

    Dessert.findById(dessertId, (err, dessert) => {
        if (err) {
            return res.status(500).send({message: `Error al realizar la petición: ${err}`});
        }
        if (!dessert) {
            return res.status(404).send({message:'Postre no encontrado'});
        }

        dessert.remove(err => {
            if (err) {
                return res.status(500).send({message: `Error al realizar la petición: ${err}`});
            }

            res.status(200).send({message: 'El postre ha sido eliminado'});
        });
    });
}

module.exports = {
    getDessert,
    getDesserts,
    postDessert,
    updateDessert,
    deleteDessert
};