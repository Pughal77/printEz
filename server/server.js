const express = require('express')
const app = express()
const http = require("http")
const { Server } = require("socket.io")
const cors = require("cors")
const sshLogin = require("./sshLogin")

app.use(cors())
// creating a http server using express
const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
})

io.on("connection", (socket) => {
    socket.on("login", (data) => {
        console.log(data)
        sshLogin.ssh(data)
        socket.emit("successfulLogin")
    })
})

server.listen(5000, () => {
    console.log("server is running on port 5000")
})