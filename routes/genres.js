const validateObjectId = require('../middleware/validateObjectId');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const { Genre, validate } = require('../models/genre');
const mongoose = require('mongoose');
const express = require('express');   
const router = express.Router();


//get all genres
router.get('/',
    async (req, res) => {
        // throw new Error('Could not get the genres.');
        const genres = await Genre.find().sort('name');
        res.send(genres);

    });

//get genre by id
router.get('/:id', validateObjectId, async (req, res) => {
    const genre = await Genre.findById(req.params.id);

    // const genre = genres.find(x => x.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('The requested genre is not available');
    res.send(genre);
});

//add new genre
router.post('/', auth, async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    let genre = new Genre({ name: req.body.name });
    genre = await genre.save();
    res.send(genre);
});

//Update a genre
router.put('/:id',[validateObjectId, auth], async (req, res) => {
    //validate first
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true });
    // const genre = genres.find(x => x.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('The requested genre is not available');
    // genre.name = req.body.name;
    res.send(genre);
});

//Delete a genre
router.delete('/:id', [validateObjectId, auth, admin], async (req, res) => {
    const genre = await Genre.findByIdAndRemove(req.params.id);

    //find course
    // const genre = genres.find(x => x.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('The requested genre is not available');

    //delete course
    // const index = genres.indexOf(genre);
    // genres.splice(index, 1);

    res.send(genre);


});

module.exports = router;