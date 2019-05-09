'use strict';

const Toast = require('../models/Toast');

function getToast(req, res) {
    let toastId = req.params.toastId

    Toast.findById(toastId, (err, toast) => {
        if (err) {
            return res.status(500).send({message: `Error al realizar la petición: ${err}`})
        }
        if (!toast) {
            return res.status(404).send({message:'Tosta no encontrada'});
        }

        res.status(200).send(toast);
    });
}

function getToasts(req, res) {
    Toast.find({}, (err, toasts) => {
        if (err) {
            return res.status(500).send({message:`Error al realizar la petición: ${err}`});
        }
        if (!toasts) {
            return res.status(404).send(`No existe el recurso \"${toasts}\"`);
        }

        var toastsArray = [];
        for (let i in toasts) {
            toastsArray.push(toasts[i]);
        }

        res.status(200).send(toastsArray);
    });
}

function postToast(req, res) {
    console.log('POST /api/menu/toasts');
    console.log(req.body);

    let toast = new Toast();
    toast.name = req.body.name;
    toast.description = req.body.description;
    toast.price = req.body.price;

    toast.save((err, toastStored) => {
        if (err) {
            return res.status(500).send({message:`Error al salvar en la base de datos: ${err}`});
        }

        res.status(200).send(toastStored);
    });
}

function updateToast(req, res) {
    let toastId = req.params.toastId;
    let update = req.body;

    Toast.findByIdAndUpdate(toastId, update, (err, toast) => {
        if (err) {
            return res.status(500).send({message: `Error al realizar la petición: ${err}`});
        }
        
        res.status(200).send(toast);
    });
}

function deleteToast(req, res) {
    let toastId = req.params.toastId;

    Toast.findById(toastId, (err, toast) => {
        if (err) {
            return res.status(500).send({message: `Error al realizar la petición: ${err}`});
        }
        if (!toast) {
            return res.status(404).send({message:'Tosta no encontrada'});
        }

        toast.remove(err => {
            if (err) {
                return res.status(500).send({message: `Error al realizar la petición: ${err}`});
            }

            res.status(200).send({message: 'La tosta ha sido eliminada'});
        });
    });
}

module.exports = {
    getToast,
    getToasts,
    postToast,
    updateToast,
    deleteToast
};