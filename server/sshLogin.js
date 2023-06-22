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
			1500,
			"unsuccessfulLogin"
		)

		const sshObject = this.login(credentials)
		// prints hostname
		sshObject.exec("pusage", {
			out: (stdout) => {

				// obtain the relevant quotas from stdout
				const text = stdout.toString();
				const editedText = text.substring(text.indexOf("Available") + 17);
				const normalQuota = editedText.substring(0, editedText.indexOf("Quota") - 2);
				const colorQuota = editedText.substring(editedText.indexOf("Available") + 17, editedText.indexOf("If") - 2);

				console.log(`VALID CREDENTIALS\n`);
				console.log(`NORMAL QUOTA: ${normalQuota}`);
				console.log(`COLOR QUOTA: ${colorQuota}`);

				clearTimeout(timeoutObj);	
				this.emit("successfulLogin", {normalQuota, colorQuota});
			}
		}).start();
	}

	printFile(credentials){
		const sshObject = this.login(credentials)
		sshObject
		.exec(`lpr -P psc008 printez/${credentials.username}.pdf`, {})
		.exec(`lpq -P psc008`, {
			out: (stdout) => {
				console.log(`print Q: ${stdout}`);
				this.emit("readJobQRes", stdout)
			}
		})
		.start();
	}

	jobQ(credentials){
		const sshObject = this.login(credentials)
		sshObject
		.exec(`lpq -P psc008`, {
			out: (stdout) => {
				console.log(`print Q: ${stdout}`);
				this.emit("readJobQRes", stdout)
			}
		})
		.start();
	}
	
	toUnix(credentials){
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
							  console.log("Failed to create directory!", err);
							} else {
							  console.log("Directory created on SFTP server");
							}
						});
		 
						// upload file
						var readStream = fs.createReadStream(`print_files/${credentials.username}.pdf`);
						var writeStream = sftp.createWriteStream(`printez/${credentials.username}.pdf`);
		 
						// upload completed
						writeStream.on('close',
							function () {
								console.log("- file transferred");
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