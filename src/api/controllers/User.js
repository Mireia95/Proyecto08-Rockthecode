const { generateToken } = require('../../utils/jwt');
const User = require('../models/User');
const bcrypt = require('bcrypt');

//petición register (tipo post)
const registerUser = async (req, res, next) => {
  try {
    const user = new User(req.body);
    //chequeo si existe el usuario, chequeando su email
    const existUser = await User.findOne({ email: user.email });
    console.log(existUser);
    const existUsername = await User.findOne({ username: user.username });
    if (existUser) {
      return res.status(400).json('Email ya registrado.');
    }

    //chequeo si el username ya se ha utilizado para otro user
    if (existUsername) {
      return res
        .status(400)
        .json('Username ya registrado. Por favor, usar otro');
    }

    const userSave = await user.save();
    return res.status(201).json(userSave);
  } catch (error) {
    return res.status(400).json('Error en la registración.');
  }
};

//peticion login (tipo post)
const loginUser = async (req, res, next) => {
  try {
    //chequeo si el username existe en la BBDD
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    //si no existe devuelvo error
    if (!user) {
      return res.status(400).json('Username o password incorrectos');
    }

    //si existe el username chequeamos el password
    if (bcrypt.compareSync(password, user.password)) {
      const token = generateToken(user._id); //genero el token que permite acceder a peticiones
      return res
        .status(200)
        .json(`Te has logueado con éxito! Tu token es: ${token}`);
    } else {
      return res.status(400).json('Username o password incorrectos');
    }
  } catch (error) {
    return res.status(400).json('Error en el login');
  }
};

//peticion GET: solo pueden acceder los admins
const getUsers = async (req, res, next) => {
  try {
    const allUsers = await User.find();
    return res.status(200).json(allUsers);
  } catch (error) {
    return res.status(400).json('Error en la petición GET');
  }
};

//petición DELETE user: : solo pueden acceder los admins
const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);
    return res
      .status(200)
      .json({ mensaje: 'El usuario está eliminado', deletedUser });
  } catch (error) {
    return res.status(400).json('Error en la petición DELETE');
  }
};

//petición PUT, update user:
//admin: pueden updatear todos, el user puede solo cambiar su password
const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params; //recojo id de la petición
    const idUser = req.user._id; //recojo id del user

    let newUser;

    if (req.user.role === 'user') {
      if (id !== idUser.toString()) {
        return res
          .status(400)
          .json('No tienes permisos para modificar este usuario.');
      } else {
        //actualiza solo tus credenciales de password
        newUser = new User({
          password: req.body.password
        });
        newUser._id = idUser;
      }
    } else {
      //eres role="admin" entonces actualiza el que sea
      newUser = new User(req.body);
      newUser._id = id;
    }
    const userUpdate = await User.findByIdAndUpdate(id, newUser, { new: true });
    return res.status(200).json(userUpdate);
  } catch (error) {
    return res.status(400).json('Error en la petición PUT');
  }
};
module.exports = { registerUser, loginUser, getUsers, deleteUser, updateUser };
