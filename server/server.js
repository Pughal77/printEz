// import express module
const express = require("express");
const app = express();

// import cors module
const cors = require("cors");
app.use(cors());

// import other modules
const http = require("http");
const { Server } = require("socket.io");
const fs = require("fs");

// import login module
const SSHLogin = require("./sshLogin");
const sshLogin = new SSHLogin();

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
    // temp variable to store user_credentials
    let user_credentials = null;
    // temp flag to determine if file has been uploaded
    // needed to determine if there is a file that needs to be deleted
    let fileUploaded = false;

    console.log(`Client Connected: ${socket.id}`);
    socket.emit("newConnection");
    // receiving credentials 
    socket.on("loginAttempt", (credentials) => {
        // flag to indicate if event was already emitted
        let waiting = true;

        console.log("\n");
        console.log(credentials);
        // credentials verified
        sshLogin.on("successfulLogin", (quotas) => {
            if (waiting) {
                console.log("emitting 'recieved Credentials'")
                user_credentials = credentials;
                socket.emit("recievedCredentials", quotas);
                waiting = false;
            }
        });

        // credentials invalid
        sshLogin.on("unsuccessfulLogin", () => {
            if (waiting) {
                console.log("emitting 'invalid Credentials'")
                socket.emit("invalidCredentials");
                waiting = false;
            }
        });
        
        // attempt to log in with current credentials
        console.log(`attempting to log-in for ${credentials.username}`);
        sshLogin.loginAttempt(credentials); 
    });

    // receiving pdf file
    socket.on("pdfTransfer", ({ selectedFile, fileName }, callback) => {
        console.log(fileName)
        // save the content to the disk if credentials are entered
        if (user_credentials) {
            // write file into node_module folder with same name as username
            fs.writeFile(`print_files/${fileName}`, selectedFile, (err) => {
                if (err) {
                    console.log(err);
                    callback({ message: "failure" });
                } else {
                    // set flag to true
                    fileUploaded = true;
                    sshLogin.toUnix(user_credentials, fileName);
                    console.log("file written to print_files directory");    
                    callback({ message: "success" });
                    socket.emit("fileUploaded");
                    sshLogin.on("fileInUnix", (pdfFileName) => {
                        fs.unlink(`print_files/${pdfFileName}`, (err) => {
                            if (err) {
                                console.log(err);
                            }
                        })
                    })
                }
            });
                    
        } else {
            socket.emit("missingCredentials");
        }
    });

    socket.on("printAttempt", () => {
        if (user_credentials) {
            sshLogin.printFile(user_credentials)
            sshLogin.on("readJobQRes", (data) => {
                socket.emit("readJobQRes", data)
            })
        } else {
            socket.emit("missingCredentials");
        }
    })

    socket.on("readJobQReq", () => {
        if (user_credentials) {
            sshLogin.jobQ(user_credentials)
            sshLogin.on("readJobQRes", (data) => {
                socket.emit("readJobQRes", data)
            })
        } else {
            socket.emit("missingCredentials");
        }
    })

    socket.on("delReq", (id) => {
        if (user_credentials) {
            sshLogin.deleteJob(user_credentials, id)
        } else {
            socket.emit("missingCredentials");
        }
    })

    socket.on("disconnect", () => {
        console.log(`Client Disonnected: ${socket.id}`)
    });
});

server.listen(3001, () => {
    console.log("SERVER IS RUNNING (port 3001)")
});