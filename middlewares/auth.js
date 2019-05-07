'use strict';

const service = require('../service/index');

function isAuth(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(403).send({message: `No tiene autorización para acceder`});
    }

    const token = req.headers.authorization.split(' ')[1];

    service.decodeToken(token)
        .then(response => {
            req.user = response;
            next();
        })
        .catch(response => {
            res.status(response.status);
        });
}

module.exports = isAuth;