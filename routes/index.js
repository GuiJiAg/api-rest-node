'use strict';

const express = require('express');
const entreeController = require('../controllers/entrees');
const auth = require('../middlewares/auth');
const userController = require('../controllers/user');
const api = express.Router();

api.get('/menu/entrees', entreeController.getEntrees);
api.get('/menu/entrees/:entreeId', entreeController.getEntree);
api.post('/menu/entrees', entreeController.postEntree);
api.put('/menu/entrees/:entreeId', entreeController.updateEntree);
api.delete('/menu/entrees/:entreeId', entreeController.deleteEntree);

api.post('/signUp', userController.signUp);
api.post('/signIn', userController.signIn);
api.get('/private', auth.isAuth, auth.validated);

module.exports = api;