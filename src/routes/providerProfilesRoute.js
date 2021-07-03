var express = require('express');
const normalize = require('normalize-path');
var router = new express.Router();
var multer = require('multer');
var ProfileModel = require('../models/providersprofilemodel');
//const providerProfile = require('../models/providersprofilemodel');
// var storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, './uploads/');
//     },
//     filename: function (req, file, cb) {
//         cb(null, Date.now() + file.originalname);
//     }
// });
//var upload = multer({ storage: storage });
//router.post("/addProvidersProfile", upload.single('shopImage'), (req, res) => {
router.post("/addProvidersProfile", (req, res) => {
    //var imageUrl = normalize(req.file.path);
    var profileModel = new ProfileModel(
        {
            serviceprovidersdatas: req.body.serviceprovidersdatas,
            providercategories: req.body.providercategories,
            shopImage: req.body.shopImage,
            address: req.body.address,
            whFromTime: req.body.whFromTime,
            whFromTimeType: req.body.whFromTimeType,
            whToTime: req.body.whToTime,
            whToTimeType: req.body.whToTimeType,
            wsFrom: req.body.wsFrom,
            wsTo: req.body.wsTo,
            longitude: req.body.longitude,
            latitude: req.body.latitude,
            // currentUid: req.body.currentUid,
            shopName: req.body.shopName



        });
    profileModel.save().then((result) => {
        res.status(200).json({

            msg: 'Data Added'
        })
    }).catch((error) => {
        console.log(error);
        res.status(500).json({

            msg: error
        })
    })


})


router.get('/getProvidersProfile/:id', (req, res) => {

    ProfileModel.find({ serviceprovidersdatas: req.params.id }).populate('offerscollections').populate('providercategories').populate('serviceprovidersdatas', '_id providerFirstName providerLastName providerPhoneNumber').then((result) => {

        res.status(200).json({ data: result })


    }).catch((error) => {
        res.status(500).json({ data: 'No Data Found' })

    })


})
router.get('/getServiceProvidersForUser/:id', (req, res) => {

    ProfileModel.find({ providercategories: req.params.id }).populate({path:'offerscollections',populate:{path:'usersregistrationprofiles'}}).
        populate('providercategories').
        populate('serviceprovidersdatas', '_id providerFirstName providerLastName providerPhoneNumber').
        then((result) => {
            res.status(201).json({ data: result })
        }).catch((error) => {
            res.status(500).json({ data: 'No Data Found' })

        })


})
/////////////////////////////////////////////////////////////
router.patch('/addingReviewToProfile', (req, res) => {

    ProfileModel.
        findOne({ _id: req.body.profileId }, { offerscollections: { $elemMatch: { _id: req.body.offerId } } })
        .then((result) => {
            if (result) {
                res.status(200).json({ msg: 'id exists' })
            }
            else {
                var profileId = { _id: req.body.profileId }
                var newValues = { $push: { offerscollections: req.body.offerId } }

                console.log(newValues)


                ProfileModel.updateOne(profileId, newValues).then((result1) => {
                    console.log(result1)
                    res.status(200).json({ msg: "offer added" })
                }).catch((error) => {
                    res.status(500).json({ msg: "error in updation" })
                    console.log(error)
                })
            }

        })

        .catch((error) => {
            res.status(500).json({ msg: 'error' })
        })




})
module.exports = router;