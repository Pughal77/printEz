import { useState } from "react";
import FileUpload from "../components/FileUpload";
import PrintFile from "../components/PrintFile";
import JobQ from "../components/JobQ";

import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import { ThemeProvider } from '@emotion/react';

import { theme } from '../styles/theme';
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
                <Typewriter
                    onInit={(typewriter) => {
                        typewriter
                            .changeDelay(100)
                            .typeString(`normal quota: ${quotas.normalQuota}`)
                            .start();
                    }}
                />
                <Typewriter
                    onInit={(typewriter) => {
                        typewriter
                            .changeDelay(100)
                            .typeString(`color quota: ${quotas.colorQuota}`)
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