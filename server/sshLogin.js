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
	// create new ssh
	login(credentials){
		// set timeout for login (unsuccessful if unable to log in within the )
		const timeoutObj = setTimeout(() => {
			console.log("INVALID CREDENTIALS \n");
			this.emit("unsuccessfulLogin")
			return;
		  }, 15000);

		const host = credentials.usertype == "student" ? "stu.comp.nus.edu.sg"
				: "stf.comp.nus.edu.sg";
		
		// console.log(`name: ${credentials.username}, password: ${credentials.password}`);
		// console.log(host);

		const ssh_options = new SSH({
			host: host,
			user: credentials.username,
			pass: credentials.password
		});

		const result = {
			sshObject: ssh_options,
			timeout: timeoutObj
		}

		return result;
	}

	hostname(credentials){
		const { sshObject, timeout } = this.login(credentials)
		// prints hostname
		sshObject.exec("hostname", {
			out: (stdout) => {
				clearTimeout(timeout);
				this.emit("successfulLogin");
				console.log(`VALID CREDENTIALS\n HOSTNAME: ${stdout}`);
			}
		}).start();
	}

	printFile(credentials){
		const { sshObject, timeout } = this.login(credentials)
		// prints hostname
		sshObject.exec(`lpr -P psc008 printez/${credentials.username}.pdf`, {
			out: (stdout) => {
				clearTimeout(timeout);
				console.log(`printing`);
			},
			err: (stderr) => {
				console.log(stderr)
			}
		}).start();
	}
	// dk how to sync with printFile keep it here for now
	printQ({ sshObject, timeout }){
		return sshObject.exec(`lpq -P psc008`, {
			out: (stdout) => {
				clearTimeout(timeout);
				this.emit("print queue");
				console.log(`print Q: ${stdout}`);
			}
		}).start();
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