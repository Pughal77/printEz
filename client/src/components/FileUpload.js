import { useState, useEffect } from "react";

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { ThemeProvider } from '@emotion/react';

import { theme } from '../styles/theme'

function FileUpload({ isUploaded, setIsUploaded, socket }) {
    // variable to store selected file
    const [selectedFile, setSelectedFile] = useState();
    const [isPDF, setIsPDF] = useState(false);
    const [pdfWarning, setPDFWarning] = useState(false);

    const handleFileChange = (e) => {
        if (e.target.files[0] != null) {
            const currFile = e.target.files[0];
            if (currFile.type == "application/pdf") {
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

    // acts as a listner for socket events
    useEffect(()=> {
        socket.on("missingCredentials", () => {
            // force the page to reload, credentials misssing
            window.location.reload(false);
            setPDFWarning(false);
            setIsPDF(false);
        })
        socket.on("fileUploaded", () => {
            console.log("FILE UPLOADED");
            setIsUploaded(true);
            setIsPDF(false);
        })
    }, [socket]) 

    return ( 
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <Box
                    sx={{
                        margin: 0,
                        marginTop: '5px',
                        width: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        fontSize: 'calc(20px + 2vmin)',
                        color: '#024033',
                        marginBottom: '50px',
                        textAlign: 'center',
                        fontWeight: 800,
                        }}
                    >

                    <h5>UPLOAD YOUR PDF</h5>
                    <form onSubmit={handleUpload}>
                        <input 
                            type="file"
                            onChange={handleFileChange}
                            required="required"
                            style={{
                                borderRadius: '5px',
                                backgroundColor: '#024033',
                                color: '#ffffff',
                                padding: '5px 10px',
                                display: 'block',
                                fontSize: 'calc(1px + 2vmin)'
                            }}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ 
                                mt: 3, 
                                mb: 2,
                                fontWeight: 700
                            }}
                        >
                            upload
                        </Button>
                    </form>
                </Box>
                {pdfWarning && 
                    <Alert 
                        severity="error"
                        onClose={() => {setPDFWarning(false)}}
                    >
                        <AlertTitle>ERROR</AlertTitle>
                        <strong>please upload a PDF file</strong>
                    </Alert>
                }
            </Container>
        </ThemeProvider>
     );
}
 
export default FileUpload;