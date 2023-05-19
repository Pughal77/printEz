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
            ssh(host, user ,password);
        rl.close();

        });
    });

}

// function to ssh into a remote host.
function ssh(host, user ,password){

	console.log('inside the system')
	const ssh_options = new SSH({
	    host: host,
	    user: user,
	    pass: password
	});
	// execute the df -h command to find out disk utilization
	ssh_options.exec('pusage', {
	    out: (stdout) => {
	        console.log(stdout);
	    }
	}).start();
}

function main(){
	getInput();
}

main();

// const fs = require('fs')
// const path = require('path')
// const {NodeSSH} = require('node-ssh')

// const ssh = new NodeSSH()

// const password = "Teppan7/7";

// ssh.connect({
//   host: 'stu.comp.nus.edu.sg',
//   username: 'jamesllo',
//   port: 22,
//   password,
//   tryKeyboard: true,
// });

