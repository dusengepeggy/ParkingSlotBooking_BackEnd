const BookingModel = require("../models/booking.Model")

const createBooking = async (req, res, next) => {
    try {
        const newBooking = await BookingModel.create(req.body)
        res.status(201).json({ message: "Booking created successfully", booking: newBooking })
        
    } catch (error) {
        res.status(500).json({ message: "Error creating booking", error: error.message })
        
    }
}

const cancelBooking = async (req,res,next) =>{
    try {
        const exist = await BookingModel.findByIdAndDelete({_id:req.query.id})
        res.status(200).json({message:"Booking cancelled"})
        
    } catch (error) {
        res.status(500).json({message:"Error cancelling booking" , error:error.message})
        
    }
}


module.exports={
    createBooking,
    cancelBooking
}