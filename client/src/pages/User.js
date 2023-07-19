import DrawerLeft from '../components/drawer'
import { Box } from '@mui/material'
import DataGridDemo from '../components/dataGrid'
import { ThemeProvider } from '@emotion/react';
import UploadButton from '../components/uploadButton';

import { theme } from '../style/style';

function User({ quotas, user }) {
  return (
    <ThemeProvider theme={theme}>
      <Box 
        sx={{
          display:"flex",
          height: "100vh",
          gap: "20px",
          backgroundColor: "primary.main",
          display: 'flex',
          flexDirection: 'row'
        }}
      >
        <DrawerLeft 
          quota={quotas.normalQuota}
          colorQuota={quotas.colorQuota}
          user={user}
        />
        <Box
          sx={{
            display:"flex",
            gap:"20px",
            backgroundColor: "primary.main",
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <UploadButton />
          <Box
            sx={{
              display:"flex",
              gap:"20px",
              backgroundColor: "primary.main",
              display: 'flex',
              flexDirection: 'row'
            }}
          >
            <DataGridDemo />
            <DataGridDemo />
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
    
  )
}

export default User