//*traigo libreria multer
const multer = require('multer');

//*traigo libreria cloudinary: IMPO poner v02
const cloudinary = require('cloudinary').v2;

//*traigo clase CloudinaryStorage de la libreria multer-storage-cloudinary
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'RTC08_HarryPotter',
    allowedFormats: ['jpg', 'png', 'jpeg', 'gif', 'webp']
  }
});

const upload = multer({ storage });

module.exports = { upload };
