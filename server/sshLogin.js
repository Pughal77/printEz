// requires user to download node module through following command
//      npm install simple-ssh
const SSH = require('simple-ssh');

// required to take input from user
const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// function to get input from user
function getInput() {
    const host = "stu.comp.nus.edu.sg";
    rl.question("What is the user? ", (user) => {
        rl.question("What is the password? ", (password) => {
            sshLogin(host, user , password);
        rl.close();
        });
    });
}

// function to ssh into a remote host.
function sshLogin(host, user ,password){
	var output = "";
	console.log('loading')
	const ssh_options = new SSH({
	    host: host,
	    user: user,
	    pass: password
	});
	// execute the df -h command to find out disk utilization
	ssh_options.exec('pusage', {
	    out: (stdout) => {
			return stdout;
	    },
		err : (stderr) => {
			return stderr;
		}
	}).start();
}

// exports = () => {return getInput()};
