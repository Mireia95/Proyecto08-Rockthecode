const { isAdmin, isAuth } = require('../../middlewares/isAuth');
const {
  registerUser,
  loginUser,
  getUsers,
  deleteUser,
  updateUser
} = require('../controllers/User');

const userRouter = require('express').Router();

userRouter.get('/', isAdmin, getUsers); //solo los admin pueden ver users
userRouter.post('/register', registerUser); //solo los admin pueden ver todos los usuarios
userRouter.post('/login', loginUser);
userRouter.delete('/:id', isAdmin, deleteUser); //solo los admin pueden eliminar users
userRouter.put('/:id', isAuth, updateUser); //solo los logueados pueden actualizar user. El admin puede actualizar cualquier user. El user puede actualizar solo su contraseña

//exporto rutas
module.exports = userRouter;
