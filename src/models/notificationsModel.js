var mongoose = require('mongoose');
var notificationSchema = mongoose.Schema({

    providerId: {
        type: String,
        required: true
    },
    userId: {

        type: String,
        required: true
    }
    ,
    NotificationTitle: {
        type: String,
        required: true
    }
    ,
    dateTime: {
        type: Date,  default: Date.now
    },

})

var notificationData = mongoose.model('NotificationsCollection', notificationSchema);
module.exports = notificationData;