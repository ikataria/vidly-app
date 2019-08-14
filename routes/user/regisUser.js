const dbUser = require('../../models/user').user
const bcrypt = require('bcrypt')
const salt_round = 10
const moment = require('moment')
let day = moment().format('DD')
let month = moment().format('MM')
let year = moment().format('YY')

const generateSGID = () => {
    return new Promise((resolve, reject) => {
        var date = moment().format('DD-MM-YY')
        var acDate = moment(date, 'DD-MM-YY').toDate(); /** India Standard Time is 5.5 hours*/
        dbUser.countDocuments({ createdAt: acDate }, (err, count) => {
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

module.exports = (req, res, next) => {
    // validate details
    if (!req.body.name || !req.body.email || !req.body.password) {

        res.json({
            success: false,
            msg: 'Fill all details'
        })
    } else {
        dbUser.findOne({ email: req.body.email }, (err, data) => {
            console.log('any error:::::::<><><><><>::::::::::::::::::::::<><><><<>>>>', err)
            if (err) {
                next(err)
                    // res.json({
                    //     success: false,
                    //     msg: "data not found"
                    // })
                console.log('err:::::::<><><><><><><><><<>>>>', err)
            } else if (data) {
                console.log('data::::::::::::>>>', data)
                res.status(451).json({
                    success: false,
                    msg: 'User already exists'
                })
            } else if (!data || data == null) {
                generateSGID().then(SGID => {
                    const newUser = new dbUser({
                        name: req.body.name,
                        email: req.body.email,
                        password: req.body.password,
                        SGID: SGID
                    })

                    // bcrypt.genSalt(salt_round, function(err, salt) {
                    //         if (err) {
                    //             console.log('error in salt', err)
                    //         }
                    //         bcrypt.hash(newUser.password, salt, function(error, hash) {
                    //             if (error) console.log('u found 2nd error in hash', error)
                    //                 // newUser.password = hash
                    //         })
                    //     })
                    //     // console.log('hased password :::::::::::<><><>><><><><><><><><><><><><><><><><><><><><><>::::::>>', hash)


                    newUser.save((err, userData) => {

                        console.log('user data::::::::::::::::::>>>>', userData)
                        if (err) {
                            res.json({
                                success: false,
                                msg: 'User not saved .',

                            })
                        } else {
                            res.json({
                                success: true,
                                msg: 'new User created successfully',
                                data: userData
                            })
                        }
                    })

                })
            }
        })
    }
}


//else save the user in database