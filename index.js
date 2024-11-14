require('dotenv').config();

const express = require('express'); //traifo libreria express
const { connectDB } = require('./src/config/db');
const mainRouter = require('./src/api/routes/main');
const { connectCloudinary } = require('./src/config/cloudinary');

const app = express();

connectDB(); //me conecto a la BBBDD
connectCloudinary(); //me conecto a Cloudinary

connectCloudinary(); //configuro libreria cloudinary

app.use(express.json()); //para interpretar datos en formato json

app.use('/api/v1', mainRouter);

//route not found
app.use('*', (req, res, next) => {
  return res.status(400).json('Route not found');
});

//levanto el servidor
app.listen(3000, () => {
  console.log('Servidor levantado con éxito en http://localhost:3000 😊');
});
