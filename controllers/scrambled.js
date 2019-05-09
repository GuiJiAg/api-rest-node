'use strict';

const Scrambled = require('../models/Scrambled');

function getScrambled(req, res) {
    let scrambledId = req.params.scrambledId

    Scrambled.findById(scrambledId, (err, scrambled) => {
        if (err) {
            return res.status(500).send({message: `Error al realizar la petición: ${err}`})
        }
        if (!scrambled) {
            return res.status(404).send({message:'Revuelto no encontrado'});
        }

        res.status(200).send(scrambled);
    });
}

function getScrambleds(req, res) {
    Scrambled.find({}, (err, scrambleds) => {
        if (err) {
            return res.status(500).send({message:`Error al realizar la petición: ${err}`});
        }
        if (!scrambleds) {
            return res.status(404).send(`No existe el recurso \"${scrambleds}\"`);
        }

        var scrambledsArray = [];
        for (let i in scrambleds) {
            scrambledsArray.push(scrambleds[i]);
        }

        res.status(200).send(scrambledsArray);
    });
}

function postScrambled(req, res) {
    console.log('POST /api/menu/scrambleds');
    console.log(req.body);

    let scrambled = new Scrambled();
    scrambled.name = req.body.name;
    scrambled.description = req.body.description;
    scrambled.price = req.body.price;

    scrambled.save((err, scrambledStored) => {
        if (err) {
            return res.status(500).send({message:`Error al salvar en la base de datos: ${err}`});
        }

        res.status(200).send(scrambledStored);
    });
}

function updateScrambled(req, res) {
    let scrambledId = req.params.scrambledId;
    let update = req.body;

    Scrambled.findByIdAndUpdate(scrambledId, update, (err, scrambled) => {
        if (err) {
            return res.status(500).send({message: `Error al realizar la petición: ${err}`});
        }
        
        res.status(200).send(scrambled);
    });
}

function deleteScrambled(req, res) {
    let scrambledId = req.params.scrambledId;

    Scrambled.findById(scrambledId, (err, scrambled) => {
        if (err) {
            return res.status(500).send({message: `Error al realizar la petición: ${err}`});
        }
        if (!scrambled) {
            return res.status(404).send({message:'Revuelto no encontrado'});
        }

        scrambled.remove(err => {
            if (err) {
                return res.status(500).send({message: `Error al realizar la petición: ${err}`});
            }

            res.status(200).send({message: 'El revuelto ha sido eliminado'});
        });
    });
}

module.exports = {
    getScrambled,
    getScrambleds,
    postScrambled,
    updateScrambled,
    deleteScrambled
};