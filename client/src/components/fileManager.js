import {useState, useEffect} from 'react'

import { Box, Button, Input } from '@mui/material'
import { Alert, AlertTitle } from "@mui/material";
import MyDataGrid from './dataGrid'
import MyButton from '../style/MyButton'
import UploadFile from './uploadFile'


function FileManager({ socket }) {
    const [pdfWarning, setPDFWarning] = useState(false);
    
    const handlePrint = ({ fileName }) => {
        socket.emit("printAttempt", fileName)
    }

    const handleDelete = (fileName) => {
        socket.emit("deleteFile", fileName)
        socket.emit("readFilesReq")
    }

    useEffect(() => {
        socket.emit("readFilesReq")
        socket.on("readFilesRes", (data) => {
            if (data !== "ls: cannot access 'printez': No such file or directory") {
                let count = 0
                const fileNames = data.split("\n").map(
                    (fileName) => {
                        count++
                        return {
                            id: count,
                            file: fileName
                        }
                    }
                )
                fileNames.pop()
                setRows(fileNames)
                
            }
        })
      }, [socket])

    const columns = [
        {
            field: 'file',
            headerName: 'File',
            width: 300
        },
        {
            field: 'printButton',
            headerName: 'Print',
            width: 150,
            renderCell: (params) => {
                const fileName = params.row.file
                return <Button onClick={() => handlePrint({fileName})}>Print</Button>
            }
        },
        {
            field: 'deleteButton',
            headerName: 'Delete',
            width: 150,
            renderCell: (params) => {
                const fileName = params.row.file
                return <Button onClick={() => handleDelete(fileName)}>Delete</Button>
            }
        }
    ]

    const [rows,setRows] = useState([])

  return (
    <Box
        sx={{
        display:"flex",
        backgroundColor: "primary.main",
        flexDirection: 'column',
        minWidth: '40%'
        }}
    >
        <UploadFile socket={socket} setPDFWarning={setPDFWarning}/>
        <MyDataGrid 
            rows={rows}
            columns={columns}/>
        {
        pdfWarning && 
                <Alert 
                    severity="error"
                    onClose={() => {setPDFWarning(false)}}
                >
                    <AlertTitle>ERROR</AlertTitle>
                    <strong>please upload a PDF file</strong>
                </Alert>
            }
    </Box>
  )
}

export default FileManager