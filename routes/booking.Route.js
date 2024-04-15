const express = require ("express")
const { createBooking } = require("../controllers/booking.controller")

const bookingRoute = express.Router()

bookingRoute.post("/book",createBooking)



module.exports ={ bookingRoute}