import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
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
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
              backgroundColor: 'primary.main' 
            }
          }}
          variant="permanent"
          anchor="left"
        >
          <img src={logo} style={{height: '10vmin'}} alt=""/>
          <Divider />
            <Card sx={{ minWidth: 240, backgroundColor: "#aaacaf", borderRadius:"20px"  }}>
                <CardContent>
                  <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    User: { user }
                  </Typography>
                  <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Quota: { quota }
                  </Typography>
                  <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Color Quota: { colorQuota }
                  </Typography>
                </CardContent>
            </Card>
          <Divider />
            <Card sx={{ minWidth: 240, backgroundColor: "#aaacaf", borderRadius:"20px"  }}>
              <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                  Want to print everything in one shot? How about merging your pdfs!
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" href='https://www.ilovepdf.com/merge_pdf'>Merge pdf website</Button>
              </CardActions>
            </Card>
          <Divider />
          <Card sx={{ minWidth: 240, backgroundColor: "#aaacaf", borderRadius:"20px" }}>
              <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                  Our website only prints pdf files. Convert them to pdf here!
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" href='https://www.pdffiller.com'>Convert to pdf</Button>
              </CardActions>
            </Card>
        </Drawer>
      </Box>
    </ThemeProvider>
  );
}