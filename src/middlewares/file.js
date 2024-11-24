//*traigo libreria multer
const multer = require('multer');

//*traigo libreria cloudinary: IMPO poner v02
const cloudinary = require('cloudinary').v2;

//*traigo clase CloudinaryStorage de la libreria multer-storage-cloudinary
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const storage = new CloudinaryStorage({
  cloudinary,
  /*gracis al middleware verifyCollection, he pasado a req req.collection, que dependerà de que colección es el dato que estoy pasando, a la folder de Cloudinary le paso este dato para asegurarme donde va guardada la imagen.
   Lo he conseguido informandome de lo que podia aceptar "params". Una vez descubierto que podía aceptar una funcion y pasarle req, he decidido pasarle req.collection y decidir asi el nombre de la folder
  */
  //! SOLUCION PROFE: El req.query es una parte crucial del request object (objeto de solicitud) en Express.js. Este objeto contiene toda la información que llega al servidor desde el cliente, incluyendo los parámetros de la URL. Por ejemplo, si tienes una ruta que muestra detalles de un producto y la URL es https://tusitio.com/producto?id=123, el req.query contendrá { id: '123' }, lo que te permite acceder al valor del parámetro id y tomar acciones en función de él.
  //!en este caso a "folder" le pasaríamos req.query
  //*https://keepcoding.io/blog/que-significa-el-req-query-en-express-js/
  params: async (req, file) => {
    console.log(req.collection);
    return {
      //para guardar SUBCARPETAS utilizar /
      folder: `RTCProyecto08/${req.collection}`,
      allowedFormats: ['jpg', 'png', 'jpeg', 'gif', 'webp']
    };
  }
});

const upload = multer({ storage });

module.exports = { upload };
