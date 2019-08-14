const mongoose = require('mongoose')
const genreSchema = require('./genre').genreSchema

const movieSchema = new mongoose.Schema({
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

movie = mongoose.model('movie', movieSchema)

exports.movie = movie
exports.movieSchema = movieSchema