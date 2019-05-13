'use strict';

const RuedaWine = require('../models/RuedaWine');

function getRuedaWine(req, res) {
    let ruedaWineId = req.params.ruedaWineId

    RuedaWine.findById(ruedaWineId, (err, ruedaWine) => {
        if (err) {
            return res.status(500).send({message: `Error al realizar la petición: ${err}`})
        }
        if (!ruedaWine) {
            return res.status(404).send({message:'Vino no encontrado'});
        }

        res.status(200).send(ruedaWine);
    });
}

function getRuedaWines(req, res) {
    RuedaWine.find({}, (err, ruedaWines) => {
        if (err) {
            return res.status(500).send({message:`Error al realizar la petición: ${err}`});
        }
        if (!ruedaWines) {
            return res.status(404).send(`No existe el recurso \"${ruedaWines}\"`);
        }

        var ruedaWinesArray = [];
        for (let i in ruedaWines) {
            ruedaWinesArray.push(ruedaWines[i]);
        }

        res.status(200).send(ruedaWinesArray);
    });
}

function postRuedaWine(req, res) {
    console.log('POST /api/wines/RuedaWines');
    console.log(req.body);

    let ruedaWine = new RuedaWine();
    ruedaWine.type = req.body.type;
    ruedaWine.name = req.body.name;
    ruedaWine.information = req.body.information;
    ruedaWine.cupPrice = req.body.cupPrice;
    ruedaWine.bottlePrice = req.body.bottlePrice;

    ruedaWine.save((err, ruedaWineStored) => {
        if (err) {
            return res.status(500).send({message:`Error al salvar en la base de datos: ${err}`});
        }

        res.status(200).send(ruedaWineStored);
    });
}

function updateRuedaWine(req, res) {
    let ruedaWineId = req.params.ruedaWineId;
    let update = req.body;

    RuedaWine.findByIdAndUpdate(ruedaWineId, update, (err, ruedaWine) => {
        if (err) {
            return res.status(500).send({message: `Error al realizar la petición: ${err}`});
        }
        
        res.status(200).send(ruedaWine);
    });
}

function deleteRuedaWine(req, res) {
    let ruedaWineId = req.params.ruedaWineId;

    RuedaWine.findById(ruedaWineId, (err, ruedaWine) => {
        if (err) {
            return res.status(500).send({message: `Error al realizar la petición: ${err}`});
        }
        if (!ruedaWine) {
            return res.status(404).send({message:'Vino no encontrado'});
        }

        ruedaWine.remove(err => {
            if (err) {
                return res.status(500).send({message: `Error al realizar la petición: ${err}`});
            }

            res.status(200).send({message: 'El vino ha sido eliminado'});
        });
    });
}

module.exports = {
    getRuedaWine,
    getRuedaWines,
    postRuedaWine,
    updateRuedaWine,
    deleteRuedaWine
};