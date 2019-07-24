const dbGenre = require('../../models/genre')

module.exports = (req, res) => {
    dbGenre.find({}, (err, data) => {
        if (err) {
            res.json({
                success: false,
                msg: 'Something went wrong, please try again later.',
                err: "DB_ERR_2"
            })
        } else {
            res.json({
                success: true,
                msg: 'genre details saved',
                data: data
            })
        }
    })
}