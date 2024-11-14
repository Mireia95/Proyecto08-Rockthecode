const jwt = require('jsonwebtoken');

//genero token para el user
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1w' });
};

//verifico el token
const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

//exporto funciones
module.exports = { generateToken, verifyToken };
