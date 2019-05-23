'use strict';

const RiberaWine = require('../models/RiberaWine');

function getRiberaWine(req, res) {
    let riberaWineId = req.params.riberaWineId

    RiberaWine.findById(riberaWineId, (err, riberaWine) => {
        if (err) {
            return res.status(500).send({message: `Error al realizar la petición: ${err}`})
        }
        if (!riberaWine) {
            return res.status(200).send({message:'Vino no encontrado'});
        }

        res.status(200).send(riberaWine);
    });
}

function getRiberaWines(req, res) {
    RiberaWine.find({}, (err, riberaWines) => {
        if (err) {
            return res.status(500).send({message:`Error al realizar la petición: ${err}`});
        }
        if (!riberaWines) {
            return res.status(404).send(`No existe el recurso \"${riberaWines}\"`);
        }

        var riberaWinesArray = [];
        for (let i in riberaWines) {
            riberaWinesArray.push(riberaWines[i]);
        }

        res.status(200).send(riberaWinesArray);
    });
}

function postRiberaWine(req, res) {
    console.log('POST /api/wines/RiberaWines');
    console.log(req.body);

    let riberaWine = new RiberaWine();
    riberaWine.type = req.body.type;
    riberaWine.name = req.body.name;
    riberaWine.information = req.body.information;
    riberaWine.cupPrice = req.body.cupPrice;
    riberaWine.bottlePrice = req.body.bottlePrice;

    riberaWine.save((err, riberaWineStored) => {
        if (err) {
            return res.status(500).send({message:`Error al salvar en la base de datos: ${err}`});
        }

        res.status(200).send(riberaWineStored);
    });
}

function updateRiberaWine(req, res) {
    let riberaWineId = req.params.riberaWineId;
    let update = req.body;

    RiberaWine.findByIdAndUpdate(riberaWineId, update, (err, riberaWine) => {
        if (err) {
            return res.status(500).send({message: `Error al realizar la petición: ${err}`});
        }
        
        res.status(200).send(riberaWine);
    });
}

function deleteRiberaWine(req, res) {
    let riberaWineId = req.params.riberaWineId;

    RiberaWine.findById(riberaWineId, (err, riberaWine) => {
        if (err) {
            return res.status(500).send({message: `Error al realizar la petición: ${err}`});
        }
        if (!riberaWine) {
            return res.status(404).send({message:'Vino no encontrado'});
        }

        riberaWine.remove(err => {
            if (err) {
                return res.status(500).send({message: `Error al realizar la petición: ${err}`});
            }

            res.status(200).send({message: 'El vino ha sido eliminado'});
        });
    });
}

module.exports = {
    getRiberaWine,
    getRiberaWines,
    postRiberaWine,
    updateRiberaWine,
    deleteRiberaWine
};