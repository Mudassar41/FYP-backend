var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
//Data Schema//
var providerSchema = mongoose.Schema({
    

    providerFirstName: {
        type: String,
        required: true
    },
    providerLastName: {
        type: String,
        required: true

    },
    providerPhoneNumber: {
        type: String,
        required: true
    },
    imageLink: {
        type: String,
        required: true,
        default: 'https://holygracepolytechnic.in/public_html/upload/faculty_img/event_imgqpozlj.jpg'

    },
    providerPassword: {
        type: String,
        required: true
    },
    
    deviceToken:{
        type: String,
        required: true
    }




});

providerSchema.pre('save', async function (next) {
    console.log(`current password is ${this.providerPassword}`);
    this.providerPassword = await bcrypt.hash(this.providerPassword,10);
    console.log(`current password is ${this.providerPassword}`);
    next();
})
//Data Collection//

const ServiceProviderData = new mongoose.model('ServiceProvidersData', providerSchema);
module.exports = ServiceProviderData;
