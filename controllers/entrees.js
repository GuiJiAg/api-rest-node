'use strict';

const Entrees = require('../models/Entrees');

function getEntree(req, res) {
    let entreeId = req.params.entreeId

    Entrees.findById(entreeId, (err, entree) => {
        if (err) {
            return res.status(500).send({message: `Error al realizar la petición: ${err}`})
        }
        if (!entree) {
            return res.status(404).send({message:'Entrante no encontrado'});
        }

        res.status(200).send({entree});
    });
}

function getEntrees(req, res) {
    Entrees.find({}, (err, entrees) => {
        if (err) {
            return res.status(500).send({message:`Error al realizar la petición: ${err}`});
        }
        if (!entrees) {
            return res.status(404).send(`No existe el recurso \"${entrees}\"`);
        }

        res.status(200).send({menu: {entrees}});
    });
}

function postEntree(req, res) {
    console.log('POST /api/menu/entrees');
    console.log(req.body);

    let entree = new Entrees();
    entree.name = req.body.name;
    entree.description = req.body.description;
    entree.price = req.body.price;

    entree.save((err, entreeStored) => {
        if (err) {
            return res.status(500).send({message:`Error al salvar en la base de datos: ${err}`});
        }

        res.status(200).send({entree: entreeStored});
    });
}

function updateEntree(req, res) {
    let entreeId = req.params.entreeId;
    let update = req.body;

    Entrees.findByIdAndUpdate(entreeId, update, (err, entree) => {
        if (err) {
            return res.status(500).send({message: `Error al realizar la petición: ${err}`});
        }
        
        res.status(200).send({entree});
    });
}

function deleteEntree(req, res) {
    let entreeId = req.params.entreeId;

    Entrees.findById(entreeId, (err, entree) => {
        if (err) {
            return res.status(500).send({message: `Error al realizar la petición: ${err}`});
        }
        if (!entree) {
            return res.status(404).send({message:'Entrante no encontrado'});
        }

        entree.remove(err => {
            if (err) {
                return res.status(500).send({message: `Error al realizar la petición: ${err}`});
            }

            res.status(200).send({message: 'El entrante ha sido eliminado'});
        });
    });
}

module.exports = {
    getEntree,
    getEntrees,
    postEntree,
    updateEntree,
    deleteEntree
};