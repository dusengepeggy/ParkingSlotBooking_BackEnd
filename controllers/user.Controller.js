const UserModel = require("../models/user.Model");

const createUser = async (req, res, next) => {
    try {
        const alreadyExist = await UserModel.findOne({ email: req.body.email })
        if (alreadyExist) {
            res.status(400).json({ message: "User already exist" })
        }
        else {
            const newUser = await UserModel.create(req.body)
            res.status(201).json({ message: "User created successfully", user: newUser })

        }

    } catch (error) {
        res.status(500).json({ message: "Error saving user", error: error.message })

    }
}


const updateUser = async (req, res, next) => {
    try {
        const exist = await UserModel.findOne({ _id: req.query.id })
        if (!exist) {
            res.status(404).json({ message: "User not found" })
        }
        else {
            const user = await UserModel.findByIdAndUpdate(req.query.id, { ...req.body })
            res.status(200).json({ message: "User updated successfully", user: user })
        }
    } catch (error) {
        res.status(500).json({ message: "Error updating user", error: error.message })

    }
}

const deleteUser =async (req,res,next)=>{
    try {
        const exist = await UserModel.findByIdAndDelete({_id:req.query.id})
        
    } catch (error) {
        res.status(500).json({message:"Error updating user" , error:error.message})
        
    }
}

const getUser = async (req,res,next)=>{
    try {
        const exist = await UserModel.findOne({ uid: req.query.uid })
        if (!exist) {
            res.status(404).json({ message: "User not found" })
        }
        else {
            res.status(200).json({ message: "User found successfully", user: exist })
        }
    } catch (error) {
        res.status(500).json({ message: "Error finding user", error: error.message })

    }    
}   





module.exports = {
    createUser,
    updateUser,
    deleteUser,
    getUser
}



