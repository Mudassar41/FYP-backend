var express = require('express');
const normalize = require('normalize-path');
var router = new express.Router();
var multer = require('multer');
var ProviderCategoryModel = require('../models/providerCategoriesModel');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
var upload = multer({ storage: storage });

router.post("/addCategory", upload.single('providerCatImage'), (req, res) => {
    var imageUrl = normalize(req.file.path);
    var catModel = new ProviderCategoryModel(
        {
            providerCatName: req.body.providerCatName,
            providerCatImage: imageUrl
        } );
    catModel.save().then((result) => {
        res.status(200).json({

            msg: 'Category Added'
        })
    }).catch((error) => {
        res.status(500).json({

            msg: error
        })
    })


})


router.get('/getCats', (req, res) => {

    ProviderCategoryModel.find().select('_id providerCatName providerCatImage').then((result) => {

        res.status(201).json({ data: result })


    }).catch((error) => {
        res.status(500).json({ data: error })

    })


})
router.get('/search/:searchTag', (req, res) => {
    var searcText = req.params.searchTag;

    ProviderCategoryModel.find({ providerCatName: { $regex: searcText } }).select('_id providerCatName providerCatImage')
        .then((result) => {

            res.status(201).json({ data: result })


        }).catch((error) => {
            res.status(201).json({ data: 'Error' })
        })


})
module.exports = router;