const { ParkingAreaRoute } = require("./parkingArea.Route")
const {studentRoute} =require("./user.Route")
const express = require("express")

const route = express.Router()

route.use("/user",studentRoute)

route.use("/parkingArea",ParkingAreaRoute)

module.exports= route