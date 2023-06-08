import { useState, useEffect } from "react"

export default function JobQ({ socket }) {
    const [jobQ, setJobQ] = useState("")
    useEffect(() => {
        socket.on("readJobQRes", (data) => {
            console.log(data)
            setJobQ(data)
        })
    }, [socket])

    const handleClick = (e) => {
      e.preventDefault()
      socket.emit("readJobQReq")
    }
    
  return (
    <div>
      <button onClick={handleClick}>
        Refresh Queue
      </button>
      <div>
        Print Queue for psc008: <br />
        {jobQ}
      </div>
    </div>
    
  )
}
