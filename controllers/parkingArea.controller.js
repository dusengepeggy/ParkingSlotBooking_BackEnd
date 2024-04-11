const ParkingAreas = require("../models/parkingAreas.Model")


const addParking = async (req, res, next) => {
    try {
        const alreadyExist = await ParkingAreas.findOne({ email: req.body.email })
        if (alreadyExist) {
            res.status(400).json({ message: "Parking already exist" })
        }
        else {
            
            var totalSlots=[]
            var lev=65
            for(let i=1;i<=req.body.levelNumber;i++){
                for (let j=1;j<=req.body.slotPerLevel;j++){
                    var name=`${String.fromCharCode(lev)}${j}`
                    totalSlots.push({
                        name:name,
                        booked:false
                    })
                }
                lev++
                 

            }
            const newParking = new ParkingAreas({...req.body,slots:totalSlots})
            const parking = await newParking.save()
            res.status(201).json({ message: "Parking added successfully", parking })
        }
    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }
}

const getParking = async (req, res, next) => {
    try {
        const exist = await ParkingAreas.findOne({_id:req.query.id})
        if (exist) {
            res.status(200).json({ message: "Parking found", parking: exist })
        }
        else {
            res.status(404).json({ message: "Parking not found" })
        }
        
    } catch (error) {
        res.status(500).json({message:"Failed to get parking area data",error:error.message})
        
    }
}

const updateParking = async (req, res, next) => {

    try {
        const exist = await ParkingAreas.findByIdAndUpdate({_id:req.query.id},req.body,{new:true})
        if (exist) {
            res.status(200).json({ message: "Parking updated successfully", parking: exist })
        }
        else {
            res.status(404).json({ message: "Parking not found" })
        }
        
    } catch (error) {
        res.status(500).json({message:"Failed to update parking area data",error:error.message})
        
    }
}

const deleteParking = async (req, res, next) => {
    try {
        const exist = await ParkingAreas.findByIdAndDelete({_id:req.query.id})
        if (exist) {
            res.status(200).json({ message: "Parking deleted successfully" })
        }
        else {
            res.status(404).json({ message: "Parking not found" })
        }
        
    } catch (error) {
        res.status(500).json({message:"Failed to delete parking area data",error:error.message})
        
    }
}

const getAllParkings = async (req,res,next)=>{

    try {
        const exist = await ParkingAreas.find({})
        if (exist) {
            res.status(200).json({ message: "Parkings found", parkings: exist })
        }
        else {
            res.status(404).json({ message: "Parkings not found" })
        }
        
    } catch (error) {
        res.status(500).json({message:"Failed to get parking area data",error:error.message})
        
    }
}

module.exports ={
    addParking,
    getParking,
    updateParking,
    deleteParking,
    getAllParkings
}