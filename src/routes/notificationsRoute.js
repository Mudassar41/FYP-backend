var express = require('express');
var router = express.Router();
var NotificationModel = require('../models/notificationsModel');
////////////////////////////////////////////////////////////////


router.post('/addNot', (req, res) => {
    console.log(req.body)
    var nModel = new NotificationModel(req.body)

    nModel.save().then((result) => {
        res.status(200).json({
            msg: 'saved'
        })
    }).catch((error) => {
      
        console.log(error)
        res.status(200).json({
            msg: error
        })
    })
})
////////////////////////////////////////

module.exports=router;