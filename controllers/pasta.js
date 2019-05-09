'use strict';

const Pasta = require('../models/Pasta');

function getPasta(req, res) {
    let pastaId = req.params.pastaId

    Pasta.findById(pastaId, (err, pasta) => {
        if (err) {
            return res.status(500).send({message: `Error al realizar la petición: ${err}`})
        }
        if (!pasta) {
            return res.status(404).send({message:'Pasta no encontrada'});
        }

        res.status(200).send(pasta);
    });
}

function getPastas(req, res) {
    Pasta.find({}, (err, pastas) => {
        if (err) {
            return res.status(500).send({message:`Error al realizar la petición: ${err}`});
        }
        if (!pastas) {
            return res.status(404).send(`No existe el recurso \"${pastas}\"`);
        }

        var pastasArray = [];
        for (let i in pastas) {
            pastasArray.push(pastas[i]);
        }

        res.status(200).send(pastasArray);
    });
}

function postPasta(req, res) {
    console.log('POST /api/menu/pastas');
    console.log(req.body);

    let pasta = new Pasta();
    pasta.name = req.body.name;
    pasta.description = req.body.description;
    pasta.price = req.body.price;

    pasta.save((err, pastaStored) => {
        if (err) {
            return res.status(500).send({message:`Error al salvar en la base de datos: ${err}`});
        }

        res.status(200).send(pastaStored);
    });
}

function updatePasta(req, res) {
    let pastaId = req.params.pastaId;
    let update = req.body;

    Pasta.findByIdAndUpdate(pastaId, update, (err, pasta) => {
        if (err) {
            return res.status(500).send({message: `Error al realizar la petición: ${err}`});
        }
        
        res.status(200).send(pasta);
    });
}

function deletePasta(req, res) {
    let pastaId = req.params.pastaId;

    Pasta.findById(pastaId, (err, pasta) => {
        if (err) {
            return res.status(500).send({message: `Error al realizar la petición: ${err}`});
        }
        if (!pasta) {
            return res.status(404).send({message:'Pasta no encontrada'});
        }

        pasta.remove(err => {
            if (err) {
                return res.status(500).send({message: `Error al realizar la petición: ${err}`});
            }

            res.status(200).send({message: 'La pasta ha sido eliminada'});
        });
    });
}

module.exports = {
    getPasta,
    getPastas,
    postPasta,
    updatePasta,
    deletePasta
};