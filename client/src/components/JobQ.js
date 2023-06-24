import { useState, useEffect } from "react"
import read from "./StdoutReader"

export default function JobQ({ socket }) {
    const [jobList, setJobList] = useState([])
    useEffect(() => {
        socket.emit("readJobQReq")
        socket.on("readJobQRes", (data) => {
            read(data, setJobList)
        })
    }, [socket])

    const handleClick = (e) => {
      e.preventDefault()
      socket.emit("readJobQReq")
    }

    const handleDelete = (id) => {
      socket.emit("delReq", id)
    }
    console.log(jobList[0])
  return (
    <div>
      <button onClick={handleClick}>
        Refresh Queue
      </button>
      <div>
        Print Queue for psc008: <br />
        { jobList.length > 0 && 
        <table>
          <tr>
            <th>rank</th>
            <th>owner</th>
            <th>id</th>
            <th>file</th>
            <th>size</th>
            <th>delete</th>
          </tr>
          {jobList.map((job) => {
            // todo job Element
            return (
              <tr key = {job.id}>
                <td>{job.rank}</td>
                <td>{job.owner}</td>
                <td>{job.id}</td>
                <td>{job.file}</td>
                <td>{job.size}</td>
                <td><button onClick={() => {handleDelete(job.id)}}>delete job</button></td>
                </tr>
            )
            })}
        </table>
        }
        { !jobList.length &&
          <p>no entries</p>
        }
      </div>
    </div>
    
  )
}
