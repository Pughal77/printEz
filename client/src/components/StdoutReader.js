const job = class {
    constructor(rank, owner, id, file, size) {
      this.rank = rank;
      this.owner = owner;
      this.id = id;
      this.file = file;
      this.size = size;
    }
  };

// this function returns an array of print job objects
export default function read (stdout, setJobList) {
    // when there are no jobs
    if (stdout[0] === "n"){
        setJobList([])
    } else {
        const regex = /Size/gm;
        let lastIndex;
        let m;
        while ((m = regex.exec(stdout)) !== null) {
            // This is necessary to avoid infinite loops with zero-width matches
            if (m.index === regex.lastIndex) {
                regex.lastIndex++;
            }
            // The result can be accessed through the `m`-variable.
            m.map(() => {
                lastIndex = m.index
            });
        }

        var result = []
        // iterate through the string and see for every first time u see a white space and fill out the
        // fields of the printQ objects respectively
        var count = 0
        var input = ""
        var info = []
        for (let i = lastIndex + 4; i < stdout.length; i++) {
            if (stdout[i] !== ' ') {
                input += stdout[i]
            } else {
                if (input.length > 0) {
                    count += 1
                    info.push(input)
                    input = ""
                }
            }
            if (count === 5){
                info[4] = info[4] + stdout.slice(i, i + 6)
                result.push(new job(...info))
                info = []
                i = i + 6
            }
        }
        setJobList(result)
    }
}

