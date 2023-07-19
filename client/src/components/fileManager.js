import {useState} from 'react'
import { Box, Button, Input } from '@mui/material'
import MyDataGrid from './dataGrid'
import MyButton from '../style/MyButton'

function FileManager({ socket }) {
    // doesnt work yet
    const [selectedFile, setSelectedFile] = useState();
    const [isPDF, setIsPDF] = useState(false);
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

    const handleFileChange = (e) => {
        if (e.target.files[0] != null) {
            const currFile = e.target.files[0];
            if (currFile.type === "application/pdf") {
                setIsPDF(true);
                setSelectedFile(currFile);
            }
        }
    }

    const handleUpload = async(e) => {
        e.preventDefault();
        if (isPDF) {
            console.log(selectedFile);
        
            socket.emit("pdfTransfer", selectedFile, (status) => {
                console.log(status);
            });
        } else {
            setPDFWarning(true);
        }
    }
  return (
    <Box
        sx={{
        display:"flex",
        backgroundColor: "primary.main",
        flexDirection: 'column'
        }}
    >

        <Input 
            type="file"
            onChange={() => {}}
            accept="pdf/*"
            sx={{
                borderRadius: '5px',
                color: '#ffffff',
                display: 'block',
                fontSize: 'calc(1px + 2vmin)',
                mb: '10px'
            }}
        />
        {/* <MyDataGrid 
        /> */}
    </Box>
  )
}

export default FileManager