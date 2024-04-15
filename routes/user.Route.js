const { ConfirmAccount,loginWithEmail ,loginWithPhoneNumber,checkResetPasswordOtp} = require("../controllers/user.Auth")
const {createUser,updateUser, deleteUser, getUser,getAllUsers,forgotPassword} =require("../controllers/user.Controller")
const express = require("express")

const studentRoute=express.Router()

studentRoute.post("/createUser",createUser)

studentRoute.put("/updateUser",updateUser)

studentRoute.delete("/deleteUser",deleteUser)

studentRoute.get('/getUser',getUser)

studentRoute.get('/getAllUsers',getAllUsers)

studentRoute.get('/confirmPassword',ConfirmAccount)

studentRoute.post("/loginWithEmail",loginWithEmail)

studentRoute.post("/loginWithPhoneNumber",loginWithPhoneNumber)

studentRoute.post("/forgotPassword",forgotPassword)

studentRoute.post("/checkResetPasswordOtp",checkResetPasswordOtp)


module.exports={studentRoute}