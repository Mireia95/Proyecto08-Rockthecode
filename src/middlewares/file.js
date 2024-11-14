//*traigo libreria multer
const multer = require('multer');

//*traigo libreria cloudinary: IMPO poner v02
const cloudinary = require('cloudinary').v2;

//*traigo clase CloudinaryStorage de la libreria multer-storage-cloudinary
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const storage = new CloudinaryStorage({
  cloudinary,
  /*gracis al middleware verifyCollection, he pasado a req la clave collection, que dependerà de que colección es el dato que estoy pasando
   a la folder de Cloudinary le paso este dato para asegurarme donde va guardada la imagen.
   Lo he conseguido informandome de que podia aceptar "params". Una vez descubierto que podía aceptar una funcion y pasarle req, he decidido pasarle req.collection
  */
  params: async (req, file) => {
    console.log(req.collection);
    return {
      folder: `RTCProyecto08_${req.collection}`,
      allowedFormats: ['jpg', 'png', 'jpeg', 'gif', 'webp']
    };
  }
});

const upload = multer({ storage });

module.exports = { upload };
