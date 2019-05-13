'use strict';

const RiojaWine = require('../models/RiojaWine');

function getRiojaWine(req, res) {
    let riojaWineId = req.params.riojaWineId

    RiojaWine.findById(riojaWineId, (err, riojaWine) => {
        if (err) {
            return res.status(500).send({message: `Error al realizar la petición: ${err}`})
        }
        if (!riojaWine) {
            return res.status(404).send({message:'Vino no encontrado'});
        }

        res.status(200).send(riojaWine);
    });
}

function getRiojaWines(req, res) {
    RiojaWine.find({}, (err, riojaWines) => {
        if (err) {
            return res.status(500).send({message:`Error al realizar la petición: ${err}`});
        }
        if (!riojaWines) {
            return res.status(404).send(`No existe el recurso \"${riojaWines}\"`);
        }

        var riojaWinesArray = [];
        for (let i in riojaWines) {
            riojaWinesArray.push(riojaWines[i]);
        }

        res.status(200).send(riojaWinesArray);
    });
}

function postRiojaWine(req, res) {
    console.log('POST /api/wines/RiojaWines');
    console.log(req.body);

    let riojaWine = new RiojaWine();
    riojaWine.type = req.body.type;
    riojaWine.name = req.body.name;
    riojaWine.information = req.body.information;
    riojaWine.cupPrice = req.body.cupPrice;
    riojaWine.bottlePrice = req.body.bottlePrice;

    riojaWine.save((err, riojaWineStored) => {
        if (err) {
            return res.status(500).send({message:`Error al salvar en la base de datos: ${err}`});
        }

        res.status(200).send(riojaWineStored);
    });
}

function updateRiojaWine(req, res) {
    let riojaWineId = req.params.riojaWineId;
    let update = req.body;

    RiojaWine.findByIdAndUpdate(riojaWineId, update, (err, riojaWine) => {
        if (err) {
            return res.status(500).send({message: `Error al realizar la petición: ${err}`});
        }
        
        res.status(200).send(riojaWine);
    });
}

function deleteRiojaWine(req, res) {
    let riojaWineId = req.params.riojaWineId;

    RiojaWine.findById(riojaWineId, (err, riojaWine) => {
        if (err) {
            return res.status(500).send({message: `Error al realizar la petición: ${err}`});
        }
        if (!riojaWine) {
            return res.status(404).send({message:'Vino no encontrado'});
        }

        riojaWine.remove(err => {
            if (err) {
                return res.status(500).send({message: `Error al realizar la petición: ${err}`});
            }

            res.status(200).send({message: 'El vino ha sido eliminado'});
        });
    });
}

module.exports = {
    getRiojaWine,
    getRiojaWines,
    postRiojaWine,
    updateRiojaWine,
    deleteRiojaWine
};