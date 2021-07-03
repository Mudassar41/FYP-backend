const e = require('express');
var express = require('express');
var router = new express.Router();
var bcrypt = require('bcrypt');
var UserModel = require('../models/usersModel');

router.post('/AddUser', (req, res) => {

    var providerUsers = new UserModel(req.body);


    providerUsers.save().then((result) => {
        res.status(200).json({

            msg: 'Data Added',
            data: result

        })
    }).catch((error) => {
        console.log(error)
        res.status(500).json({

            msg: 'error'
        })
    })


})

router.post('/loginuser', (req, res) => {


    var phoneNumber = req.body.userPhoneNumber;
    var password = req.body.userPassword;


    UserModel.findOne({ userPhoneNumber: phoneNumber }).then((userData) => {

        bcrypt.compare(password, userData.userPassword).then((result) => {
            if (result) {

                res.status(200).json({
                    msg: "Data Exist",
                    UserId: userData

                })
            }
            else {
                res.status(400).json({
                    msg: "Data  not Exist"

                })
            }
        })


    }).catch((error) => {

        return res.status(500).json({
            msg: 'Incorrect userName or password',

        });
    })




})
//getting currentUser Information
router.get('/getCurrentUserInfo/:id', (req, res) => {
    UserModel.findOne({ _id: req.params.id }).then((result) => {

        res.status(201).json({ data: result })

    }).catch((error) => {
        res.status(500).json({ data: 'error' })
    })
})

//updating userImage
router.patch('/updateImage', (req, res) => {
    console.log(req.body.id)
     console.log(req.body.userImage)
    var updatedValue = { $set: { userImage: req.body.userImage } };
    UserModel.updateOne( {_id: req.body.id}, updatedValue).then((result) => {
        res.status(200).json({ msg: "data updated" })
    }).catch((error) => {
        res.status(500).json({ msg: "error in updation" })
    })

})

module.exports = router;