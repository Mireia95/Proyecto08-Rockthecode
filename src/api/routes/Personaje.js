const { verifyCollection } = require('../../middlewares/collection');
const { upload } = require('../../middlewares/file');
const { isAuth, isAdmin } = require('../../middlewares/isAuth');
const {
  getPersonajes,
  postPersonaje,
  deletePersonaje,
  updatePersonaje
} = require('../controllers/Personaje');

const personajeRouter = require('express').Router();

personajeRouter.get('/', getPersonajes);
personajeRouter.post(
  '/',
  isAuth,
  verifyCollection,
  upload.single('img'),
  postPersonaje
); //tienen permisos para postear un personaje solo los users logueados
personajeRouter.delete('/:id', isAdmin, deletePersonaje); //solo los admins pueden borrar un personaje
personajeRouter.put('/:id', isAdmin, upload.single('img'), updatePersonaje); //solo los admins pueden borrar un personaje

module.exports = personajeRouter;
