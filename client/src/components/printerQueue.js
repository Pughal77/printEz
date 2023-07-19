import { useState, useEffect } from 'react'
import MyDataGrid from './dataGrid'
import read from '../utils/readJobs'
import { Box,Button } from '@mui/material'

function PrinterQueue({ socket }) {
    const columns = [
      {
        field: 'rank',
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
        field: 'file',
        headerName: 'File',
        width: 150
      },
      {
        field: 'size',
        headerName: 'Size',
        width: 150
      },
      {
        field: 'Delete',
        headerName: 'Delete Job',
        width: 150,
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
        padding: "20px"
      }}
    >
      <Button 
        sx={{
          backgroundColor: "#ffffff",
          mb: "10px"
        }}
      onClick={ handleClick }
      >Refresh Queue</Button>
      <MyDataGrid 
        rows = { rows }
        columns= { columns }
      />
    </Box>
  )
}

export default PrinterQueue