const mongoose = require('mongoose')

const genreSchema = new mongoose.Schema({
    genreName: {
        type: String,
        required: true
    },
    internalStatus: {
        type: Number,
        default: 0
    },
    image: {
        type: String
    }

})

const genre = mongoose.model('Genre', genreSchema)

exports.genre = genre
exports.genreSchema = genreSchema