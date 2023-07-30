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
        // current frontend deployment link
        origin: "https://orbital23printez.netlify.app/",
        methods: ["GET", "POST"],
    },
});

// listen to events on connection
io.on("connection", (socket) => {
    // temp variable to store user_credentials
    let user_credentials = null;

    console.log(`Client Connected: ${socket.id}`);
    socket.emit("newConnection");
    // receiving credentials
    socket.on("loginAttempt", (credentials) => {
        // flag to indicate if event was already emitted
        let waiting = true;

        console.log("\n");
        // console.log(credentials);

        // credentials verified
        sshLogin.on("successfulLogin", (quotas) => {
            if (waiting) {
                console.log("emitting 'recieved Credentials'")
                user_credentials = credentials;
                socket.emit("recievedCredentials", quotas);
                waiting = false;
                sshLogin.readFiles(credentials);
                sshLogin.on("readFilesRes", (data) => {
                    socket.emit("readFilesRes", data)
                });
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

        // NUS SoC unix server commands not working
        sshLogin.on("unixDown", () => {
            if (waiting) {
                console.log("emitting 'unixDown'")
                socket.emit("unixDown");
                waiting = false;
            }
        });

        // attempt to log in with current credentials
        console.log(`attempting to log-in for ${credentials.username}`);
        sshLogin.loginAttempt(credentials);
    });

    socket.on("quotaReq", () => {
        waiting = true;
        sshLogin.on("quotaRes", (quotas) => {
            if (waiting) {
                socket.emit("quotaRes", quotas);
                waiting = false;
            }
        });

        sshLogin.on("unixDown", () => {
            if (waiting) {
                socket.emit("invalidCredentials");
                waiting = false;
            }
        });

        console.log(`checking quota for ${user_credentials.username}`);
        sshLogin.checkQuota(user_credentials);
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
                    
                    const deleteFile = () => {
                        fs.unlink(`print_files/${fileName}`, (err) => {
                            if (err) {
                                console.log(err);
                            }
                        });
                        sshLogin.readFiles(user_credentials);
                    }
                    sshLogin.toUnix(user_credentials, fileName, deleteFile);
                    console.log("file written to print_files directory");
                    // callback({ message: "success" });
                    sshLogin.on("readFilesRes", (data) => {
                        socket.emit("readFilesRes", data);
                    })
                }
            });

        } else {
            socket.emit("missingCredentials");
        }
    });

    socket.on("printAttempt", (input) => {
        if (user_credentials) {
            sshLogin.printFile(user_credentials, input.fileName, input.printer)
            sshLogin.on("readJobQRes", (data) => {
                socket.emit("readJobQRes", data)
            })
        } else {
            socket.emit("missingCredentials");
        }
    })

    socket.on("readJobQReq", (printer) => {
        if (user_credentials) {
            sshLogin.jobQ(user_credentials, printer)
            sshLogin.on("readJobQRes", (data) => {
                socket.emit("readJobQRes", data)
            })
        } else {
            socket.emit("missingCredentials");
        }
    })

    socket.on("delReq", (input) => {
        if (user_credentials) {
            sshLogin.deleteJob(user_credentials, input.id, input.printer);
        } else {
            socket.emit("missingCredentials");
        }
    })

    // socket.on("readFilesReq", () => {
    //     if (user_credentials) {
    //         sshLogin.readFiles(user_credentials)
    //         sshLogin.on("readFilesRes", (data) => {
    //             socket.emit("readFilesRes", data)
    //         })
    //     } else {
    //         socket.emit("missingCredentials");
    //     }
    // })

    socket.on("deleteFile", (fileName)=> {
        if (user_credentials) {
            let readFiles = () => {sshLogin.readFiles(user_credentials)};
            sshLogin.deleteFile(user_credentials, fileName, readFiles);
            
            sshLogin.on("readFilesRes", (data) => {
                socket.emit("readFilesRes", data);
            })
        } else {
            socket.emit("missingCredentials");
        }
    })

    socket.on("disconnect", () => {
        console.log(`Client Disonnected: ${socket.id}`)
    });
});

server.listen(80, () => {
    console.log("SERVER IS RUNNING (PORT 80 - DEFAULT PORT)");
});