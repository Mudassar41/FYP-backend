var mongoose = require('mongoose');
var providerprofileSchema = mongoose.Schema({

    serviceprovidersdatas: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ServiceProvidersData",

    },
    providercategories: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "providerCategories",
    },
    offerscollections: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "OffersCollection"
    }],
    shopImage: { type: String, required: true },
    shopName: { type: String, required: true },
    address: { type: String, required: true },
    desc: { type: String, required: true },
    longitude: { type: String, required: true },
    latitude: { type: String, required: true },
    // currentUid: { type: String, required: true }

})
var providerProfile = mongoose.model('providerProfiles', providerprofileSchema);
module.exports = providerProfile;