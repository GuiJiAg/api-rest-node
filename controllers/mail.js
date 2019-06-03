'use strict';

const Mail = require('../models/Mail');
const nodemailer = require('nodemailer');
const config = require('../config');

function sendEmail(req, res) {
    let bot = false;
    let response = '¡Correo enviado!';
    let validated = true;
    let validationArray = [];

    if (req.body.queryResult) {
        if (req.body.queryResult.action == 'reserve') {
            bot = true;
    
            Mail.name = req.body.queryResult.parameters.name.name;
            Mail.email = req.body.queryResult.parameters.email;
            Mail.phone = req.body.queryResult.parameters.phone;
            Mail.reserveDate = req.body.queryResult.parameters.reserveDate;
            Mail.reserveHour = req.body.queryResult.parameters.reserveHour;
            Mail.numberDiners = req.body.queryResult.parameters.numberDiners;
            Mail.preferedPlace = req.body.queryResult.parameters.preferedPlace;
            Mail.observations = req.body.queryResult.parameters.observations;
        }
    }
    else {
        Mail.name = req.body.name;
        Mail.email = req.body.email;
        Mail.phone = req.body.phone;
        Mail.reserveDate = req.body.reserveDate;
        Mail.reserveHour = req.body.reserveHour;
        Mail.numberDiners = req.body.numberDiners;
        Mail.preferedPlace = req.body.preferedPlace;
        Mail.observations = req.body.observations;
    }

    if (bot) {
        sanitazeParameters();
        validationArray = validateBotResponse();
        response = validationArray[0];
        validated = validationArray[1];
    }

    if (validated) {
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
            to: Mail.email,
            subject: 'Solicitud de reserva',
            html: 
            '<h1>Su solicitud de reserva ha sido enviada</h1>'+
            '<h3>Estos son los datos de su reserva:</h3>'+
            `<p>Nombre: <strong>${Mail.name}</strong></p>`+
            `<p>Email: <strong>${Mail.email}</strong></p>`+
            `<p>Teléfono: <strong>${Mail.phone}</strong></p>`+
            `<p>Fecha de la reserva: <strong>${Mail.reserveDate}</strong></p>`+
            `<p>Hora de la reserva: <strong>${Mail.reserveHour}</strong></p>`+
            `<p>Número de comensales: <strong>${Mail.numberDiners}</strong></p>`+
            `<p>Zona preferente: <strong>${Mail.preferedPlace}</strong></p>`+
            `<p>Observaciones: <strong>${Mail.observations}</strong></p>`+
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
        });
    
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
            `<p>Nombre: <strong>${Mail.name}</strong></p>`+
            `<p>Email: <strong>${Mail.email}</strong></p>`+
            `<p>Teléfono: <strong>${Mail.phone}</strong></p>`+
            `<p>Fecha de la reserva: <strong>${Mail.reserveDate}</strong></p>`+
            `<p>Hora de la reserva: <strong>${Mail.reserveHour}</strong></p>`+
            `<p>Número de comensales: <strong>${Mail.numberDiners}</strong></p>`+
            `<p>Zona preferente: <strong>${Mail.preferedPlace}</strong></p>`+
            `<p>Observaciones: <strong>${Mail.observations}</strong></p>`+
            '<br /><br /><hr />'+
            '<p>Confirme o rechace la reserva contactando de forma directa con el cliente</p>'
        }
    
        transporterOwner.sendMail(mailOptions, (err, info) => {
            if (err) throw new Error(err)
            res.statusCode = 200;
        });
    }  

    if (bot) {
        res.json({"fulfillmentText": response});
    }
    else {
        res.end(response);
    }
}

function sanitazeParameters() {
    Mail.reserveDate = Mail.reserveDate.split('T');
    Mail.reserveDate = Mail.reserveDate[0];

    Mail.reserveHour = Mail.reserveHour.split('T');
    Mail.reserveHour = Mail.reserveHour[1].split('+');
    Mail.reserveHour = Mail.reserveHour[0].split(':');
    Mail.reserveHour = Mail.reserveHour[0]+":"+Mail.reserveHour[1];
}

