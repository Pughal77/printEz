import { useState, useEffect } from 'react'

import { Alert, AlertTitle } from "@mui/material";
import MyDataGrid from './dataGrid'
import read from '../utils/readJobs'
import { Box, Button } from '@mui/material'
import MyButton from '../style/MyButton'

function PrinterQueue({ socket, printer }) {
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
      headerName: '',
      width: 100,
      renderCell:(params) => {
        // use params.row to access properties of values in that cell
        const handleDelete = (id) => {
          if (printer != "") {
            socket.emit("delReq", {id, printer})
            socket.emit("readJobQReq", printer)
          }
        }
        return <Button onClick={() => handleDelete(params.row.id)}>Delete</Button>
      }
    }
  ]

  const [rows,setRows] = useState([]);
  const [printerWarning, setPrinterWarning] = useState(false);

  useEffect(() => {
    if (printer != "") {
      // jobQ no longer working properly
      // socket.emit("readJobQReq", printer)
      // socket.on("readJobQRes", (data) => {
      //     read(data, setRows)
      // })
    }
  }, [socket, printer]);

  const handleClick = (e) => {
    if (printer != "") {
      // jobQ no longer working properly
      // socket.emit("readJobQReq", printer)
    } else {
      setPrinterWarning(true);
    }
  };
  
  return (
    <Box
      sx={{
        backgroundColor: "primary.main",
        minWidth: "35%"
      }}
    >
      <MyButton
        addStyle={{mb: "10px"}}
        text="Refresh Queue"
        handleClick={handleClick}
      />
      <MyDataGrid 
        rows = {rows}
        columns= {columns}
        getRowId= {(row) => {
          return row.id
        }}
      />
      {printerWarning && 
        <Alert 
          severity="error"
          onClose={() => {setPrinterWarning(false)}}
        >
          <AlertTitle>ERROR</AlertTitle>
          <strong>please choose a printer</strong>
        </Alert>
      }
    </Box>
  )
}

export default PrinterQueue