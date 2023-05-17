const { exec } = require('node:child_process')

// run the `ls` command using exec
exec('ssh jamesllo@stu.comp.nus.edu.sg;', (err, output) => {
    // once the command has completed, the callback function is called
    if (err) {
        // log and return if we encounter an error
        console.error("could not execute command: ", err)
        return
    }
    // log the output received from the commands
    console.log("Output: \n", output)
})