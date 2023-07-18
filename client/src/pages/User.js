import DrawerLeft from '../components/drawer'
import { Box } from '@mui/material'
import PrinterQueue from '../components/printerQueue'

function User({ socket, quotas, user }) {
  return (
    <Box 
    sx={{
      display:"flex",
      gap:'20px'
    }}>
        <DrawerLeft 
          quota={quotas.normalQuota}
          colorQuota={quotas.colorQuota}
          user={user}
        />
        <PrinterQueue 
        socket = {socket}
        />
    </Box>
  )
}

export default User