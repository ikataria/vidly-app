const dbGenre = require('../../models/genre')

module.exports = (req, res) => {

    // let requiredFields = [
    //     'genreName'
    // ];
    // for (let key in req.body) {
    //     if (requiredFields.includes(key) && req.body[key]) {
    //         let rfi = requiredFields.indexOf(key);
    //         requiredFields.splice(rfi, 1);
    //     }
    // }
    // if (requiredFields.length > 0) {
    // res.json({
    //     success: false,
    //     msg: 'Please fill all field'
    // })
    if (!req.body.genreName || req.body.genreName == null) {
        res.json({
            success: false,
            msg: 'Please fill all field'
        })
    } else {
        new dbGenre({
            genreName: req.body.genreName
        }).save((err, data) => {
            if (err) {
                console.log('this-=-=-==-=>>', err)
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

}