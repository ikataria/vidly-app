const dbGenre = require('../../models/genre').genre

module.exports = (req, res, next) => {
    dbGenre.find({}, (err, data) => {
        console.log('get genre:::>> ')
        if (err) {
            next(err)
                // res.status(500).json({
                //     success: false,
                //     msg: 'Something went wrong, please try again later.',
                //     err: "DB_ERR_2"
                // })
        } else {
            res.json({
                success: true,
                msg: 'genre details saved',
                data: data
            })
        }
    })
}