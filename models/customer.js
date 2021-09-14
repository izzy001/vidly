const mongoose = require('mongoose');
const Joi = require('joi');

//create schema object for customer
const Customer = new mongoose.model('Customer', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    isGold: {
        type: Boolean,
        default: false
    },
    phone: {
        type: String,
        required: true,
        minlength: 11,
        maxlength: 14
    },
}));

//validate customers 
function validateCustomer(customer) {
    //Old implementation
    //const schema = { name: Joi.string().min(3).required};
    // return Joi.validate(genre, schema) --this is the old validation method in node v14

    //new implementation
    const schema = Joi.object({
        name: Joi.string().min(3).max(50).required(),
        phone: Joi.string().min(11).max(14).required(),
        isGold: Joi.boolean()
    }); // new validation for schema  in node v16


    return schema.validate(customer); // new validation method in node v16
};

exports.Customer = Customer;
exports.validate = validateCustomer;
