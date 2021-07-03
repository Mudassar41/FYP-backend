var mongoose = require('mongoose');
var providerCategoriesSchema = mongoose.Schema({

   
    providerCatName: {
        type: String,
        required: true,
        lowercase:true
    },
    providerCatImage: {
        type: String,
        required: true
    }
})

var providerCategories = mongoose.model('providerCategories', providerCategoriesSchema)
module.exports = providerCategories;
