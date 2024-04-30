const Notification =require("../models/notification.Model")


const createNotification = async (req,res,next)=>{
    try {
        
        const notification=await Notification.create(req.body)
        res.status(200).json({message:"Notification sent successfully",notification:notification})
        
    } catch (error) {
        res.status(500).json({message:"Error sending notification",error:error.message})
        
    }
}

