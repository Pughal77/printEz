// requires user to download node module through following command
//      npm install simple-ssh
const SSH = require('simple-ssh');

// required to take input from user
const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// function to ssh into a remote host.
function sshLogin(credentials){
	var output = "";
	console.log(`name: ${credentials.username}, password: ${credentials.password}`);

	const host = credentials.usertype == "student" ? "stu.comp.nus.edu.sg"
			: "stf.comp.nus.edu.sg";
	console.log(host);
	const ssh_options = new SSH({
	    host: host,
	    user: credentials.username,
	    pass: credentials.password
	});
	
	// execute the df -h command to find out disk utilization
	ssh_options.exec('pusage', {
	    out: (stdout) => {
			console.log('valid credentials')
			return stdout;
	    },
		err : (stderr) => {
			console.log('invalid credentials')
			return stderr;
		}
	}).start();
}

module.exports = sshLogin;