function validateBotResponse() {
    let pattern = /^[A-Ñ-Za-ñ-záéíóúÁÉÍÓÚ]+\s?([A-Ñ-Za-ñ-záéíóúÁÉÍÓÚ]+\s?)*$/;

    if (!pattern.test(Mail.name)) {
        return ['Lo siento, pero creo que no has puesto un nombre válido. Vuelva a intentar a hacerme la reserva con un nombre válido', false];
    }

    pattern = /^.+@.+\.[a-z]+$/;

    if (!pattern.test(Mail.email)) {
        return ['Lo siento, pero no reconozco el email que me ha indicado. Vuelva a intentar a hacerme la reserva con un email válido', false];
    }

    pattern = /^\d{9}$/;

    if (!pattern.test(Mail.phone)) {
        return ['Lo siento, pero no reconozco el teléfono que me ha indicado. Vuelva a intentar a hacerme la reserva con un teléfono válido', false];
    }

    let currentDate = new Date();
    let reserveDateToValidated = new Date(Mail.reserveDate);

    if (reserveDateToValidated <= currentDate) {
        return ['Lo siento, pero solo se puede reservar con un día de antelación. Vuelva a intentar a hacerme la reserva con una fecha posterior a la de hoy', false];
    }
    
    Mail.reserveDate = Mail.reserveDate.split('-');
    Mail.reserveDate = Mail.reserveDate[2]+"-"+Mail.reserveDate[1]+"-"+Mail.reserveDate[0];

    pattern = /^\d{2}:\d{2}$/;

    if (!pattern.test(Mail.reserveHour)) {
        return ['Lo siento, pero no reconozco la hora de la reserva que me ha indicado. Vuelva a intentar a hacerme la reserva con una hora válida', false];
    }

    let time = Mail.reserveHour.split(':');
    let hour = time[0];
    let minutes = time[1];

    if (hour < "13") {
        return ['Lo siento, pero nuestra cocina no abre hasta las 13:00. Vuleva a intentar a hacerme la reserva indicando una hora válida', false];
    }
    
    if (hour >= "16" && hour <= "20") {
        return ['Lo siento, pero nuestra cocina cierra de 16:00 a 21:00. Vuleva a intentar a hacerme la reserva indicando una hora válida', false];
    }

    if (hour == "15" || hour == "23") {
        if (minutes >= "30") {
            return ['Lo siento, pero a esa hora estaremos apunto de cerrar. Vuleva a intentar a hacerme la reserva indicando otra hora', false];
        }
    }

    pattern = /^[1-9]\d?$/;
    let numberDinersToValidated = parseInt(Mail.numberDiners);

    if (pattern.test(Mail.numberDiners)) {
        if (numberDinersToValidated < 1 || numberDinersToValidated > 20) {
          return ['Lo siento, pero solo se puede reservar para un mínimo de una persona y un máximo de veinte. Para reservas mayores, póngase en contacto directo con nosotros', false];
        } 
    }
    else {
        return ['Lo siento, pero no reconozco el número de personas que seríais. Vuelva a intentar a hacerme la reserva indicando un número válido de personas', false];
    }

    if (Mail.preferedPlace!='Terraza' && Mail.preferedPlace!='Local' && Mail.preferedPlace!='terraza' && Mail.preferedPlace!='local') {
        return ['Lo siento, pero no reconozco el lugar donde prefiere reservar mesa. Vuelva a intentar a hacerme la reserva indicándome únicamente "Terraza" o "Local" por el lugar preferente', false];
    }

    return [`¡Muy bien, ${Mail.name}! En breve recibirás un correo con los datos de tu reserva al correo ${Mail.email}. Confirmaremos tu solicitud lo antes posible. ¡Muchas gracias por reservar con nosotros!`, true];
}

module.exports = {
    sendEmail
};