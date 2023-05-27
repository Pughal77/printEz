// trying to ssh to sch server using node-ssh module
const SSH = require("simple-ssh")

exports.ssh = function ({ username, password, usertype }) {
    const host = usertype == "student" ? "stu.comp.nus.edu.sg" : "stf.comp.nus.edu.sg"
    var ssh = new SSH ({
        host: host,
        user: username,
        pass: password
    })
    ssh.exec('echo "loo"', {
	    out: (stdout) => {
        console.log("Successsful Login")
			  console.log(stdout)
	    }
	  }).start();
}