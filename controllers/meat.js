'use strict';

const Meat = require('../models/Meat');

function getMeat(req, res) {
    let meatId = req.params.meatId

    Meat.findById(meatId, (err, meat) => {
        if (err) {
            return res.status(500).send({message: `Error al realizar la petición: ${err}`})
        }
        if (!meat) {
            return res.status(200).send({message:'Carne no encontrada'});
        }

        res.status(200).send(meat);
    });
}

function getMeats(req, res) {
    Meat.find({}, (err, meats) => {
        if (err) {
            return res.status(500).send({message:`Error al realizar la petición: ${err}`});
        }
        if (!meats) {
            return res.status(404).send(`No existe el recurso \"${meats}\"`);
        }

        var meatsArray = [];
        for (let i in meats) {
            meatsArray.push(meats[i]);
        }

        res.status(200).send(meatsArray);
    });
}

function postMeat(req, res) {
    console.log('POST /api/menu/meats');
    console.log(req.body);

    let meat = new Meat();
    meat.name = req.body.name;
    meat.description = req.body.description;
    meat.price = req.body.price;

    meat.save((err, meatStored) => {
        if (err) {
            return res.status(500).send({message:`Error al salvar en la base de datos: ${err}`});
        }

        res.status(200).send(meatStored);
    });
}

function updateMeat(req, res) {
    let meatId = req.params.meatId;
    let update = req.body;

    Meat.findByIdAndUpdate(meatId, update, (err, meat) => {
        if (err) {
            return res.status(500).send({message: `Error al realizar la petición: ${err}`});
        }
        
        res.status(200).send(meat);
    });
}

function deleteMeat(req, res) {
    let meatId = req.params.meatId;

    Meat.findById(meatId, (err, meat) => {
        if (err) {
            return res.status(500).send({message: `Error al realizar la petición: ${err}`});
        }
        if (!meat) {
            return res.status(404).send({message:'Carne no encontrada'});
        }

        meat.remove(err => {
            if (err) {
                return res.status(500).send({message: `Error al realizar la petición: ${err}`});
            }

            res.status(200).send({message: 'La tosta ha sido eliminada'});
        });
    });
}

module.exports = {
    getMeat,
    getMeats,
    postMeat,
    updateMeat,
    deleteMeat
};