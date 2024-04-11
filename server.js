const express= require("express")
const mongoose=require("mongoose")
require("dotenv").config()
const port= process.env.PORT
const db =process.env.MONGO_URL
const app = express()
const route=require("./routes")

app.use(express.json());

app.use('/api/v1',route)
app.listen(port,()=>{
    mongoose.connect(db)
    .then( console.log(`Server is running on port ${port}`))
    .catch(err=>console.log(err))


})