'use strict';

const express = require('express');

const entreeController = require('../controllers/entrees');
const toastController = require('../controllers/toast');
const saladController = require('../controllers/salad');
const pastaController = require('../controllers/pasta');
const scrambledController = require('../controllers/scrambled');
const fishController = require('../controllers/fish');
const meatController = require('../controllers/meat');

const auth = require('../middlewares/auth');
const userController = require('../controllers/user');

const api = express.Router();

/*   Entrantes   */
api.get('/menu/entrees', entreeController.getEntrees);
api.get('/menu/entrees/:entreeId', entreeController.getEntree);
api.post('/menu/entrees', auth, entreeController.postEntree);
api.put('/menu/entrees/:entreeId', auth, entreeController.updateEntree);
api.delete('/menu/entrees/:entreeId', auth, entreeController.deleteEntree);

/*   Tostas   */
api.get('/menu/toasts', toastController.getToasts);
api.get('/menu/toasts/:toastId', toastController.getToast);
api.post('/menu/toasts', auth, toastController.postToast);
api.put('/menu/toasts/:toastId', auth, toastController.updateToast);
api.delete('/menu/toasts/:toastId', auth, toastController.deleteToast);

/*   Ensaladas   */
api.get('/menu/salads', saladController.getSalads);
api.get('/menu/salads/:saladId', saladController.getSalad);
api.post('/menu/salads', auth, saladController.postSalad);
api.put('/menu/salads/:saladId', auth, saladController.updateSalad);
api.delete('/menu/salads/:saladId', auth, saladController.deleteSalad);

/*   Pastas   */
api.get('/menu/pastas', pastaController.getPastas);
api.get('/menu/pastas/:pastaId', pastaController.getPasta);
api.post('/menu/pastas', auth, pastaController.postPasta);
api.put('/menu/pastas/:pastaId', auth, pastaController.updatePasta);
api.delete('/menu/pastas/:pastaId', auth, pastaController.deletePasta);

/*   Revueltos   */
api.get('/menu/scrambleds', scrambledController.getScrambleds);
api.get('/menu/scrambleds/:scrambledId', scrambledController.getScrambled);
api.post('/menu/scrambleds', auth, scrambledController.postScrambled);
api.put('/menu/scrambleds/:scrambledId', auth, scrambledController.updateScrambled);
api.delete('/menu/scrambleds/:scrambledId', auth, scrambledController.deleteScrambled);

/*   Pescados   */
api.get('/menu/fishs', fishController.getFishs);
api.get('/menu/fishs/:fishId', fishController.getFish);
api.post('/menu/fishs', auth, fishController.postFish);
api.put('/menu/fishs/:fishId', auth, fishController.updateFish);
api.delete('/menu/fishs/:fishId', auth, fishController.deleteFish);

/*   Pescados   */
api.get('/menu/meats', meatController.getMeats);
api.get('/menu/meats/:meatId', meatController.getMeat);
api.post('/menu/meats', auth, meatController.postMeat);
api.put('/menu/meats/:meatId', auth, meatController.updateMeat);
api.delete('/menu/meats/:meatId', auth, meatController.deleteMeat);

//api.post('/signUp', userController.signUp);
api.post('/signIn', userController.signIn);

module.exports = api;