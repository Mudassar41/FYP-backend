var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
//Data Schema//
var providerSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,

    },

    userFirstName: {
        type: String,
        required: true
    },
    userLastName: {
        type: String,
        required: true

    },
    userPhoneNumber: {
        type: String,
        required: true
    },
    userImage: {
        type: String,
        required: true,
        default: 'https://holygracepolytechnic.in/public_html/upload/faculty_img/event_imgqpozlj.jpg'

    },
    userPassword: {
        type: String,
        required: true
    }


});

providerSchema.pre('save', async function (next) {
    console.log(`current password is ${this.userPassword}`);
    this.userPassword = await bcrypt.hash(this.userPassword, 10);
    console.log(`current password is ${this.userPassword}`);
    next();
})
//Data Collection//

const ServiceProviderData = new mongoose.model('UsersRegistrationProfile', providerSchema);
module.exports = ServiceProviderData;
