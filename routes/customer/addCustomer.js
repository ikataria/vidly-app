const { customer } = require('../../models/customer')
const moment = require('moment')
let day = moment().format('DD')
let month = moment().format('MM')
let year = moment().format('YY')

var generateSGID = () => {
    return new Promise((resolve, reject) => {
        var date = moment().format('DD-MM-YY')
        var acDate = moment(date, 'DD-MM-YY').toDate(); /** India Standard Time is 5.5 hours*/
        customer.count({ createdAt: acDate }, (err, count) => {
            console.log('count:::::::><><><><><><>', count)
            if (err) {
                reject({
                    success: false,
                    msg: "Error while saving data"
                })
            } else {
                var newcount = ++count;
                var final = newcount > 9 ? "" + newcount : "0" + newcount;
                // resolve(`SGMU${year}${month}${day}${final}`) /**template literals */
                resolve('SGMU' + year + month + day + final)
            }
        })
    })
}

module.exports = (req, res) => {
    if (!req.body.name || !req.body.phone) {
        console.log('gere=-=-=-=:::>>', req.body)
        res.json({
            success: false,
            msg: 'please fill all details',
        })
    } else {
        customer.findOne({ phone: req.body.phone }, (err, data) => {
            console.log('cdata:::::::<><><><><><><><><<>>>>', data)
            if (err) {
                res.json({
                    success: false,
                    msg: "data not found"
                })
                console.log('err:::::::<><><><><><><><><<>>>>', err)
            } else if (data) {
                res.json({
                    success: false,
                    msg: 'Customer already exist'
                })
            } else if (!data || data == null) {
                generateSGID().then(SGID => {
                    console.log('SGID:::::::::::::>>>', SGID)
                    new customer({
                        SGID: SGID,
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
                                msg: 'new customer created successfully',
                                data: data
                            })
                        }

                    })
                })

            }
        })

    }
}