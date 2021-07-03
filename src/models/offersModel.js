var mongoose = require('mongoose');
var offerSchema = mongoose.Schema({
    providerprofiles: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "providerProfiles",

    },
    usersregistrationprofiles: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UsersRegistrationProfile"
    },
    providercategories: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "providerCategories"
    },
    serviceprovidersdatas: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ServiceProvidersData"
    },

    userlatitude: {
        type: String,
        required: true
    },
    userlongitude: {
        type: String,
        required: true
    }
    ,
    offerStatus: {
        type: String,
        required: true
    },
    priceOffered: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    des: {
        type: String,
        required: true
    },
    providerRating: {
        type: Number,
        default: 0.0
    },
    providerReview: {
        type: String,
        default: 'no'
    }
    ,
    userRating: {
        type: Number,
        default: 0.0
    },
    userReview: {
        type: String,
        default: 'no'
    },
    dateTime: {
        type: Date, default: Date.now
    },
    userAdress: {
        type: String,
        required: true
    }
})
var offersData = mongoose.model('OffersCollection', offerSchema);
module.exports = offersData;