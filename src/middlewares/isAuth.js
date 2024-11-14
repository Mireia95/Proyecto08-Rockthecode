const User = require('../api/models/User');
const { verifyToken } = require('../utils/jwt');

//middleware que permite acceder a las peticiones solo si estas logueado y tienes token
const isAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', ''); //quitar Bearer del token
    if (!token) {
      return res.status(401).json('No estás autorizado.');
    }
    const { id } = verifyToken(token); //recupero el id del token, y verifico que esté bien
    const user = await User.findById(id); //recupero el user que tiene ese id
    //paso los datos de ese user a req.user. Antes de hacerlo escondo el password, por seguridad
    user.password = null;
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json('No estás autorizado.');
  }
};

//creo middleware que permita acceder a las peticiones solo en el caso de ser admin
const isAdmin = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json('No estás autorizado.');
    }
    const { id } = verifyToken(token);
    const user = await User.findById(id);

    //compruebo si el user es admin
    if (user.role === 'admin') {
      user.password = null;
      req.user = user;
      next();
    } else {
      return res
        .status(401)
        .json('No tienes permisos de administrador para acceder.');
    }
  } catch (error) {
    return res.status(401).json(`Error. No estás autorizado: ${error}`);
  }
};

module.exports = { isAuth, isAdmin };
