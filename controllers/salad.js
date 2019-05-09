'use strict';

const Salad = require('../models/Salad');

function getSalad(req, res) {
    let saladId = req.params.saladId

    Salad.findById(saladId, (err, salad) => {
        if (err) {
            return res.status(500).send({message: `Error al realizar la petición: ${err}`})
        }
        if (!salad) {
            return res.status(404).send({message:'Ensalada no encontrada'});
        }

        res.status(200).send(salad);
    });
}

function getSalads(req, res) {
    Salad.find({}, (err, salads) => {
        if (err) {
            return res.status(500).send({message:`Error al realizar la petición: ${err}`});
        }
        if (!salads) {
            return res.status(404).send(`No existe el recurso \"${salads}\"`);
        }

        var saladsArray = [];
        for (let i in salads) {
            saladsArray.push(salads[i]);
        }

        res.status(200).send(saladsArray);
    });
}

function postSalad(req, res) {
    console.log('POST /api/menu/salads');
    console.log(req.body);

    let salad = new Salad();
    salad.name = req.body.name;
    salad.description = req.body.description;
    salad.price = req.body.price;

    salad.save((err, saladStored) => {
        if (err) {
            return res.status(500).send({message:`Error al salvar en la base de datos: ${err}`});
        }

        res.status(200).send(saladStored);
    });
}

function updateSalad(req, res) {
    let saladId = req.params.saladId;
    let update = req.body;

    Salad.findByIdAndUpdate(saladId, update, (err, salad) => {
        if (err) {
            return res.status(500).send({message: `Error al realizar la petición: ${err}`});
        }
        
        res.status(200).send(salad);
    });
}

function deleteSalad(req, res) {
    let saladId = req.params.saladId;

    Salad.findById(saladId, (err, salad) => {
        if (err) {
            return res.status(500).send({message: `Error al realizar la petición: ${err}`});
        }
        if (!salad) {
            return res.status(404).send({message:'Ensalada no encontrada'});
        }

        salad.remove(err => {
            if (err) {
                return res.status(500).send({message: `Error al realizar la petición: ${err}`});
            }

            res.status(200).send({message: 'La ensalada ha sido eliminada'});
        });
    });
}

module.exports = {
    getSalad,
    getSalads,
    postSalad,
    updateSalad,
    deleteSalad
};