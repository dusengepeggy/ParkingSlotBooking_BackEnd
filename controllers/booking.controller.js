const sendEmail = require("../middlewares/sendEmail")
const BookingModel = require("../models/booking.Model")

const ParkingAreas = require("../models/parkingAreas.Model")

const nodeSchedule = require('node-schedule');

const checkAndNotifyOvertime = async (bookingId) => {
    try {
        const booking = await BookingModel.findById(bookingId);
        if (!booking) return;

        const now = new Date();
        if (now > booking.endDate) {
            const exceededTimeInHours = ((now - booking.endDate) / 3600000).toFixed(2); // Hours
            booking.overtimeDuration = parseFloat(exceededTimeInHours);

            if (!booking.overtimeNotified) {
                await sendEmail(booking.email, 'THE TIME YOU BOOKED IS UP', 'Dear customer we would like to let you know that the hours you booked are over and you are required to evacuate the space as soon as possible else you will have to pay extra charges')
                console.log('Overtime email sent');
                booking.overtimeNotified = true;
            }
            await booking.save();
        }
    } catch (err) {
        console.error('Error in checkAndNotifyOvertime:', err);
    }
}

const createBooking = async (req, res, next) => {
    try {
        console.log(req.body);
        const { endDate, startDate, duration, ...rest } = req.body
        const bookedBuilding = await ParkingAreas.findOne({ _id: req.query.id })
        const allSlots = bookedBuilding.slots
        const bookedSlot = allSlots.find(slot => slot.booked == false && slot.category ==  req.body.category)

        bookedSlot.booked = true

        console.log(allSlots)
        const newBooking = await BookingModel.create({ ...rest, endDate:new Date(endDate), startDate:new Date(startDate), duration: Number(duration), parkingAreaId: bookedBuilding._id, slot: bookedSlot.name })

        await ParkingAreas.findByIdAndUpdate({ _id: bookedBuilding._id }, { slots: allSlots })

        await sendEmail(req.body.email, 'YOUR BOOKING SLOT', `Your reservation have been successfully made your slot number is :${bookedSlot.name}`)

        nodeSchedule.scheduleJob(" * * * * * *",
            function(a=newBooking.endDate){
                checkAndNotifyOvertime(newBooking._id);
                this.reschedule('* * * * * *');
            }
            
        )


        res.status(201).json({ message: "Booking created successfully", booking: newBooking })


    } catch (error) {
        res.status(500).json({ message: "Error creating booking", error: error.message })

    }
}

const cancelBooking = async (req, res, next) => {
    try {
        const exist = await BookingModel.findOne({ _id: req.query.id })

        if (!exist) {
            res.status(404).json({ message: "Booking not found" })
        }
        else {
            const bookedBuilding = await ParkingAreas.findOne({ _id: exist.parkingAreaId })
            const allSlots = bookedBuilding.slots
            const bookedSlot = allSlots.find(slot => slot.name === exist.slot)
            bookedSlot.booked = false
            await ParkingAreas.findByIdAndUpdate({ _id: exist.parkingAreaId }, { slots: allSlots })
            await BookingModel.findByIdAndUpdate({ _id: req.query.id },{status:"cancelled"})
            res.status(200).json({ message: "Booking cancelled" })
        }


    } catch (error) {
        res.status(500).json({ message: "Error cancelling booking", error: error.message })

    }
}

const checkoutCar=async(req,res,next)=>{
    try {
        const exist = await BookingModel.findOne({ _id: req.query.id })
        if (!exist) {
            res.status(404).json({ message: "Booking not found" })
        }
        else {

            const bookedBuilding = await ParkingAreas.findOne({ _id: exist.parkingAreaId })
            const allSlots = bookedBuilding.slots
            const bookedSlot = allSlots.find(slot => slot.name === exist.slot)
            bookedSlot.booked = false
            await ParkingAreas.findByIdAndUpdate({ _id: exist.parkingAreaId }, { slots: allSlots })
            res.status(200).json({ message: "Booking cancelled" })
        }
    }
    catch (error) {
        res.status(500).json({ message: "Error cancelling booking", error: error.message })
    }    
}

const findBookingsByEmail = async (req,res,next) =>{
    try {
        const bookings = await BookingModel.find({ email: req.query.email })
        res.status(200).json({ message: "Bookings found successfully", bookings: bookings })
        
    } catch (error) {
        res.status(500).json({ message: "Error fetching bookings", error: error.message })
        
    }
}


module.exports = {
    createBooking,
    cancelBooking,
    findBookingsByEmail
}