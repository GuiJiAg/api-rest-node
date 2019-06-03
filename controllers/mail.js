'use strict';

const Mail = require('../models/Albarinio');
const nodemailer = require('nodemailer');
const config = require('../config');

function sendEmail(req, res) {
    let mail = new Mail();
    mail.name = req.body.name;
    mail.email = req.body.email;
    mail.phone = req.body.phone;
    mail.reserveDate = req.body.reserveDate;
    mail.reserveHour = req.body.reserveHour;
    mail.numberDiners = req.body.numberDiners;
    mail.preferedPlace = req.body.preferedPlace;
    mail.observations = req.body.observations;

    let transporterClient = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          type: config.authGmail,
          user: config.email,
          clientId: config.clientId,
          clientSecret: config.clientSecret,
          refreshToken: config.refreshToken
        }
    })

    let mailOptions = {
        from: config.email,
        to: mail.email,
        subject: 'Solicitud de reserva',
        html: 
        '<h1>Su solicitud de reserva ha sido enviada</h1>'+
        '<h3>Estos son los datos de su reserva:</h3>'+
        `<p>Nombre: <strong>${mail.name}</strong></p>`+
        `<p>Email: <strong>${mail.email}</strong></p>`+
        `<p>Teléfono: <strong>${mail.phone}</strong></p>`+
        `<p>Fecha de la reserva: <strong>${mail.reserveDate}</strong></p>`+
        `<p>Hora de la reserva: <strong>${mail.reserveHour}</strong></p>`+
        `<p>Número de comensales: <strong>${mail.numberDiners}</strong></p>`+
        `<p>Zona preferente: <strong>${mail.preferedPlace}</strong></p>`+
        `<p>Observaciones: <strong>${mail.observations}</strong></p>`+
        '<br /><br /><hr />'+
        '<p>Su reserva está pendiente de confirmación. En el caso de que no haya recibido respuesta'+
        ' en un plazo de <strong>12 horas</strong> pruebe a ponerse en contacto directo con el restaurante: '+
        'es posible que el correo no fuese enviado correctamente o que no hayamos podido atender su solicitud</p>'+
        '<br /><br />'+
        '<p>¡Esperamos verle pronto!</p>'
    }

    transporterClient.sendMail(mailOptions, (err, info) => {
        if (err) throw new Error(err)

        res.statusCode = 200;
        res.end('Email sent!');
    })

    let transporterOwner = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          type: config.authGmail,
          user: config.email,
          clientId: config.clientId,
          clientSecret: config.clientSecret,
          refreshToken: config.refreshToken
        }
    })
    
    mailOptions = {
        from: config.email,
        to: config.email,
        subject: 'Solicitud de reserva',
        html: 
        '<h1>Se ha registrado una nueva solicitud de reserva</h1>'+
        '<h3>Estos son los datos de la solicitud:</h3>'+
        `<p>Nombre: <strong>${mail.name}</strong></p>`+
        `<p>Email: <strong>${mail.email}</strong></p>`+
        `<p>Teléfono: <strong>${mail.phone}</strong></p>`+
        `<p>Fecha de la reserva: <strong>${mail.reserveDate}</strong></p>`+
        `<p>Hora de la reserva: <strong>${mail.reserveHour}</strong></p>`+
        `<p>Número de comensales: <strong>${mail.numberDiners}</strong></p>`+
        `<p>Zona preferente: <strong>${mail.preferedPlace}</strong></p>`+
        `<p>Observaciones: <strong>${mail.observations}</strong></p>`+
        '<br /><br /><hr />'+
        '<p>Confirme o rechace la reserva contactando de forma directa con el cliente</p>'
    }

    transporterOwner.sendMail(mailOptions, (err, info) => {
        if (err) throw new Error(err)

        res.statusCode = 200;
        res.end('Email sent!');
    })
}

module.exports = {
    sendEmail
};