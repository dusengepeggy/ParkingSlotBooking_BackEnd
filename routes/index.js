const {studentRoute} =require("./user.Route")
const express = require("express")

const route = express.Router()

route.use("/user",studentRoute)

module.exports= route