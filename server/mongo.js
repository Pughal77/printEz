const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost:27017/loginCredentials")
.then(() => {
    console.log("connected")
})
.catch(() => {
    console.log("connection failed")
})

const newSchema = new mongoose.Schema({
    credentials:{
        type:Object,
        required:true
    }
})

const collection = mongoose.model("collection", newSchema)

module.exports = collection