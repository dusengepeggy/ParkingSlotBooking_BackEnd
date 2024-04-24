const sendEmail = require("../middlewares/sendEmail")
const BookingModel = require("../models/booking.Model")

const ParkingAreas = require ("../models/parkingAreas.Model")

const createBooking = async (req, res, next) => {
    try { 
        console.log(req.body);
        const {endDate,startDate,duration,...rest}=req.body
        const bookedBuilding = await ParkingAreas.findOne({ _id: req.query.id })
        const allSlots=  bookedBuilding.slots
        const bookedSlot = allSlots.find(slot=>slot.booked=false)

        bookedSlot.booked=true

        console.log(allSlots)
        const newBooking = await BookingModel.create({...rest,endDate:Date(endDate),startDate:Date(startDate),duration:Number(duration),parkingAreaId:bookedBuilding._id,slot:bookedSlot.name})


        await ParkingAreas.findByIdAndUpdate({_id:bookedBuilding._id},{slots:allSlots})

        await sendEmail(req.body.email,'YOUR BOOKING SLOT',`Your reservation have been successfully made your slot number is :${bookedSlot.name}`)


        
        res.status(201).json({ message: "Booking created successfully", booking: newBooking })
        
        
    } catch (error) {
        res.status(500).json({ message: "Error creating booking", error: error.message })
        
    }
}

const cancelBooking = async (req,res,next) =>{
    try {
        const exist = await BookingModel.findOne({_id:req.query.id})

        if (!exist) {
            res.status(404).json({ message: "Booking not found" })
        }
        else{
            const bookedBuilding = await ParkingAreas.findOne({ _id: exist.parkingAreaId })
            const allSlots=  bookedBuilding.slots
            const bookedSlot = allSlots.find(slot=>slot.name===exist.slot)
            bookedSlot.booked=false
            await ParkingAreas.findByIdAndUpdate({_id:exist.parkingAreaId},{slots:allSlots})
            await BookingModel.findByIdAndDelete({_id:req.query.id})
            res.status(200).json({message:"Booking cancelled"})
        }
       
        
    } catch (error) {
        res.status(500).json({message:"Error cancelling booking" , error:error.message})
        
    }
}

const startBooking =async (req,res,next)=>{
    try {
        
       
    } catch (error) {
        
    }
}


module.exports={
    createBooking,
    cancelBooking
}