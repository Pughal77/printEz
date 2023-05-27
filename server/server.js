// import express module
const express = require("express");
const app = express();

// import cors module
const cors = require("cors");
app.use(cors());

// import other modules
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");
const { fs } = require("node:fs");
const sshLogin = require("./sshLogin");

// create express server
const server = http.createServer(app);

// create server for socket.io
const io = new Server(server, {
    maxHttpBufferSize: 1e8,
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});

// listen to events on connection
io.on("connection", (socket) => {
    let credentials = null;
    console.log(`Client Connected: ${socket.id}`);

    // credentials sent
    socket.on("loginAttempt", (credentials) => {
        //console.log(credentials);
        sshLogin(credentials);
        socket.emit("recievedCredentials", credentials);

    });

    // pdf file sent (CURRENTLY A WORK IN PROGRESS, files recieved as a buffer)
    // task: convert the buffer into a proper pdf file
    // socket.on("pdfTransfer", (pdfFile, callback) => {
    //     console.log(pdfFile)
    //     // save the content to the disk, for example
    //     fs("/tmp/upload", pdfFile, (err) => {
    //         callback({ message: err ? "failure" : "success" });
    //     });
    // });
});

server.listen(3001, () => {
    console.log("SERVER IS RUNNING (port 3001)")
});