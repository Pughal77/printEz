import {useState} from 'react'

import { Box, Button, Input } from '@mui/material'
import { Alert, AlertTitle } from "@mui/material";
import MyDataGrid from './dataGrid'
import MyButton from '../style/MyButton'
import UploadFile from './uploadFile'


function FileManager({ socket }) {
    const [pdfWarning, setPDFWarning] = useState(false);
    

    const columns = [
        {
            field: 'file',
            headerName: 'File',
            width: 150
        },
        {
            field: 'printButton',
            headerName: 'Print',
            width: 150,
            renderCell: (params) => {
                return <Button>Print</Button>
            }
        }
    ]

   
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
        {pdfWarning && 
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