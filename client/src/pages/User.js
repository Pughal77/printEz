import DrawerLeft from '../components/drawer'
import { Box } from '@mui/material'
import DataGridDemo from '../components/dataGrid'

function User({ quotas, user }) {
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
        <DataGridDemo />
        <DataGridDemo />
    </Box>
  )
}

export default User