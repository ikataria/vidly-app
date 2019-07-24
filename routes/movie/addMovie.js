const dbMovie = require('../../models/movie')
const dbGenre = require('../../models/genre').genre

module.exports = async(req, res) => {
    console.log('gere=-=-=-=-=>>')
    if (!req.body.title || !req.body.numberInStock || !req.body.dailyRentalRate) {
        res.json({
            success: false,
            msg: 'fill all details'
        })
    } else {
        const genre = await dbGenre.findById(req.body.genreId)
        console.log('genre%%%%%=-=-=-=-=>>', genre)
        new dbMovie({
            title: req.body.title,
            numberInStock: req.body.numberInStock,
            dailyRentalRate: req.body.dailyRentalRate,
            genre: {
                _id: genre._id,
                genreName: genre.genreName
            }
        }).save((err, data) => {
            console.log('body=-=-=-=-=>>', req.body)
            console.log('error-=-=-=-=>>', err)
            if (err) {
                res.json({
                    success: false,
                    msg: 'Movie data not saved'
                })
            } else {
                res.json({
                    success: true,
                    msg: 'Movie data saved successfully',
                    data: data
                })
            }
        })
    }
}