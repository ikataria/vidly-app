const dbGenre = require('../../models/genre')

module.exports = (req, res) => {
    if (!req.body._id || req.body._id == null) {
        res.json({
            success: false,
            msg: 'fill provide the details'
        })
    } else {
        dbGenre.update({ _id: req.body._id }, { $set: { internalStatus: -1 } }, (err, data) => {
            if (err) {
                res.json({
                    success: false,
                    msg: 'error while deleting data',
                    err: err
                })
            } else {
                res.json({
                    success: true,
                    msg: 'data deleted successfully',
                    data: data
                })
            }
        })
    }
}