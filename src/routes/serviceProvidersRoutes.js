const e = require('express');
var express = require('express');
var bcrypt = require('bcrypt');
var router = new express.Router();
var ProvidersModel = require('../models/servicProvidersModel');

router.post('/AddProviders', (req, res) => {

    var providerUsers = new ProvidersModel(req.body);
    //we can hash password also here//

    // const salt = await bcrypt.genSalt(10);

    // user.pSroviderPassword = await bcrypt.hash(user.providerPassword, salt);



    providerUsers.save().then((result) => {
        res.status(200).json({

            msg: 'Data inserted for providers',
            data: result
        })
    }).catch((error) => {
        console.log('this is error')
        console.log(error)
        res.status(500).json({

            msg: 'error'
        })
    })


})


router.post('/loginprovider', (req, res) => {


    var phoneNumber = req.body.providerPhoneNumber;
    var password = req.body.providerPassword;
    console.log(password);
    console.log(phoneNumber);

    ProvidersModel.findOne({ providerPhoneNumber: phoneNumber }).then((userData) => {

        bcrypt.compare(password, userData.providerPassword).then((result) => {
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



router.get('/getCurrentProviderInfo/:id', (req, res) => {
    ProvidersModel.findOne({ _id: req.params.id }).then((result) => {

        res.status(201).json({ data: result })

    }).catch((error) => {
        res.status(500).json({ data: 'error' })
    })
})


//Updating Provider Image
router.patch('/updateImageProvider', (req, res) => {
    console.log(req.body.id)
    console.log(req.body.imageLink)
    var updatedValue = { $set: { imageLink: req.body.imageLink } };
    ProvidersModel.updateOne({ _id: req.body.id }, updatedValue).then((result) => {
        res.status(200).json({ msg: "data updated" })
    }).catch((error) => {
        res.status(500).json({ msg: "error in updation" })
    })

})
////////////////////////////////////
router.patch('/updateToken', (req, res) => {

    
    var updatedValue = { $set: { deviceToken: req.body.deviceToken } };
    ProvidersModel.updateOne({ _id: req.body.id }, updatedValue).then((result) => {
        res.status(200).json({ msg: "data updated" })
    }).catch((error) => {
        res.status(500).json({ msg: "error in updation" })
    })

})
module.exports = router;