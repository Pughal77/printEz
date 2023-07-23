import {useState, useEffect} from 'react'

import { Box, Button } from '@mui/material'
import { Alert, AlertTitle } from "@mui/material";
import MyDataGrid from '../dataGrid'
import UploadFile from './uploadFile'
import PrinterSelect from '../printerSelect';


function FileManager({ socket, printer, setPrinter, printerWarning, setPrinterWarning }) {
    const [pdfWarning, setPDFWarning] = useState(false);

    const handlePrint = ({ fileName }) => {
        if (printer != "") {
            socket.emit("printAttempt", {fileName, printer})
        } else {
            setPrinterWarning(true);
        }
        
    }

    const handleDelete = (fileName) => {
        socket
        .emit("deleteFile", fileName)
    }
    const readFiles = () => {
        socket.emit("readFilesReq")
        socket.on("readFilesRes", (data) => {
            if (data !== "ls: cannot access 'printez': No such file or directory") {
                // let count = 0
                const fileNames = data.split("\n").map(
                    (fileName) => {
                        // count++
                        return {
                            // id: count,
                            file: fileName
                        }
                    }
                )
                fileNames.pop()
                const filtFileNames = fileNames.filter((entry) => {return entry !== "base.txt"})
                setRows(filtFileNames)
                
            }
        })
        // console.log(rows)
    }
    useEffect(readFiles, [socket])

    const columns = [
        {
            field: 'file',
            headerName: 'File',
            width: 500
        },
        {
            field: 'printButton',
            headerName: '',
            width: 125,
            renderCell: (params) => {
                const fileName = params.row.file
                return <Button onClick={() => handlePrint({fileName})}>Print</Button>
            }
        },
        {
            field: 'deleteButton',
            headerName: '',
            width: 125,
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
        <Box 
            sx={{
            display:"flex",
            backgroundColor: "primary.main",
            flexDirection: 'row',
            gap: '20px'
            }}
        >
            <UploadFile
                socket={socket}
                setPDFWarning={setPDFWarning}
                readFiles = {readFiles}/>
            <PrinterSelect
                printer={printer}
                setPrinter={setPrinter}
                setPWarning={setPrinterWarning}/>
        </Box>
        <MyDataGrid 
            rows = {rows}
            columns = {columns}
            getRowId = {(row) => {
                return row.file
            }}
        />
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
        {
        printerWarning && 
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

export default FileManager