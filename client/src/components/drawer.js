import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { ThemeProvider } from '@emotion/react';

import logo from '../assets/logo.svg';
import { theme } from '../style/style';

const drawerWidth = 240;

export default function DrawerLeft({ quota, colorQuota, user}) {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Drawer
          sx={{
            width: drawerWidth,
            alignItems: 'center',
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
              backgroundColor: 'background' 
            }
          }}
          variant="permanent"
          anchor="left"
        >
          <img src={logo} style={{height: '13vmin'}} alt=""/>

          <Box sx={{
            marginTop: '2vmin',
            alignItems: 'center',
            justifyContent: 'center',
            display: 'flex',
            direction: 'row',
            textTransform: 'uppercase'
          }}> 
            <Typography sx={{ fontSize: 25, fontWeight: 'bold' }}>
              {user}
            </Typography>
          </Box>
          <Card sx={{ margin: '1vmin', Width: '240', backgroundColor: 'primary.main', borderRadius:"10px" }}>
            <CardContent>
              <Typography sx={{ marginTop: '-1vmin', fontSize: 14, fontWeight: 'bold'}} color='#ffffff' gutterBottom>
                Quota: { quota }
              </Typography>
              <Typography sx={{ marginBottom: '-2vmin', fontSize: 14, fontWeight: 'bold' }} color='#ffffff' gutterBottom>
                Color Quota: { colorQuota }
              </Typography>
            </CardContent>
          </Card>
          <Box sx={{
            marginTop: '40vmin',
            alignItems: 'center',
            justifyContent: 'center',
            display: 'flex',
            direction: 'row',
            textTransform: 'uppercase',
          }}> 
            <Typography sx={{ fontSize: 16, fontWeight: 'bold', marginTop: '10vmin' }}>
              useful websites
            </Typography>
          </Box>
          <Button variant='contained' size="small" href='https://www.ilovepdf.com/merge_pdf' target='_blank'
          sx={{
            margin: '1vmin',
            borderRadius: '20px'
          }}>
            Merge pdf website
          </Button>
          <Button variant='contained' size="small" href='https://www.pdffiller.com' target='_blank'
          sx={{
            marginLeft: '1vmin',
            marginRight: '1vmin',
            borderRadius: '20px'
          }}>
            Convert to pdf
          </Button>
        </Drawer>
      </Box>
    </ThemeProvider>
  );
}