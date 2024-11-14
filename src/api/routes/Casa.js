const { verifyCollection } = require('../../middlewares/collection');
const { upload } = require('../../middlewares/file');
const { isAdmin } = require('../../middlewares/isAuth');
const {
  getCasas,
  postCasa,
  updateCasa,
  deleteCasa
} = require('../controllers/Casa');

const casaRouter = require('express').Router();

casaRouter.get('/', getCasas);
casaRouter.post('/', isAdmin, verifyCollection, upload.single('img'), postCasa); //solo los admins pueden postear una casa
casaRouter.delete('/:id', isAdmin, deleteCasa); //solo los admins pueden borrar una casa
casaRouter.put('/:id', isAdmin, upload.single('img'), updateCasa); //solo los admins pueden actualizar una casa

module.exports = casaRouter;
