const express = require ("express")
const { createBooking ,cancelBooking,findBookingsByEmail} = require("../controllers/booking.controller")

const bookingRoute = express.Router()

bookingRoute.post("/book",createBooking)

bookingRoute.put("/cancel",cancelBooking)

bookingRoute.get("/findBookingsByEmail",findBookingsByEmail)



module.exports ={ bookingRoute}