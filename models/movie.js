const mongoose = require('mongoose')
const { genreSchema } = require('./genre')

const movie = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true /**to get rid of any paddings around the time of the movie. */
    },
    genre: {
        type: genreSchema,
        required: true
    },
    numberInStock: {
        type: Number,
        required: true,
        minlength: 0,
        maxlength: 255
    },
    dailyRentalRate: {
        type: Number,
        required: true,
        minlength: 0,
        maxlength: 255
    }
})

module.exports = mongoose.model('Movie', movie)