'use strict';

const express = require('express');

const entreeController = require('../controllers/entrees');
const toastController = require('../controllers/toast');
const saladController = require('../controllers/salad');
const pastaController = require('../controllers/pasta');
const scrambledController = require('../controllers/scrambled');
const fishController = require('../controllers/fish');
const meatController = require('../controllers/meat');
const dessertController = require('../controllers/dessert');

const andalusianWineController = require('../controllers/andalusianWine');
const riojaWineController = require('../controllers/riojaWine');
const riberaWineController = require('../controllers/riberaWine');
const castillaWineController = require('../controllers/castillaWine');
const albarinioController = require('../controllers/albarinio');
const ruedaWineController = require('../controllers/ruedaWine');
const olorosoController = require('../controllers/oloroso');

const mailController = require('../controllers/mail');
const mailBotController = require('../controllers/mailBot');

const auth = require('../middlewares/auth');
const userController = require('../controllers/user');

const api = express.Router();

//----------  MENÚ  ----------

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

/*   Carnes   */
api.get('/menu/meats', meatController.getMeats);
api.get('/menu/meats/:meatId', meatController.getMeat);
api.post('/menu/meats', auth, meatController.postMeat);
api.put('/menu/meats/:meatId', auth, meatController.updateMeat);
api.delete('/menu/meats/:meatId', auth, meatController.deleteMeat);

/*   Postres   */
api.get('/menu/desserts', dessertController.getDesserts);
api.get('/menu/desserts/:dessertId', dessertController.getDessert);
api.post('/menu/desserts', auth, dessertController.postDessert);
api.put('/menu/desserts/:dessertId', auth, dessertController.updateDessert);
api.delete('/menu/desserts/:dessertId', auth, dessertController.deleteDessert);

//----------  VINOS  ----------

/*   Vinos de Andalucía   */
api.get('/wines/andalusianWines', andalusianWineController.getAndalusianWines);
api.get('/wines/andalusianWines/:andalusianWineId', andalusianWineController.getAndalusianWine);
api.post('/wines/andalusianWines', auth, andalusianWineController.postAndalusianWine);
api.put('/wines/andalusianWines/:andalusianWineId', auth, andalusianWineController.updateAndalusianWine);
api.delete('/wines/andalusianWines/:andalusianWineId', auth, andalusianWineController.deleteAndalusianWine);

/*   Vinos de Rioja   */
api.get('/wines/RiojaWines', riojaWineController.getRiojaWines);
api.get('/wines/RiojaWines/:riojaWineId', riojaWineController.getRiojaWine);
api.post('/wines/RiojaWines', auth, riojaWineController.postRiojaWine);
api.put('/wines/RiojaWines/:riojaWineId', auth, riojaWineController.updateRiojaWine);
api.delete('/wines/RiojaWines/:riojaWineId', auth, riojaWineController.deleteRiojaWine);

/*   Vinos de Ribera del Duero   */
api.get('/wines/RiberaWines', riberaWineController.getRiberaWines);
api.get('/wines/RiberaWines/:riberaWineId', riberaWineController.getRiberaWine);
api.post('/wines/RiberaWines', auth, riberaWineController.postRiberaWine);
api.put('/wines/RiberaWines/:riberaWineId', auth, riberaWineController.updateRiberaWine);
api.delete('/wines/RiberaWines/:riberaWineId', auth, riberaWineController.deleteRiberaWine);

/*   Vinos de Castilla-La Mancha  */
api.get('/wines/CastillaWines', castillaWineController.getCastillaWines);
api.get('/wines/CastillaWines/:castillaWineId', castillaWineController.getCastillaWine);
api.post('/wines/CastillaWines', auth, castillaWineController.postCastillaWine);
api.put('/wines/CastillaWines/:castillaWineId', auth, castillaWineController.updateCastillaWine);
api.delete('/wines/CastillaWines/:castillaWineId', auth, castillaWineController.deleteCastillaWine);

/*   Albariños  */
api.get('/wines/albarinios', albarinioController.getAlbarinios);
api.get('/wines/albarinios/:albarinioId', albarinioController.getAlbarinio);
api.post('/wines/albarinios', auth, albarinioController.postAlbarinio);
api.put('/wines/albarinios/:albarinioId', auth, albarinioController.updateAlbarinio);
api.delete('/wines/albarinios/:albarinioId', auth, albarinioController.deleteAlbarinio);

/*   Vinos Blancos de Rueda  */
api.get('/wines/ruedaWines', ruedaWineController.getRuedaWines);
api.get('/wines/ruedaWines/:ruedaWineId', ruedaWineController.getRuedaWine);
api.post('/wines/ruedaWines', auth, ruedaWineController.postRuedaWine);
api.put('/wines/ruedaWines/:ruedaWineId', auth, ruedaWineController.updateRuedaWine);
api.delete('/wines/ruedaWines/:ruedaWineId', auth, ruedaWineController.deleteRuedaWine);

/*   Olorosos  */
api.get('/wines/olorosos', olorosoController.getOlorosos);
api.get('/wines/olorosos/:olorosoId', olorosoController.getOloroso);
api.post('/wines/olorosos', auth, olorosoController.postOloroso);
api.put('/wines/olorosos/:olorosoId', auth, olorosoController.updateOloroso);
api.delete('/wines/olorosos/:olorosoId', auth, olorosoController.deleteOloroso);

//----------  MAIL  ----------

api.post('/mail', mailController.sendEmail);

//----------  USER  ----------

//api.post('/signUp', userController.signUp);
api.post('/signIn', userController.signIn);

module.exports = api;