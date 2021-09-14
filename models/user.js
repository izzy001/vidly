const mongoose = require('mongoose');
const Joi = require('joi');
const config = require('config');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  email: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 255,
      unique: true
    },
  password: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 1024
    },
    isAdmin: {
      type: Boolean,
      required: true
    }
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, config.get('jwtPrivateKey'));
  return token;
};
//create schema object for genres
const User = new mongoose.model('User', userSchema);

//validate genre 
function validateUser(user) {
    //Old implementation
    //const schema = { name: Joi.string().min(3).required};
    // return Joi.validate(genre, schema) --this is the old validation method in node v14

    //new implementation
    const schema = Joi.object({
        name: Joi.string().min(5).max(50).required(),
        email:Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(1024).required(),
        isAdmin: Joi.boolean().required()

    }); // new validation for schema  in node v16


    return schema.validate(user); // new validation method in node v16
};


exports.User = User;
exports.validate = validateUser;