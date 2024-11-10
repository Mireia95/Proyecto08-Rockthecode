const cloudinary = require('cloudinary');

//funcion para eliminar los archivos de cloudinary si ya no sirven
const deleteImg = (imgURL) => {
  const imgSplited = imgURL.split('/'); //divido la URL por /
  const imgFolderName = imgSplited.at(-2); //busco la posición -2 para obtener el nombre de la carpeta de Cloudinary
  const imgName = imgSplited.at(-1).split('.')[0]; //busco el nombre de la imagen, quitando la extension .jpeg

  const public_id = `${imgFolderName}/${imgName}`;

  //eliminar ahora la imagen de cloudinary
  cloudinary.uploader.destroy(public_id, () => {
    console.log('Imagen eliminada de Cloudinary');
  });
};

module.exports = { deleteImg };
