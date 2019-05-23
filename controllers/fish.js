'use strict';

const Fish = require('../models/Fish');

function getFish(req, res) {
    let fishId = req.params.fishId

    Fish.findById(fishId, (err, fish) => {
        if (err) {
            return res.status(500).send({message: `Error al realizar la petición: ${err}`})
        }
        if (!fish) {
            return res.status(200).send({message:'Pescado no encontrado'});
        }

        res.status(200).send(fish);
    });
}

function getFishs(req, res) {
    Fish.find({}, (err, fishs) => {
        if (err) {
            return res.status(500).send({message:`Error al realizar la petición: ${err}`});
        }
        if (!fishs) {
            return res.status(404).send(`No existe el recurso \"${fishs}\"`);
        }

        var fishsArray = [];
        for (let i in fishs) {
            fishsArray.push(fishs[i]);
        }

        res.status(200).send(fishsArray);
    });
}

function postFish(req, res) {
    console.log('POST /api/menu/fishs');
    console.log(req.body);

    let fish = new Fish();
    fish.name = req.body.name;
    fish.description = req.body.description;
    fish.price = req.body.price;

    fish.save((err, fishStored) => {
        if (err) {
            return res.status(500).send({message:`Error al salvar en la base de datos: ${err}`});
        }

        res.status(200).send(fishStored);
    });
}

function updateFish(req, res) {
    let fishId = req.params.fishId;
    let update = req.body;

    Fish.findByIdAndUpdate(fishId, update, (err, fish) => {
        if (err) {
            return res.status(500).send({message: `Error al realizar la petición: ${err}`});
        }
        
        res.status(200).send(fish);
    });
}

function deleteFish(req, res) {
    let fishId = req.params.fishId;

    Fish.findById(fishId, (err, fish) => {
        if (err) {
            return res.status(500).send({message: `Error al realizar la petición: ${err}`});
        }
        if (!fish) {
            return res.status(404).send({message:'Pescado no encontrado'});
        }

        fish.remove(err => {
            if (err) {
                return res.status(500).send({message: `Error al realizar la petición: ${err}`});
            }

            res.status(200).send({message: 'El pescado ha sido eliminado'});
        });
    });
}

module.exports = {
    getFish,
    getFishs,
    postFish,
    updateFish,
    deleteFish
};