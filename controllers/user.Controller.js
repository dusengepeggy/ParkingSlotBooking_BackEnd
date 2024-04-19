const sendEmail = require("../middlewares/sendEmail");
const UserModel = require("../models/user.Model");
const bcrypt = require("bcryptjs")

const createUser = async (req, res, next) => {
    try {
        const { password, ...rest } = req.body
        const alreadyExist = await UserModel.findOne({ email: req.body.email })
        if (!alreadyExist) {
            var newPassword = await bcrypt.hashSync(password, 16)
            var otp = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000
            const newUser = await UserModel.create({ ...rest, password: newPassword, otp: otp })

            await sendEmail(newUser.email, "Confirm it's you ", `your OTP-code is ${otp} `)
            res.status(201).json({ message: "User created successfully", user: newUser })


        }
        else {

            res.status(400).json({ message: "User already exist" })
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

const updatePassword = async (req, res, next) => {
    try {
        const exist = await UserModel.findOne({ email: req.body.email })
        if (!exist) {
            res.status(404).json({ message: "User not found" })
        }
        else {
            const user = await UserModel.findByIdAndUpdate(exist._id, { password: req.body.password })
            res.status(200).json({ message: "Password updated successfully", user: user })
        }
    }
    catch (error) {
        res.status(500).json({ message: "Error updating password", error: error.message })
    }
}

const deleteUser = async (req, res, next) => {
    try {
        const exist = await UserModel.findByIdAndDelete({ _id: req.query.id })
        if (exist) {
            res.status(200).json({ message: "User deleted successfully" })
        }
        else {
            res.status(404).json({ message: "User not found" })
        }


    } catch (error) {
        res.status(500).json({ message: "Error updating user", error: error.message })

    }
}

const getUser = async (req, res, next) => {
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

const getAllUsers = async (req, res, next) => {
    try {
        const users = await UserModel.find({})
        res.status(200).json({ message: "Users found successfully", users: users })
    } catch (error) {
        res.status(500).json({ message: "Error finding users", error: error.message })
    }
}

const forgotPassword = async (req, res, next) => {
    try {
        const exist = await UserModel.findOne({ email: req.body.email })
        if (!exist) {
            res.status(404).json({ message: "User not found" })
        }
        else {
            const otp = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000
            await UserModel.findByIdAndUpdate({ _id: exist._id }, { resetPasswordOtp: otp })
            await sendEmail(req.body.email, "RESET YOUR PASSWORD", `your OTP-code for reseting password is ${otp} `)
            res.status(201).json({ message: "OTP sent", otp: otp })
        }


    } catch (error) {
        res.status(500).json({ message: "Error reseting password user", error: error.message })

    }



}





module.exports = {
    createUser,
    updateUser,
    deleteUser,
    getUser,
    getAllUsers,
    forgotPassword,
    updatePassword
}



