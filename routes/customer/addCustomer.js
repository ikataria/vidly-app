const dbCustomer = require('../../models/customer')

module.exports = (req, res) => {
    if (!req.body.name || !req.body.phone) {
        console.log('gere=-=-=-=', req.body)
        res.json({
            sucess: false,
            msg: 'please fill all details',
        })
    } else {
        new dbCustomer({
            name: req.body.name,
            phone: req.body.phone,
            isGold: req.body.isGold
        }).save((err, data) => {
            if (err) {
                res.json({
                    success: false,
                    msg: 'Details not saved .',
                    error: err
                })
            } else {
                res.json({
                    success: true,
                    msg: 'Details saved successfully',
                    data: data
                })
            }

        })
    }
}