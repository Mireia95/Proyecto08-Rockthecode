const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: {
      type: String,
      required: true,
      enum: ['user', 'admin'],
      default: 'user'
    }
  },
  {
    timestamps: true,
    collection: 'users'
  }
);

//cripto el password del user para que no salga en la BBDD
userSchema.pre('save', function (next) {
  this.password = bcrypt.hashSync(this.password, 10);
  next();
});

//creo modelo
const User = mongoose.model('users', userSchema, 'users');

module.exports = User;
