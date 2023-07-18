import { useState, useEffect } from 'react'
import myDataGrid from './dataGrid'
import { Button } from '@mui/base'
import read from '../utils/readJobs'

function PrinterQueue({ socket }) {
    const columns = [
      {
        field: 'Rank',
        headerName: 'Rank',
        width: 150
      },
      {
        field: 'owner',
        headerName: 'Owner',
        width: 150
      },
      {
        field: 'id',
        headerName: 'Job Id',
        width: 150
      },
      {
        field: 'File',
        headerName: 'File',
        width: 150
      },
      {
        field: 'Size',
        headerName: 'Size',
        width: 150
      },
      {
        field: 'Delete',
        headerName: 'Delete',
        width: 150,
        renderCell:(params) => {
          console.log(params.value)
          return params.value
        }
      }
    ]

    const [rows,setRows] = useState([])

    useEffect(() => {
      socket.emit("readJobQReq")
      socket.on("readJobQRes", (data) => {
          read(data, setRows)
      })
    }, [socket])

    const handleClick = (e) => {
      e.preventDefault()
      socket.emit("readJobQReq")
    }
  return (
    <div>
      <Button onClick={ handleClick }>Refresh Queue</Button>
      <myDataGrid 
        rows = { rows }
        columns= { columns }
      />
    </div>
  )
}

export default PrinterQueue