const mongoose = require('mongoose');

//creo schema
const schemaPersonaje = new mongoose.Schema(
  {
    name: { type: String, required: true },
    img: { type: String, required: true },
    house: {
      type: String,
      enum: ['Gryffindor', 'Hafflepuss', 'Ravenclow', 'Slytherin']
    }
  },
  {
    timestamps: true,
    collection: 'personajes'
  }
);

//creo modelo
const Personaje = mongoose.model('personajes', schemaPersonaje, 'personajes');

//exporto modelo
module.exports = Personaje;
