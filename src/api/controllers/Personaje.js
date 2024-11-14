const { deleteImg } = require('../../utils/deleteFile');
const Personaje = require('../models/Personaje');

//peticion GET
const getPersonajes = async (req, res, next) => {
  try {
    const allPersonajes = await Personaje.find();
    return res.status(200).json(allPersonajes);
  } catch (error) {
    return res.status(400).json('Error en la petición GET');
  }
};

//peticion POST
const postPersonaje = async (req, res, next) => {
  try {
    const newPersonaje = new Personaje(req.body);
    console.log(req.collection); //me aseguro que le he pasado correctamente la colección con el middleware verifyCollection
    if (req.file) {
      //si paso un file como imagen, el valor del campo img será el path de Cloudinary
      newPersonaje.img = req.file.path;
    }
    const savePersonaje = await newPersonaje.save();
    return res.status(201).json(savePersonaje);
  } catch (error) {
    return res.status(400).json('Error en la petición GET');
  }
};

//petición DELETE
const deletePersonaje = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletePersonaje = await Personaje.findByIdAndDelete(id); //elimino dato en la BBDD
    deleteImg(deletePersonaje.img); //elimino su img en Cloudinary
    return res
      .status(200)
      .json({ mensaje: 'Personaje eliminado', deletePersonaje });
  } catch (error) {
    return res.status(400).json('Error en la petición DELETE');
  }
};

//petición PUT
const updatePersonaje = async (req, res, next) => {
  try {
    const { id } = req.params;

    const newPersonaje = new Personaje(req.body);
    newPersonaje._id = id;
    //si paso un file imagen en el campo img, se subirá la nueva imagen en Cloudinary, pero tendré que borrar la vieja
    if (req.file) {
      const oldPersonaje = await Personaje.findById(id); //busco el personaje no actualizado
      newPersonaje.img = req.file.path; //paso nuevo path al personaje
      deleteImg(oldPersonaje.img); //elimino la imagen antigua del personaje en Cloudinary
    }
    const updatePersonaje = await Personaje.findByIdAndUpdate(
      id,
      newPersonaje,
      { new: true }
    );
    return res.status(200).json(updatePersonaje);
  } catch (error) {
    return res.status(400).json('Error en la petición PUT');
  }
};

module.exports = {
  getPersonajes,
  postPersonaje,
  deletePersonaje,
  updatePersonaje
};
