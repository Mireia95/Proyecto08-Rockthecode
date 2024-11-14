//!prueba para subir mis imagenes a cloudinary en carpetas distintas dependiendo de que coleccion es la imagen

const verifyCollection = async (req, res, next) => {
  try {
    //!he buscado en req y he encontrado el parametro baseUrl que devuelve la URl de la peticion
    //uso este parametro para identificar en que coleccion estamos
    //si la URL incluye personajes, entonces pasa a req.collection "personajes"
    if (req.baseUrl.includes('/personajes')) {
      req.collection = 'personajes';
      console.log('personajes');
    } //si la URL incluye casas, entonces pasa a req.collection "casas"
    else if (req.baseUrl.includes('/casas')) {
      req.collection = 'casas';
      console.log('casas');
    }
    //esto permite pasar a req el parametro req.collection con su valor actualizado
    //este parametro lo podrá leer la funcion siguiente
    next();
  } catch (error) {
    return res.status(401).json('No se ha podido detectar la coleccion.');
  }
};

module.exports = { verifyCollection };
