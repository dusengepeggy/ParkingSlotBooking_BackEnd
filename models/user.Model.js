const mongoose=require("mongoose")


 const UserModel = mongoose.Schema({


    email:{
        type:String,
        required:true,
        unique:true
    },

    phoneNumber:{
        
        type:String,
        unique:true,
        
        
    },
    userName:{
        type:String,
        unique:true

    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true,

    },
    vehicle:{
        type:Object,
        
        
    },
    confirmed:{
        type:Boolean,
        default:false
    },
    otp:{
        type:Number,
        required:true
    },
    resetPasswordOtp:{
        type:String,

    }

 },
 {
    timestamps:true
 }
)


module.exports=mongoose.model("User",UserModel)