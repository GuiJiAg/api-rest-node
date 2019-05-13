'use strict';

const CastillaWine = require('../models/CastillaWine');

function getCastillaWine(req, res) {
    let castillaWineId = req.params.castillaWineId

    CastillaWine.findById(castillaWineId, (err, castillaWine) => {
        if (err) {
            return res.status(500).send({message: `Error al realizar la petición: ${err}`})
        }
        if (!castillaWine) {
            return res.status(404).send({message:'Vino no encontrado'});
        }

        res.status(200).send(castillaWine);
    });
}

function getCastillaWines(req, res) {
    CastillaWine.find({}, (err, castillaWines) => {
        if (err) {
            return res.status(500).send({message:`Error al realizar la petición: ${err}`});
        }
        if (!castillaWines) {
            return res.status(404).send(`No existe el recurso \"${castillaWines}\"`);
        }

        var castillaWinesArray = [];
        for (let i in castillaWines) {
            castillaWinesArray.push(castillaWines[i]);
        }

        res.status(200).send(castillaWinesArray);
    });
}

function postCastillaWine(req, res) {
    console.log('POST /api/wines/CastillaWines');
    console.log(req.body);

    let castillaWine = new CastillaWine();
    castillaWine.type = req.body.type;
    castillaWine.name = req.body.name;
    castillaWine.information = req.body.information;
    castillaWine.cupPrice = req.body.cupPrice;
    castillaWine.bottlePrice = req.body.bottlePrice;

    castillaWine.save((err, castillaWineStored) => {
        if (err) {
            return res.status(500).send({message:`Error al salvar en la base de datos: ${err}`});
        }

        res.status(200).send(castillaWineStored);
    });
}

function updateCastillaWine(req, res) {
    let castillaWineId = req.params.castillaWineId;
    let update = req.body;

    CastillaWine.findByIdAndUpdate(castillaWineId, update, (err, castillaWine) => {
        if (err) {
            return res.status(500).send({message: `Error al realizar la petición: ${err}`});
        }
        
        res.status(200).send(castillaWine);
    });
}

function deleteCastillaWine(req, res) {
    let castillaWineId = req.params.castillaWineId;

    CastillaWine.findById(castillaWineId, (err, castillaWine) => {
        if (err) {
            return res.status(500).send({message: `Error al realizar la petición: ${err}`});
        }
        if (!castillaWine) {
            return res.status(404).send({message:'Vino no encontrado'});
        }

        castillaWine.remove(err => {
            if (err) {
                return res.status(500).send({message: `Error al realizar la petición: ${err}`});
            }

            res.status(200).send({message: 'El vino ha sido eliminado'});
        });
    });
}

module.exports = {
    getCastillaWine,
    getCastillaWines,
    postCastillaWine,
    updateCastillaWine,
    deleteCastillaWine
};