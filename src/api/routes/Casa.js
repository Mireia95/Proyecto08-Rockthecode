const { upload } = require('../../middlewares/file');
const {
  getCasas,
  postCasa,
  updateCasa,
  deleteCasa
} = require('../controllers/Casa');

const casaRouter = require('express').Router();

casaRouter.get('/', getCasas);
casaRouter.post('/', upload.single('img'), postCasa);
casaRouter.delete('/:id', deleteCasa);
casaRouter.put('/:id', upload.single('img'), updateCasa);

module.exports = casaRouter;
