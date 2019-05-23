'use strict';

const Albarinio = require('../models/Albarinio');

function getAlbarinio(req, res) {
    let albarinioId = req.params.albarinioId

    Albarinio.findById(albarinioId, (err, albarinio) => {
        if (err) {
            return res.status(500).send({message: `Error al realizar la petición: ${err}`})
        }
        if (!albarinio) {
            return res.status(200).send({message:'Vino no encontrado'});
        }

        res.status(200).send(albarinio);
    });
}

function getAlbarinios(req, res) {
    Albarinio.find({}, (err, albarinios) => {
        if (err) {
            return res.status(500).send({message:`Error al realizar la petición: ${err}`});
        }
        if (!albarinios) {
            return res.status(404).send(`No existe el recurso \"${albarinios}\"`);
        }

        var albariniosArray = [];
        for (let i in albarinios) {
            albariniosArray.push(albarinios[i]);
        }

        res.status(200).send(albariniosArray);
    });
}

function postAlbarinio(req, res) {
    console.log('POST /api/wines/albarinios');
    console.log(req.body);

    let albarinio = new Albarinio();
    albarinio.type = req.body.type;
    albarinio.name = req.body.name;
    albarinio.information = req.body.information;
    albarinio.cupPrice = req.body.cupPrice;
    albarinio.bottlePrice = req.body.bottlePrice;

    albarinio.save((err, albarinioStored) => {
        if (err) {
            return res.status(500).send({message:`Error al salvar en la base de datos: ${err}`});
        }

        res.status(200).send(albarinioStored);
    });
}

function updateAlbarinio(req, res) {
    let albarinioId = req.params.albarinioId;
    let update = req.body;

    Albarinio.findByIdAndUpdate(albarinioId, update, (err, albarinio) => {
        if (err) {
            return res.status(500).send({message: `Error al realizar la petición: ${err}`});
        }
        
        res.status(200).send(albarinio);
    });
}

function deleteAlbarinio(req, res) {
    let albarinioId = req.params.albarinioId;

    Albarinio.findById(albarinioId, (err, albarinio) => {
        if (err) {
            return res.status(500).send({message: `Error al realizar la petición: ${err}`});
        }
        if (!albarinio) {
            return res.status(404).send({message:'Vino no encontrado'});
        }

        albarinio.remove(err => {
            if (err) {
                return res.status(500).send({message: `Error al realizar la petición: ${err}`});
            }

            res.status(200).send({message: 'El vino ha sido eliminado'});
        });
    });
}

module.exports = {
    getAlbarinio,
    getAlbarinios,
    postAlbarinio,
    updateAlbarinio,
    deleteAlbarinio
};