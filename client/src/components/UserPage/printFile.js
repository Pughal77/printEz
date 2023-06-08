import React from 'react'

export default function PrintFile({ socket }) {
    const handleClick = (e) => {
        e.preventDefault()
        socket.emit("printAttempt")
    }
  return (
    <div>
        <button onClick={handleClick}>
            print
        </button>
    </div>
  )
}
