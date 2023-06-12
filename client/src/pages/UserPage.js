import { useState } from "react";
import FileUpload from "../components/FileUpload";
import PrintFile from "../components/PrintFile";

import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import { ThemeProvider } from '@emotion/react';

import { theme } from '../utils/theme';
import Typewriter from "typewriter-effect";

function UserPage({username , socket}) {
    const [isUploaded, setIsUploaded] = useState(false);
    return ( 
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Box
                sx={{
                margin: 0,
                marginTop: '50px',
                width: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                fontSize: 'calc(20px + 2vmin)',
                color: '#024033',
                marginBottom: '0px',
                textAlign: 'center',
                fontWeight: 800,
                }}
            >
                <Typewriter
                    onInit={(typewriter) => {
                        typewriter
                            .typeString(`Welcome, ${username}`)
                            .start();
                    }}
                />
            </Box>
            <FileUpload 
                isUploaded={isUploaded} 
                setIsUploaded={setIsUploaded} 
                socket={socket}
            />
            {isUploaded && 
                < PrintFile
                        socket={socket} 
                />
            }
        </ThemeProvider>
     );
}
 
export default UserPage;