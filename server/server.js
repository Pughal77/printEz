const express = require('express')
const app = express()

app.get("/api", (req, res) => {
    res.json({ "users": ["userOne", "userTwo", "userThree"]})
    console.log(req.body)
})

app.listen(5000, () => {
    console.log("server is running on port 5000")
})