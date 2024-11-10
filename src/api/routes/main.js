const casaRouter = require('./Casa');
const personajeRouter = require('./Personaje');

const mainRouter = require('express').Router(); //ruta que ingloba todas las rutas de cada coleccion

//rutas para cada colección
mainRouter.use('/personajes', personajeRouter); //ruta para coleccion personaje
mainRouter.use('/casas', casaRouter); //ruta para coleccion casa

module.exports = mainRouter;
