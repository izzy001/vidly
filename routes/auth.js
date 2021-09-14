const Joi = require('Joi');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const {User} =  require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {

    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //Check if user exists
  let user = await User.findOne({email: req.body.email});
 if(!user) return res.status(400).send('Invalid email or password!');


const validPassword = await bcrypt.compare(req.body.password, user.password);

if(!validPassword) return res.status(400).send('Invalid email or password!');

const token = user.generateAuthToken();
res.send(token);
});



//validate auth
function validate(req) {
    //Old implementation
    //const schema = { name: Joi.string().min(3).required};
    // return Joi.validate(genre, schema) --this is the old validation method in node v14

    //new implementation
    const schema = Joi.object({
        email:Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(1024).required()

    }); // new validation for schema  in node v16


    return schema.validate(req); // new validation method in node v16
};


module.exports = router;