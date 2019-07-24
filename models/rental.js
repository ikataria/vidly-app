const mongoose = require('mongoose')

const rentSchema = new mongoose.Schema({
    customer: {
        name: {
            type: String,
            required: true,
            minlength: 5,
            maxLength: 50
        },
        isGold: {
            type: Boolean,
            required: true
        },
        phone: {
            type: String,
            required: true,
            minlength: 5,
            maxlength: 50
        }
    },
    movie: {
        title: {
            type: String,
            required: true,
            trim: true,
            minlength: 5,
            maxlength: 255
        },
        dailyRentalRate: {
            type: Number,
            required: true,
            min: 0,
            max: 255
        }
    },
    dateOut: {
        type: Date,
        required: true,
        default: Date.now
    },
    dateReturned: {
        type: Date
    },
    rentalFee: {
        type: Number,
        // required: true,
        min: 0
    }
})

const rent = mongoose.model('Rental', rentSchema)
exports.rent = rent