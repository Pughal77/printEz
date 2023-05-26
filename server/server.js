const express = require("express")
const cors = require("cors")
// const collection = require("./mongo")

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())

// app.get("", cors(), (req, res) => {
//     res.json({ "user": ["userOne", "userTwo", "userThree"]})
// })

app.get("", cors(), (req, res) => {
    res.json()
})

app.post("", async(req, res) => {
    const {credentials} = req.body

    const data = {
        credentials:credentials
    }

    await collection.insertMany([data])
})

app.listen(5000, () => {
    console.log("server is running on port 5000")
})