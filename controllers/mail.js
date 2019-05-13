'use strict';

const Mail = require('../models/Albarinio');
const nodemailer = require('nodemailer');
const config = require('../config');

function sendEmail(req, res) {
    console.log('POST /api/wines/albarinios');
    console.log(req.body);

    let mail = new Mail();
    mail.email = req.body.email;

    let transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          type: 'OAuth2',
          user: 'guillermojjagudo@gmail.com',
          clientId: config.clientId,
          clientSecret: config.clientSecret,
          refreshToken: config.refreshToken
        }
    })

    let mailOptions = {
    from: 'guillermojjagudo@gmail.com',
    to: mail.email,
    subject: 'Gordita',
    html: '<h1> Guapa <3! </h1>'
    }

    transporter.sendMail(mailOptions, (err, info) => {
    if (err) throw new Error(err)

    res.statusCode = 200;
    res.end('Email sent!');
    })
}

module.exports = {
    sendEmail
};