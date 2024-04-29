const mongoose = require ("mongoose")

const NotificationModel = mongoose.Schema({
    to :{
        type:String,
        required:true
    },
    from:{
        type:String,
        required:true
    },
    booking:{
        type:String,
        required:true
    },
    subject:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true
    },
    seen:{
        type:Boolean,
        default:false
    }



},
{
    timestamps:true
})

module.exports = mongoose.model("Notification",NotificationModel)
