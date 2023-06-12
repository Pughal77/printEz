import { useState, useEffect } from "react";

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { ThemeProvider } from '@emotion/react';

import { theme } from '../utils/theme'

function FileUpload({ isUploaded, setIsUploaded, socket }) {
    // variable to store selected file
    const [selectedFile, setSelectedFile] = useState();

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    }

    const handleUpload = async(e) => {
        e.preventDefault();
        
        console.log(selectedFile);
        
        socket.emit("pdfTransfer", selectedFile, (status) => {
            console.log(status);
        });
    }

    // acts as a listner for socket events
    useEffect(()=> {
        socket.on("missingCredentials", () => {
            // force the page to reload, credentials misssing
            window.location.reload(false);
        })
        socket.on("fileUploaded", () => {
            console.log("FILE UPLOADED");
            setIsUploaded(true);
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
            </Container>
        </ThemeProvider>
     );
}
 
export default FileUpload;