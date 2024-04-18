const UserModel =require("../models/user.Model")
var bcrypt =require("bcryptjs")
var jwt = require("jsonwebtoken")

const ConfirmAccount=async(req,res,next)=>{
    try {
        const user=await UserModel.findOne({_id:req.query.id})
        if(!user){
            res.status(404).json({message:"User not found"})
        }
        else{
            if (req.body.otp===user.otp) {
                await UserModel.findByIdAndUpdate({_id:req.query.id},{confirmed:true})
                res.status(200).json({message:"Account confirmed"})

                
            } else {
                res.status(404).json({message:"Invalid OTP"})
                
            }
        }
        
    } catch (error) {
        res.status(500).json({message:"Error confirming account",error:error.message})
        
    }
}

const loginWithEmail = async (req,res,next) =>{
    try {
        const user=await UserModel.findOne({email:req.body.identifier})
        if(!user){
            res.status(404).json({message:"User not found"})
        }
        else{
            var passwordCheck =await bcrypt.compare(req.body.password,user.password) 
            if (passwordCheck ===true) {
                
                const token=await jwt.sign({ id: user._id },jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY))
                res.status(200).json({message:"Login successful",user:user,token:token})
            } else {
                res.status(404).json({message:"Invalid password"})
                
            }
        }
        
    } catch (error) {
        res.status(500).json({message:"Error Logging in",error:error.message})
        
    }
}

const loginWithPhoneNumber = async (req,res,next)=>{
    try {
        const user=await UserModel.findOne({phoneNumber:req.body.identifier})
        if(!user){
            res.status(404).json({message:"User not found"})
        }
        else{
            var passwordCheck =await bcrypt.compare(req.body.password,user.password) 
            if (passwordCheck ) {
                
                const token=await jwt.sign({ id: user._id },jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY))
                res.status(200).json({message:"Login successful",user:user,token:token})
            } else {
                res.status(404).json({message:"Invalid password"})
                
            }
        }
        
    } catch (error) {
        res.status(500).json({message:"Error Logging in",error:error.message})
        
    }
}

const checkResetPasswordOtp = async (req,res,next) =>{
    try {
        const user=await UserModel.findOne({email:req.body.email})
        if(!user){
            res.status(404).json({message:"User not found"})
        }
        else{
            if (req.body.otp==user.resetPasswordOtp) {
                res.status(200).json({message:"Reset password otp confirmed"})
            } else {
                res.status(404).json({message:"Invalid OTP"})
                
            }
        }
        
    } catch (error) {
        res.status(500).json({message:"Error confirming reset password otp",error:error.message})
        
    }
}

module.exports={
    ConfirmAccount,
    loginWithEmail,
    loginWithPhoneNumber,
    checkResetPasswordOtp
}