const {createUser,updateUser, deleteUser, getUser} =require("../controllers/user.Controller")
const express = require("express")

const studentRoute=express.Router()

studentRoute.post("/createUser",createUser)

studentRoute.put("/updateUser",updateUser)

studentRoute.delete("/deleteUser",deleteUser)

studentRoute.get('/getUser',getUser)

module.exports={studentRoute}