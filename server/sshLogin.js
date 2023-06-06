// import events module
const EventEmitter = require('events');

// import simple-ssh module
const SSH = require("simple-ssh");

// import ssh2 module
const { Client } = require("ssh2");

// import fs module
const fs = require("fs");
const { stdout } = require('process');

var readyToPrint = false;

class SSHLogin extends EventEmitter{// function to ssh into NUS unix servers
	login(credentials){
		// set timeout for login (unsuccessful if unable to log in within the )
		const timeoutObj = setTimeout(() => {
			console.log("INVALID CREDENTIALS \n");
			this.emit("unsuccessfulLogin")
			return;
		  }, 1500);

		const host = credentials.usertype == "student" ? "stu.comp.nus.edu.sg"
				: "stf.comp.nus.edu.sg";
		
		// console.log(`name: ${credentials.username}, password: ${credentials.password}`);
		// console.log(host);

		const ssh_options = new SSH({
			host: host,
			user: credentials.username,
			pass: credentials.password
		});

		// execute the df -h command to find out disk utilization
		ssh_options.exec("hostname", {
			out: (stdout) => {
				clearTimeout(timeoutObj);
				this.emit("successfulLogin");
				console.log(`VALID CREDENTIALS\n HOSTNAME: ${stdout}`);
			}
		}).start();

		return;
	}

	printFile(credentials){
		if (readyToPrint) {;

			const host = credentials.usertype == "student" ? "stu.comp.nus.edu.sg"
					: "stf.comp.nus.edu.sg";

			const ssh_options = new SSH({
				host: host,
				user: credentials.username,
				pass: credentials.password
			});

			// execute lpr command to print pdf
			ssh_options.exec(`lpr -P psc011 printez/${credentials.username}.pdf`, {
				// out: (stdout) => {
				// 	// clearTimeout(timeoutObj);
				// 	console.log(`SUCCESSFULLY PRINTED\n${stdout}`);
				// }
			}).exec(`lpq -P psc011`, {
				out: (stdout) => {
					console.log(stdout);
				}
			}).start();

			return;
		}
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
								readyToPrint = true;
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