const winston = require('winston');
const mongoose = require('mongoose');
const config = require('config');

module.exports = function() {
    //connect to mongodb
    const db = config.get('db');
mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
.then(() => 
    winston.info(`Connected to ${db} ...`));

}