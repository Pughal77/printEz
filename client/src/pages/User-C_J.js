import DrawerLeft from '../components/drawer'
import { Box } from '@mui/material'
import PrinterQueue from '../components/printerQueue'
import { ThemeProvider } from '@emotion/react';

import { theme } from '../style/style';
import FileManager from '../components/fileManager/fileManager';

import { useState } from 'react';

function User({ socket, quotas, user }) {
  const [selectedPrinter, setSelectedPrinter] = useState("")
  return (
    <ThemeProvider theme={theme}>
      <Box 
        sx={{
          display:"flex",
          height: "100vh",
          gap: "20px",
          backgroundColor: "primary.main",
          flexDirection: 'row'
        }}
      >
        <DrawerLeft 
          quota={quotas.normalQuota}
          colorQuota={quotas.colorQuota}
          user={user}
        />
        <FileManager
          socket = {socket}
        />
        <PrinterQueue 
          socket = {socket}
        />
      </Box>
    </ThemeProvider>
  )
}

export default User