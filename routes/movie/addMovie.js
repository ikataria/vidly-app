const dbMovie = require('../../models/movie').movie
const dbGenre = require('../../models/genre').genre

module.exports = async(req, res) => {
    if (!req.body.title || !req.body.numberInStock || !req.body.dailyRentalRate || !req.body.genreId) {
        console.log('gere=-=-=-=-=>>', req.body)
        res.json({
            success: false,
            msg: 'fill all details'
        })
    } else {
        dbGenre.findOne({ _id: req.body.genreId }, (err, genreData) => {
            console.log('genre data---0-=-=-=-===->>', genreData)
            if (err) {
                res.json({
                    success: false,
                    msg: 'cant fetch genre data'
                })
            } else {
                new dbMovie({
                    title: req.body.title,
                    genre: {
                        _id: genreData._id,
                        genreName: genreData.genreName
                    },
                    numberInStock: req.body.numberInStock,
                    dailyRentalRate: req.body.dailyRentalRate,
                }).save((err, data) => {
                    console.log('error:::::::>>>>>', err)
                    if (err) {
                        res.json({
                            success: false,
                            msg: 'data not saved'
                        })
                    } else {
                        res.json({
                            success: true,
                            msg: 'data saved',
                            data: data
                        })
                    }
                })
            }
        })

    }

    // } else {
    //     const genre = await dbGenre.findById(req.body.genreId)
    //     console.log('genre%%%%%=-=-=-=-=>>', genre)
    //     new dbMovie({
    //         title: req.body.title,
    //         numberInStock: req.body.numberInStock,
    //         dailyRentalRate: req.body.dailyRentalRate,
    //         genre: {
    //             _id: genre._id,
    //             genreName: genre.genreName
    //         }
    //     }).save((err, data) => {
    //         console.log('body=-=-=-=-=>>', req.body)
    //         console.log('error-=-=-=-=>>', err)
    //         if (err) {
    //             res.json({
    //                 success: false,
    //                 msg: 'Movie data not saved'
    //             })
    //         } else {
    //             res.json({
    //                 success: true,
    //                 msg: 'Movie data saved successfully',
    //                 data: data
    //             })
    //         }
    //     })
    // }
}