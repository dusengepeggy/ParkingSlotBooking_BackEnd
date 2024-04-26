const ParkingAreas = require("../models/parkingAreas.Model")


const addParking = async (req, res, next) => {
    try {
        const alreadyExist = await ParkingAreas.findOne({name: req.body.name })
        if (alreadyExist) {
            res.status(400).json({ message: "Parking already exist" })
        }
        else {

            let slotsCreated = 0;
            let totalSlotsArray = [];
            let totalSlots = req.body.levelNumber * req.body.slotPerLevel;
            
            var lev = 65

            req.body.categories.forEach(category => {
                for (let i = 1; i <= category.slots; i++) {
                    let name = `${String.fromCharCode(lev)}${i}`;
                    totalSlotsArray.push({
                        name: name,
                        booked: false,
                        category: category.name,
                        price: category.price
                    });
                    slotsCreated++;
                }
                lev++;
            });
    
            // Check for remaining slots and assign them
            if (slotsCreated < totalSlots) {
                const remainingSlots = totalSlots - slotsCreated;
                for (let i = 1; i <= remainingSlots; i++) {
                    let name = `${String.fromCharCode(lev)}${i}`;
                    totalSlotsArray.push({
                        name: name,
                        booked: false,
                        category: "Uncategorized",
                        price: req.body.pricePerHour  // You can choose to set a default price or leave it null
                    });
                }
            }
    
    
            
            const newParking = new ParkingAreas({ ...req.body, slots: totalSlotsArray })
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
        const exist = await ParkingAreas.findOne({ _id: req.query.id })
        if (exist) {
            res.status(200).json({ message: "Parking found", parking: exist })
        }
        else {
            res.status(404).json({ message: "Parking not found" })
        }

    } catch (error) {
        res.status(500).json({ message: "Failed to get parking area data", error: error.message })

    }
}

const updateParking = async (req, res, next) => {

    try {
        const exist = await ParkingAreas.findByIdAndUpdate({ _id: req.query.id }, req.body, { new: true })
        if (exist) {
            res.status(200).json({ message: "Parking updated successfully", parking: exist })
        }
        else {
            res.status(404).json({ message: "Parking not found" })
        }

    } catch (error) {
        res.status(500).json({ message: "Failed to update parking area data", error: error.message })

    }
}

const deleteParking = async (req, res, next) => {
    try {
        const exist = await ParkingAreas.findByIdAndDelete({ _id: req.query.id })
        if (exist) {
            res.status(200).json({ message: "Parking deleted successfully" })
        }
        else {
            res.status(404).json({ message: "Parking not found" })
        }

    } catch (error) {
        res.status(500).json({ message: "Failed to delete parking area data", error: error.message })

    }
}

const getAllParkings = async (req, res, next) => {

    try {
        const exist = await ParkingAreas.find({})

        res.status(200).json({ message: "Parkings found", parkings: exist })

    } catch (error) {
        res.status(500).json({ message: "Failed to get parking area data", error: error.message })

    }
}

module.exports = {
    addParking,
    getParking,
    updateParking,
    deleteParking,
    getAllParkings
}