const dbRent = require('../../models/rental').rent

module.exports = (req, res) => {
    if (!req.body.name || req.body.name == null || !req.body.isGold || !req.body.phone || !req.body.title || !req.body.dailyRentalRate || !req.body.dateReturned || !req.body.rentalFee) {
        res.json({
            success: false,
            msg: 'Fill all details'
        })
    } else {
        new dbRent({
            customer: {
                name: req.body.name,
                isGold: req.body.isGold,
                phone: req.body.phone
            },
            movie: {
                title: req.body.title,
                dailyRentalRate: req.body.dailyRentalRate,
            },
            dateOut: req.body.dateOut,
            dateReturned: req.body.dateReturned,
            rentalFee: req.body.rentalFee
        }).save((err, data) => {
            if (err) {
                console.log('err-=-=-=-=>', err)
                res.json({
                    success: false,
                    msg: 'u got an error...ENJOY'
                })
            } else {
                res.json({
                    success: true,
                    msg: 'rent added dude',
                    data: data
                })
            }
        })
    }
}