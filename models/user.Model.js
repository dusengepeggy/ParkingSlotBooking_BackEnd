const mongoose=require("mongoose")

 const UserModel = mongoose.Schema({
    // uid:{
    //     type:String,
    //     required:true,
    //     unique:true
    // },

    email:{
        type:String,
        required:true,
        unique:true
    },
    countryCode:{
        type:String,
        required:true,
   
    },
    phoneNumber:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true,
        enum:{
            values:["security guard","user","parking owner"],
            message:"role must be admin or user"
        }
    },
    plateNumber:{
        type:String,
        unique:true
    },
    confirmed:{
        type:Boolean,
        default:false
    },
    otp:{
        type:Number,
        required:true
    }

 },
 {
    timestamps:true
 }
)


module.exports=mongoose.model("User",UserModel)