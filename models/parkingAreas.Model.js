const mongoose = require("mongoose")

const ParkingAreasModel=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    generalInfo:{
        type:String,
        required:true
    },
    pricePerHour:{
        type:Number,
        required:true
    },
    levelNumber:{
        type:Number,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    slotPerLevel:{
        type:Number,
        required:true
    },
    slots:{
        type:Array,
        required:true
    },
    
},{
    timestamps:true
})




const ParkingAreas=mongoose.model("ParkingAreas",ParkingAreasModel)

module.exports=ParkingAreas