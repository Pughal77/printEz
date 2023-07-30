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
			this.emit(toDo);
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
		let credentialsCorrect = false;
		const timeoutObj = setTimeout(() => {
			if (!credentialsCorrect) {
				console.log("INVALID CREDENTIALS \n");
				this.emit("unsuccessfulLogin");
				return;
			} else {
				console.log("ERROR - SOC UNIX COMMANDS NOT FUNCTIONING");
				this.emit("unixDown");
				return;
			}

		}, 25000);
		
		const sshObject = this.login(credentials)
		
		sshObject
		.exec("hostname", {
			out: (stdout) => {
				credentialsCorrect = true;
			}
		})
		.exec("pusage", {
			out: (stdout) => {

				// obtain the relevant quotas from stdout
				const text = stdout.toString();
				const editedText = text.substring(text.indexOf("Available") + 17);
				const normalQuota = editedText.substring(0, editedText.indexOf("Quota") - 2);
				const colorQuota = editedText.substring(editedText.indexOf("Available") + 17, editedText.indexOf("If") - 2);
				
				// test data
				// const normalQuota = "85 pages (+od)"
				// const colorQuota = "0 pages"

				console.log(`VALID CREDENTIALS\n`);
				console.log(`NORMAL QUOTA: ${normalQuota}`);
				console.log(`COLOR QUOTA: ${colorQuota}`);

				clearTimeout(timeoutObj);	
				this.emit("successfulLogin", {normalQuota, colorQuota});
				return;
			}
		}).start();
	}

	checkQuota(credentials) {
		const timeoutObj = setTimeout(() => {
			console.log("ERROR - SOC UNIX COMMANDS NOT FUNCTIONING");
			this.emit("unixDown");
			return;
		}, 2500);

		const sshObject = this.login(credentials);

		sshObject
		.exec("pusage", {
			out: (stdout) => {

				// obtain the relevant quotas from stdout
				const text = stdout.toString();
				const editedText = text.substring(text.indexOf("Available") + 17);
				const normalQuota = editedText.substring(0, editedText.indexOf("Quota") - 2);
				const colorQuota = editedText.substring(editedText.indexOf("Available") + 17, editedText.indexOf("If") - 2);
				
				// test data
				// const normalQuota = "85 pages (+od)"
				// const colorQuota = "0 pages"

				console.log(`NORMAL QUOTA: ${normalQuota}`);
				console.log(`COLOR QUOTA: ${colorQuota}`);

				clearTimeout(timeoutObj);	
				this.emit("quotaRes", {normalQuota, colorQuota});
				return;
			}
		}).start();

	}

	printFile(credentials, fileName, printer){
		console.log(`PRINTING ON ${printer}`);
		const sshObject = this.login(credentials);
		const timeoutObj = setTimeout(() => {
			console.log(`jobQ not responding`);
			return;
		  }, 1000);

		sshObject
			.exec(`lpr -P ${printer} printez/${fileName}`, {})
			.exec(`lpq -P ${printer}`, {
				out: (stdout) => {
					console.log(`print Q: ${stdout}`);
					// lpq command currently does not work
					this.emit("readJobQRes", stdout)
					console.log(`readJobQRes emitted`);
					clearTimeout(timeoutObj);
					return;
				}
			})
			.start();
	}

	jobQ(credentials, printer){
		const sshObject = this.login(credentials)
		console.log(`ATTEMPTING TO READ JOB Q OF ${printer}`)
		const timeoutObj = setTimeout(() => {
			console.log(`jobQ not responding`);
			return;
		  }, 1000);

		// for testing
		// const testData = "- file transferredprint Q: i0000872's job has been processed: draft_Proof_hi.pdf.28 pages were printed.---------------------------------------------------------------------------Rank   Owner      Job  Files                                 Total Sizeactive jamesllo   157  printez/SampleResume.pdf                  78021 bytes"
		// this.emit("readJobQRes", testData);
		// return;

		sshObject
		.exec(`lpq -P ${printer}`, {
			out: (stdout) => {
				console.log(`print Q: ${stdout}`);
				this.emit("readJobQRes", stdout);
				console.log(`readJobQRes emitted`);
				clearTimeout(timeoutObj);
				return;
			}
		})
		.start();
	}

	deleteJob(credentials, id, printer) {
		const sshObject = this.login(credentials)
		console.log(`Deleting job ${id}`)
		sshObject
		.exec(`lprm -P ${printer} ${id}`, {})
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
				console.log(`files in printez dir: ${stdout}`);
				this.emit("readFilesRes", stdout)
				clearTimeout(timeoutObj);
				return;
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