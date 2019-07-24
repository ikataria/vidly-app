const dbGenre = require('../../models/genre')

module.exports = (req, res) => {
    if (!req.body.genreName || req.body.genreName == null) {
        res.json({
            success: false,
            msg: 'Please fill all field'
        })
    } else {
        dbGenre.update({ _id: req.body._id }, { $set: { genreName: req.body.genreName } }, (err, updated) => {
            console.log('error=-=-=-=-=-=>', err)
            if (err) {
                res.json({
                    success: false,
                    msg: 'server err'
                })
            } else {
                res.json({
                    success: true,
                    msg: 'updated',
                    data: updated

                })
            }
        })
    }
}