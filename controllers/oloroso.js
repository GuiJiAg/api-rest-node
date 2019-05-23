'use strict';

const Oloroso = require('../models/Oloroso');

function getOloroso(req, res) {
    let olorosoId = req.params.olorosoId

    Oloroso.findById(olorosoId, (err, oloroso) => {
        if (err) {
            return res.status(500).send({message: `Error al realizar la petición: ${err}`})
        }
        if (!oloroso) {
            return res.status(200).send({message:'Vino no encontrado'});
        }

        res.status(200).send(oloroso);
    });
}

function getOlorosos(req, res) {
    Oloroso.find({}, (err, olorosos) => {
        if (err) {
            return res.status(500).send({message:`Error al realizar la petición: ${err}`});
        }
        if (!olorosos) {
            return res.status(404).send(`No existe el recurso \"${olorosos}\"`);
        }

        var olorososArray = [];
        for (let i in olorosos) {
            olorososArray.push(olorosos[i]);
        }

        res.status(200).send(olorososArray);
    });
}

function postOloroso(req, res) {
    console.log('POST /api/wines/olorosos');
    console.log(req.body);

    let oloroso = new Oloroso();
    oloroso.type = req.body.type;
    oloroso.name = req.body.name;
    oloroso.information = req.body.information;
    oloroso.cupPrice = req.body.cupPrice;
    oloroso.bottlePrice = req.body.bottlePrice;

    oloroso.save((err, olorosoStored) => {
        if (err) {
            return res.status(500).send({message:`Error al salvar en la base de datos: ${err}`});
        }

        res.status(200).send(olorosoStored);
    });
}

function updateOloroso(req, res) {
    let olorosoId = req.params.olorosoId;
    let update = req.body;

    Oloroso.findByIdAndUpdate(olorosoId, update, (err, oloroso) => {
        if (err) {
            return res.status(500).send({message: `Error al realizar la petición: ${err}`});
        }
        
        res.status(200).send(oloroso);
    });
}

function deleteOloroso(req, res) {
    let olorosoId = req.params.olorosoId;

    Oloroso.findById(olorosoId, (err, oloroso) => {
        if (err) {
            return res.status(500).send({message: `Error al realizar la petición: ${err}`});
        }
        if (!oloroso) {
            return res.status(404).send({message:'Vino no encontrado'});
        }

        oloroso.remove(err => {
            if (err) {
                return res.status(500).send({message: `Error al realizar la petición: ${err}`});
            }

            res.status(200).send({message: 'El vino ha sido eliminado'});
        });
    });
}

module.exports = {
    getOloroso,
    getOlorosos,
    postOloroso,
    updateOloroso,
    deleteOloroso
};