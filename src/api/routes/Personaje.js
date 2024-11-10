const { upload } = require('../../middlewares/file');
const {
  getPersonajes,
  postPersonaje,
  deletePersonaje,
  updatePersonaje
} = require('../controllers/Personaje');

const personajeRouter = require('express').Router();

personajeRouter.get('/', getPersonajes);
personajeRouter.post('/', upload.single('img'), postPersonaje);
personajeRouter.delete('/:id', deletePersonaje);
personajeRouter.put('/:id', upload.single('img'), updatePersonaje);

module.exports = personajeRouter;
