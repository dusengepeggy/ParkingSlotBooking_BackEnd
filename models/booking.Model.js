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
    }
},{
    timestamps:true
})

module.exports = mongoose.model("BookingModel",BookingModel);