var express = require('express');
var router = express.Router();
var OfferModel = require('../models/offersModel');



////////////////////////////////////////////
router.post('/offers', (req, res) => {
    var offerModel = new OfferModel(req.body)
    offerModel.save().then((result) => {
        res.status(200).json({
            msg: 'Offer Sent'
        })
    }).catch((error) => {
        console.log(error)
        res.status(200).json({
            msg: error
        })
    })
})
////////////////////////////////////////

router.get('/getTasks/:Id', (req, res) => {
    var Id = req.params.Id;
    OfferModel.find({ usersregistrationprofiles: Id }).sort( { dateTime: -1 } ).populate('providerprofiles').populate('usersregistrationprofiles')
        .populate('providercategories').populate('serviceprovidersdatas').then((result) => {
            res.status(200).json({ data: result })
        }).catch((error) => {
            res.status(500).json({ data: error })
        })

})
////////////////////////////////////////////
router.get('/getSingleTask/:Id', (req, res) => {
    var Id = req.params.Id;
    OfferModel.findOne({ _id: Id }).populate('providerprofiles').populate('usersregistrationprofiles')
        .populate('providercategories').populate('serviceprovidersdatas').then((result) => {
            res.status(200).json(result)
        }).catch((error) => {
            res.status(500).json({ error })
        })

})
//////////////////////////////////////////////////////////

router.get('/getTasksforProvider/:Id', (req, res) => {
    var Id = req.params.Id;
    OfferModel.find({ serviceprovidersdatas: Id }).sort( { dateTime: -1 } ).populate('providerprofiles').populate('usersregistrationprofiles')
        .populate('providercategories').populate('serviceprovidersdatas').then((result) => {
            res.status(200).json({ data: result })
        }).catch((error) => {
            res.status(500).json({ data: error })
        })

})
///////////////////////////////////////////////////

router.patch('/updateTasks', (req, res) => {
    var myquery = { _id: req.body.id }
    var newvalues = { $set: { offerStatus: req.body.offerStatus } };
    OfferModel.updateOne(myquery, newvalues).then((result) => {
        res.status(200).json({ msg: "data updated" })
    }).catch((error) => {
        res.status(500).json({ msg: "error in updation" })
        console.log(error)
    })
})

////////////////////////////////////////////////////////////////////
router.patch('/updateTasksForRateReview', (req, res) => {
    var myquery = { _id: req.body.id }
    var newvalues = { $set: { userRating: req.body.userRating, userReview: req.body.userReview } };
    OfferModel.updateOne(myquery, newvalues).then((result) => {
        res.status(200).json({ msg: "data updated" })
    }).catch((error) => {
        res.status(500).json({ msg: "error in updation" })
        console.log(error)
    })
})
/////////////////////////////////////////////////////////////////////////
router.patch('/updateTasksForRateReviewUser', (req, res) => {
    console.log(req.body.providerRating)
     console.log(req.body.providerReview)
     
    var myquery = { _id: req.body.id }
    var newvalues = { $set: { providerRating: req.body.providerRating, providerReview: req.body.providerReview } };
    OfferModel.updateOne(myquery, newvalues).then((result) => {
        res.status(200).json({ msg: "data updated" })
    }).catch((error) => {
        res.status(500).json({ msg: "error in updation" })
        console.log(error)
    })
})
/////////////////////////////////////////////////////////////////
module.exports = router;
