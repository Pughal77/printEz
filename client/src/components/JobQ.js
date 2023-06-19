import { useEffect } from "react"

export default function JobQ({ socket }) {
    const [jobQ, setJobQ] = useState("")
    useEffect(() => {
        socket.on("readJobQ", (data) => {
            console.log(data)
            setJobQ(data)
        })
    }, [socket])
    
  return (
    <div>jobQ</div>
  )
}
