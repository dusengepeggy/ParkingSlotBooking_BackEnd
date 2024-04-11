const express =require("express")
const { addParking ,getParking,updateParking,deleteParking,getAllParkings} = require("../controllers/parkingArea.controller")
const ParkingAreaRoute = express.Router()


ParkingAreaRoute.post("/add",addParking)

ParkingAreaRoute.get("/get",getParking)

ParkingAreaRoute.put("/update",updateParking)

ParkingAreaRoute.delete("/delete",deleteParking)

ParkingAreaRoute.get("/getAll",getAllParkings) 
 

module.exports={ParkingAreaRoute}
