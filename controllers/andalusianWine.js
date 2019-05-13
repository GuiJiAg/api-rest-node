'use strict';

const AndalusianWine = require('../models/AndalusianWine');

function getAndalusianWine(req, res) {
    let andalusianWineId = req.params.andalusianWineId

    AndalusianWine.findById(andalusianWineId, (err, andalusianWine) => {
        if (err) {
            return res.status(500).send({message: `Error al realizar la petición: ${err}`})
        }
        if (!andalusianWine) {
            return res.status(404).send({message:'Vino no encontrado'});
        }

        res.status(200).send(andalusianWine);
    });
}

function getAndalusianWines(req, res) {
    AndalusianWine.find({}, (err, andalusianWines) => {
        if (err) {
            return res.status(500).send({message:`Error al realizar la petición: ${err}`});
        }
        if (!andalusianWines) {
            return res.status(404).send(`No existe el recurso \"${andalusianWines}\"`);
        }

        var andalusianWinesArray = [];
        for (let i in andalusianWines) {
            andalusianWinesArray.push(andalusianWines[i]);
        }

        res.status(200).send(andalusianWinesArray);
    });
}

function postAndalusianWine(req, res) {
    console.log('POST /api/wines/andalusianWines');
    console.log(req.body);

    let andalusianWine = new AndalusianWine();
    andalusianWine.type = req.body.type;
    andalusianWine.name = req.body.name;
    andalusianWine.information = req.body.information;
    andalusianWine.cupPrice = req.body.cupPrice;
    andalusianWine.bottlePrice = req.body.bottlePrice;

    andalusianWine.save((err, andalusianWineStored) => {
        if (err) {
            return res.status(500).send({message:`Error al salvar en la base de datos: ${err}`});
        }

        res.status(200).send(andalusianWineStored);
    });
}

function updateAndalusianWine(req, res) {
    let andalusianWineId = req.params.andalusianWineId;
    let update = req.body;

    AndalusianWine.findByIdAndUpdate(andalusianWineId, update, (err, andalusianWine) => {
        if (err) {
            return res.status(500).send({message: `Error al realizar la petición: ${err}`});
        }
        
        res.status(200).send(andalusianWine);
    });
}

function deleteAndalusianWine(req, res) {
    let andalusianWineId = req.params.andalusianWineId;

    AndalusianWine.findById(andalusianWineId, (err, andalusianWine) => {
        if (err) {
            return res.status(500).send({message: `Error al realizar la petición: ${err}`});
        }
        if (!andalusianWine) {
            return res.status(404).send({message:'Vino no encontrado'});
        }

        andalusianWine.remove(err => {
            if (err) {
                return res.status(500).send({message: `Error al realizar la petición: ${err}`});
            }

            res.status(200).send({message: 'El vino ha sido eliminado'});
        });
    });
}

module.exports = {
    getAndalusianWine,
    getAndalusianWines,
    postAndalusianWine,
    updateAndalusianWine,
    deleteAndalusianWine
};