const mongoose = require('mongoose');
const Joi = require('joi');
const { genreSchema } = require('./genre');

const Movie = mongoose.model('Movies', new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minLength: 5,
        maxLength: 255
    },
    genre: {
        type: genreSchema,
        required: true
    },
    numberInStock: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    },
    dailyRentalRate: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    }
}));

//validate genre 
function validateMovie(movie) {
    //Old implementation
    //const schema = { name: Joi.string().min(3).required};
    // return Joi.validate(genre, schema) --this is the old validation method in node v14

    //new implementation
    const schema = Joi.object({
        title: Joi.string().min(5).max(50).required(),
        genreId: Joi.objectId().required(),
        numberInStock: Joi.number().min(0).required(),
        dailyRentalRate: Joi.number().min(0).required()
    }); // new validation for schema  in node v16


    return schema.validate(movie); // new validation method in node v16
};

exports.Movie = Movie;
exports.validate = validateMovie;