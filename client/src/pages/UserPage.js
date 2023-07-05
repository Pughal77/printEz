import { useState } from "react";
import FileUpload from "../components/FileUpload";
import PrintFile from "../components/PrintFile";
import JobQ from "../components/JobQ";

import {
    CssBaseline, 
    Box,
    Typography
} from '@mui/material';
import { ThemeProvider } from '@emotion/react';

import { theme } from '../utils/theme';
import Typewriter from "typewriter-effect";

function UserPage({username, quotas, socket}) {
    const [isUploaded, setIsUploaded] = useState(false);
    const [jobCreated, setjobCreated] = useState(false);
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
            <Box
                sx={{
                margin: 0,
                marginTop: '0px',
                width: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                fontSize: 'calc(5px + 2vmin)',
                color: '#024033',
                marginBottom: '0px',
                textAlign: 'center',
                fontWeight: 800,
                }}
            >
                <Typography variant="h4" fontWeight= "800">
                    Normal Quota: {quotas.normalQuota}
                </Typography>
                <Typography variant="h4" fontWeight= "800">
                    Color Quota: {quotas.colorQuota}
                </Typography>
            </Box>
            <FileUpload 
                isUploaded={isUploaded} 
                setIsUploaded={setIsUploaded} 
                socket={socket}
            />
            {isUploaded && 
            <div>
                < PrintFile
                    socket={socket} 
                />
                < JobQ 
                    socket={socket}
                />
            </div>
            }
        </ThemeProvider>
     );
}
 
export default UserPage;