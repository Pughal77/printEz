// import events module
const EventEmitter = require('events');

// import simple-ssh module
const SSH = require("simple-ssh");

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
}

module.exports = SSHLogin;