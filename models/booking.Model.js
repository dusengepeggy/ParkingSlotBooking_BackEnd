const mongoose = require ("mongoose");

const BookingModel= mongoose.Schema({

    email:{
        type:String,
        required:true
    },
    phoneNumber:{
        type:String,
        required:true
    },
    endDate:{
        type:Date,
        required:true
    },
    startDate:{
        type:Date,
        required:true
    },
    duration:{
        type:Number,
        required:true
    },
    plate:{
        type:String,
        required:true
    },
    slot:{
        type:String,
        required:true
    },
    parkingAreaId:{
        type:String,
        required:true
    },
    overtimeNotified: {
        type: Boolean,
        default: false
      },
      overtimeDuration: {
        type: Number, 
        default: 0
      },
    status:{
        type:String,
        default:"Pending"
    }
},{
    timestamps:true
})

module.exports = mongoose.model("BookingModel",BookingModel);