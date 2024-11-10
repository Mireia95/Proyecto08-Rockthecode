const mongoose = require('mongoose');

//creo schema
const schemaCasa = new mongoose.Schema(
  {
    name: { type: String, required: true },
    img: { type: String },
    animal: { type: String },
    fundador: { type: String },
    alumnos: [{ type: mongoose.Types.ObjectId, ref: 'personajes' }]
  },
  {
    timestamps: true,
    collection: 'casas'
  }
);

//creo modelo
const Casa = mongoose.model('casas', schemaCasa, 'casas');

//exporto modelo
module.exports = Casa;
