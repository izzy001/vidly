const mongoose = require('mongoose');
const Joi = require('joi');

const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  }
});

//create schema object for genres
const Genre = new mongoose.model('Genre', genreSchema);

//validate genre 
function validateGenre(genre) {
  //Old implementation
  //const schema = { name: Joi.string().min(3).required};
  // return Joi.validate(genre, schema) --this is the old validation method in node v14

  //new implementation
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required()
  }); // new validation for schema  in node v16


  return schema.validate(genre); // new validation method in node v16
};

exports.genreSchema = genreSchema;
exports.Genre = Genre;
exports.validate = validateGenre;