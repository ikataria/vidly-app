const { rent } = require('../../models/rental')
const { customer } = require('../../models/customer')
const { movie } = require('../../models/movie')
const mongoose = require('mongoose')
const Fawn = require('fawn')
Fawn.init(mongoose)

module.exports = (req, res) => {
    if (!req.body.cId || !req.body.mId) {
        res.json({
            success: false,
            msg: 'fill alll data'
        })
    } else {
        customer.findOne({ _id: req.body.cId }, (err, cData) => {
            console.log('err1::::::::::::>>', err)
            if (err) {
                res.json({
                    success: false,
                    msg: 'cant find customer details'
                })
            } else {
                movie.findOne({ _id: req.body.mId }, (error, mData) => {
                    console.log('err2::::::::::::>>', error)
                    if (error) {
                        res.json({
                            success: false,
                            msg: 'cant find movie details'
                        })
                    } else if (mData.numberInStock == 0) {
                        res.json({
                            success: false,
                            msg: 'Movie not in stock.'
                        })
                    } else {
                        console.log('customer data-=-=-=-=-=-=>>>', cData)
                        console.log('movie-=-=-=-=-=-=>>>', mData)
                        let rental = new rent({
                            customer: {
                                _id: cData._id,
                                name: cData.name,
                                phone: cData.phone
                            },
                            movie: {
                                _id: mData._id,
                                title: mData.title,
                                dailyRentalRate: mData.dailyRentalRate
                            }
                        })
                        try {
                            // console.log('here<><><><><><><><><><>here', rental)
                            new Fawn.Task()
                                .save('rentals', rental)
                                .update('movies', { _id: mData._id }, {
                                    $inc: { numberInStock: -1 }
                                })
                                .run()
                            res.json({
                                success: true,
                                data: rental
                            })
                            console.log('here2<><><><><><><><><><>here2', rental)

                        } catch (ex) {
                            console.log('catch error 0-0-0-0-0-0-0>>>>', ex)
                            res.json({
                                success: false,
                                error: ex
                            })
                        }

                        // save((err, data) => {
                        //     console.log('error=-=-=-=-=-=::::>>>', err)
                        //     console.log('data=-=-=-=-=-=::::>>>', data)
                        //     if (err) {
                        //         res.json({
                        //             success: false,
                        //             msg: 'data not saved',

                        //         })
                        //     } else {
                        //         res.json({
                        //             success: true,
                        //             msg: 'data saved',
                        //             data: data
                        //         })
                        //     }
                        // })

                        // mData.numberInStock--
                        //     mData.save()

                    }

                })
            }
            // console.log('-=-=-=-=-=-=>>>', mData)
        })

        // let cData = customer.find({ _id: req.body._id });
        // let mData = movie.find({ _id: req.body._id });
        // console.log('cdata--=-=->', cData)





    }

}
















// const dbRent = require('../../models/rental').rent

// module.exports = (req, res) => {
//     if (!req.body.name || req.body.name == null || !req.body.isGold || !req.body.phone || !req.body.title || !req.body.dailyRentalRate || !req.body.dateReturned || !req.body.rentalFee) {
//         res.json({
//             success: false,
//             msg: 'Fill all details'
//         })
//     } else {
//         new dbRent({
//             customer: {
//                 name: req.body.name,
//                 isGold: req.body.isGold,
//                 phone: req.body.phone
//             },
//             movie: {
//                 title: req.body.title,
//                 dailyRentalRate: req.body.dailyRentalRate,
//             },
//             dateOut: req.body.dateOut,
//             dateReturned: req.body.dateReturned,
//             rentalFee: req.body.rentalFee
//         }).save((err, data) => {
//             if (err) {
//                 console.log('err-=-=-=-=>', err)
//                 res.json({
//                     success: false,
//                     msg: 'u got an error...ENJOY'
//                 })
//             } else {
//                 res.json({
//                     success: true,
//                     msg: 'rent added dude',
//                     data: data
//                 })
//             }
//         })
//     }
// }