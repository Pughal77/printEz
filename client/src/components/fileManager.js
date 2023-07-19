import useState from 'react'
import { Box, Button } from '@mui/material'
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

    // const handleUpload = async(e) => {
    //     e.preventDefault();
    //     if (isPDF) {
    //         console.log(selectedFile);
        
    //         socket.emit("pdfTransfer", selectedFile, (status) => {
    //             console.log(status);
    //         });
    //     } else {
    //         setPDFWarning(true);
    //     }
    // }
  return (
    <Box
        sx={{
        display:"flex",
        gap:"20px",
        backgroundColor: "primary.main",
        flexDirection: 'column'
        }}
    >

        <MyButton
            text="Upload pdf"
            handleClick={() => {}}
        />
        <MyDataGrid 
        />
    </Box>
  )
}

export default FileManager