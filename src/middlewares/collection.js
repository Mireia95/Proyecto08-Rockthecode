//!prueba para subir mis imagenes a cloudinary en carpetas distintas dependiendo de que coleccion es la imagen

const verifyCollection = async (req, res, next) => {
  try {
    if (req.baseUrl.includes('/personajes')) {
      req.collection = 'personajes';
      console.log('personajes');
    } else if (req.baseUrl.includes('/casas')) {
      req.collection = 'casas';
      console.log('casas');
    }
    next();
  } catch (error) {
    return res.status(401).json('No se ha podido detectar la coleccion.');
  }
};

module.exports = { verifyCollection };
