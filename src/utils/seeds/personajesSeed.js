const mongoose = require('mongoose');
const Personaje = require('../../api/models/Personaje');
const personajes = require('../../data/personajes');

const executeSeed = async () => {
  try {
    mongoose.connect(
      'mongodb+srv://RTC_Proyecto08:ewufjvosjhfpcoi4y39u8ej@cluster0.qrrmj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
    );

    //chequeo si hay datos en la coleccion. Si hay, vacío la colección
    const allPersonajes = await Personaje.find();

    if (allPersonajes.length) {
      await Personaje.collection.drop();
      console.log('Eliminados personajes de mi colección!');
    }

    //subo los datos de mi semilla a la coleccion
    await Personaje.insertMany(personajes);
    console.log('Personajes de semilla introducidos en la colección!');

    //me desconecto de la BBDD
    await mongoose.disconnect();
    console.log('Desconectados de la BBDD.');
  } catch (error) {
    console.log('Error en lanzar la semilla.');
  }
};

executeSeed();
