const { deleteImg } = require('../../utils/deleteFile');
const Casa = require('../models/Casa');

//peticion GET
const getCasas = async (req, res, next) => {
  try {
    const allCasas = await Casa.find().populate('alumnos');
    return res.status(200).json(allCasas);
  } catch (error) {
    return res.status(400).json('Error en la petición GET');
  }
};

//peticion POST
const postCasa = async (req, res, next) => {
  try {
    const newCasa = new Casa(req.body);
    console.log(req.collection); //me aseguro que le he pasado correctamente la colección con el middleware verifyCollection
    if (req.file) {
      //si paso un file como imagen, el valor del campo img será el path de Cloudinary
      newCasa.img = req.file.path;
    }
    const saveCasa = await newCasa.save();
    return res.status(201).json(saveCasa);
  } catch (error) {
    return res.status(400).json('Error en la petición GET');
  }
};

//petición DELETE
const deleteCasa = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleteCasa = await Casa.findByIdAndDelete(id); //elimino dato en la BBDD
    deleteImg(deleteCasa.img); //elimino la imagen antigua del Casa en Cloudinary
    return res.status(200).json({ mensaje: 'Casa eliminado', deleteCasa });
  } catch (error) {
    return res.status(400).json('Error en la petición DELETE');
  }
};

//petición PUT
const updateCasa = async (req, res, next) => {
  try {
    const { id } = req.params;

    const newCasa = new Casa(req.body);
    newCasa._id = id;

    //si paso los datos con multer, si el array de alumnos está vacio devuelve undefined. Para evitar que pase, le paso un array vacio
    const newAlumnos = req.body.alumnos || [];
    //en campo "alumnos" no quiero datos duplicados
    const oldCasa = await Casa.findById(id); //busco la casa no actualizada
    newCasa.alumnos = [...oldCasa.alumnos, ...newAlumnos]; //paso al campo alumnos los viejos datos + los nuevos

    //?START CHECK DUPLICADOS: chequeo que no hayan datos repetidos en el campo alumnos:
    const idSet = new Set(); //utilizo Set para chequear duplicados
    const arrayAlumnosFinal = []; //creo un array donde guardaré los datos no duplicados
    //con un ciclo forEach añado a Set cada alumno de newCasa.
    //El metodo .add() permite añadir el dato solo si no se ha añadido previamente, evitando duplicados
    newCasa.alumnos.forEach((id) => idSet.add(id.toString()));

    //*ejemplo de codigo usando ciclo for in en vez de ciclo foreach
    /* for (const id of newCasa.alumnos) {
      idSet.add(id.toString()); 
    } */

    //cojo los datos de Set y los añado al array arrayAlumnosFinal
    idSet.forEach((id) => arrayAlumnosFinal.push(id));
    newCasa.alumnos = arrayAlumnosFinal; //paso arrayAlumnosFinal a newCasa.alumnos, para actualizarlo y quitarle posibles duplicados
    //?---END CHECK DUPLICADOS

    //si paso un file imagen en el campo img, se subirá la nueva imagen en Cloudinary, pero tendré que borrar la vieja
    if (req.file) {
      newCasa.img = req.file.path; //paso nuevo path al Casa
      deleteImg(oldCasa.img); //elimino la imagen antigua del Casa en Cloudinary
    }

    const updateCasa = await Casa.findByIdAndUpdate(id, newCasa, {
      new: true
    }).populate('alumnos');
    return res.status(200).json(updateCasa);
  } catch (error) {
    return res.status(400).json('Error en la petición PUT');
  }
};

module.exports = { getCasas, updateCasa, deleteCasa, postCasa };
