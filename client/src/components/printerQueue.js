import { useState, useEffect } from 'react'
import MyDataGrid from './dataGrid'
import read from '../utils/readJobs'
import { Box, Button } from '@mui/material'
import MyButton from '../style/MyButton'

function PrinterQueue({ socket }) {
    const columns = [
      {
        field: 'rank',
        headerName: 'Status',
        width: 100
      },
      {
        field: 'owner',
        headerName: 'Owner',
        width: 100
      },
      {
        field: 'id',
        headerName: 'Job Id',
        width: 75
      },
      {
        field: 'file',
        headerName: 'File',
        width: 150
      },
      {
        field: 'size',
        headerName: 'Size',
        width: 100
      },
      {
        field: 'Delete',
        headerName: 'Delete Job',
        width: 100,
        renderCell:(params) => {
          // use params.row to access properties of values in that cell
          const handleDelete = (id) => {
            socket.emit("delReq", id)
            socket.emit("readJobQReq")
          }
          return <Button onClick={() => handleDelete(params.row.id)}>Delete</Button>
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
    <Box
      sx={{
        backgroundColor: "primary.main",
        minWidth: "40%"
      }}
    >
      <MyButton
            addStyle={{mb: "10px"}}
            text="Refresh Queue"
            onClick={handleClick}
      />
      <MyDataGrid 
        rows = { rows }
        columns= { columns }
      />
    </Box>
  )
}

export default PrinterQueue