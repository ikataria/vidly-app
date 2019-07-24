const dbRental = require('../../models/rental').rent

module.exports = (req, res) => {
    dbRental.find({}, (err, data) => {
        if (err) {
            res.json({
                success: false,
                msg: 'u got an Error  '
            })
        } else {
            res.json({
                success: true,
                msg: 'List of rentals:-----',
                data: data
            })
        }
    })
}