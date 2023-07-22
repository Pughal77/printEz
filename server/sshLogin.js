// import events module
const EventEmitter = require('events');

// import simple-ssh module
const SSH = require("simple-ssh");

// import ssh2 module
const { Client } = require("ssh2");

// import fs module
const fs = require("fs");
const { stderr } = require('process');

class SSHLogin extends EventEmitter{// function to ssh into NUS unix servers
	// create new timeOutObj
	createTimeout(text, time, toDo){
		return setTimeout(() => {
			console.log(text);
			this.emit(toDo)
			return;
		  }, time);
	}
	// create new SSh instance
	login(credentials){
		const host = credentials.usertype == "student" ? "stu.comp.nus.edu.sg"
				: "stf.comp.nus.edu.sg";
		
		// console.log(`name: ${credentials.username}, password: ${credentials.password}`);
		// console.log(host);

		const sshObject = new SSH({
			host: host,
			user: credentials.username,
			pass: credentials.password
		});

		return sshObject;
	}

	loginAttempt(credentials){
		// set timeout for login (unsuccessful if unable to log in within the )
		const timeoutObj = this.createTimeout(
			"INVALID CREDENTIALS \n",
			2500,
			"unsuccessfulLogin"
		)
		
		const sshObject = this.login(credentials)
		// prints hostname
		sshObject
		.exec(/*"pusage"*/"ls", {
			out: (stdout) => {

				// obtain the relevant quotas from stdout
				// const text = stdout.toString();
				// const editedText = text.substring(text.indexOf("Available") + 17);
				// const normalQuota = editedText.substring(0, editedText.indexOf("Quota") - 2);
				// const colorQuota = editedText.substring(editedText.indexOf("Available") + 17, editedText.indexOf("If") - 2);
				const normalQuota = "";
				const colorQuota = "";

				console.log(`VALID CREDENTIALS\n`);
				console.log(`NORMAL QUOTA: ${normalQuota}`);
				console.log(`COLOR QUOTA: ${colorQuota}`);

				clearTimeout(timeoutObj);	
				this.emit("successfulLogin", {normalQuota, colorQuota});
			}
		}).start();
	}

	printFile(credentials, fileName){
		const sshObject = this.login(credentials)
		sshObject
		.exec(`lpr -P psc008 printez/${fileName}`, {})
		.exec(`lpq -P psc008`, {
			out: (stdout) => {
				console.log(`print Q: ${stdout}`);
				this.emit("readJobQRes", stdout)
			}
		})
		.start();
		// sshObject
		// .exec('ls', {
		// 	out: (stdout) => {
		// 		this.emit("readJobQRes", "ganyi-w's job has been processed: Dan Jurafsky and Ja.1 pages were printed.---------------------------------------------------------------------------Rank   Owner      Job  Files                                 Total Sizeactive pughal     158  printez/pughal.pdf                    117892 bytes")
		// 	}
		// })
		// .start();
	}

	jobQ(credentials){
		const sshObject = this.login(credentials)
		// for testing
		// const testData = "- file transferredprint Q: i0000872's job has been processed: draft_Proof_hi.pdf.28 pages were printed.---------------------------------------------------------------------------Rank   Owner      Job  Files                                 Total Sizeactive jamesllo   157  printez/jamesllo.pdf                  52061 bytes"
		sshObject
		.exec(`lpq -P psc008`, {
			out: (stdout) => {
				console.log(`print Q: ${stdout}`);
				this.emit("readJobQRes", stdout)
				// for testing
				// this.emit("readJobQRes", testData)
			}
		})
		.start();
	}

	deleteJob(credentials, id) {
		const sshObject = this.login(credentials)
		console.log(`Deleting job ${id}`)
		sshObject
		.exec(`lprm -P psc008 ${id}`, {})
		.start();
	}

	readFiles(credentials) {
		const timeoutObj = setTimeout(() => {
			console.log(`file is empty`);
			this.emit("readFilesRes", "")
			return;
		  }, 1000);

		const sshObject = this.login(credentials)
		console.log(`\nREADING PRINTEZ DIR`)
		sshObject
		.exec(`ls printez`, {
			out: (stdout) => {
				console.log(`${stdout}`);
				this.emit("readFilesRes", stdout)
				clearTimeout(timeoutObj);
			}
		})
		.start();
	}

	deleteFile(credentials, fileName, readFiles) {
		const timeoutObj =  setTimeout(() => {
				console.log(`${fileName} DELETED`);
				readFiles()
				return;
			  }, 500);
		
		const sshObject = this.login(credentials)
		console.log(`DELETING ${fileName}`)
		sshObject
		.exec(`rm -f printez/${fileName}`, {})
		.start();
	}
	
	toUnix(credentials, pdfFileName, deleteFile){
		console.log("ATTEMPTING TO TRANSFER FILE TO NUS UNIX SERVERS")

		const conn = new Client();

		conn.on('connect',
			function () {
				console.log("- connected");
			}
		);
		 
		conn.on('ready',
			function () {
				console.log("- ready");
		 
				conn.sftp(
					function (err, sftp) {
						if (err) {
							console.log("Error, problem starting SFTP: %s", err);
							process.exit(2);
						}
		 
						console.log( "- SFTP started" );

						
						// make directory
						sftp.mkdir("./printez", function(err) {
							if (err) {
							  console.log("Failed to create directory!");
							} else {
							  console.log("Directory created on SFTP server");
							}
						});
		 
						// upload file
						var readStream = fs.createReadStream(`print_files/${pdfFileName}`);
						var writeStream = sftp.createWriteStream(`printez/${pdfFileName}`);
		 
						// upload completed
						writeStream.on('close',
							function () {
								console.log("- file transferred");
								deleteFile();
								sftp.end();
							}
						);
		 
						// initiate transfer
						readStream.pipe(writeStream);
					}
				);
			}
		);
		 
		conn.on(
			'error',
			function (err) {
				console.log( "- connection error: %s", err );
				process.exit( 1 );
			}
		);
		 
		conn.on(
			'end',
			function () {
				process.exit( 0 );
			}
		);
		
		const host = credentials.usertype == "student" ? "stu.comp.nus.edu.sg"
				: "stf.comp.nus.edu.sg";
		conn.connect(
			{
				"host": host,
				"user": credentials.username,
				"password": credentials.password
			}
		);
	}
}

module.exports = SSHLogin;