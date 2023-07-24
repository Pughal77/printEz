import { useState } from 'react';
import {
  Avatar,
  CssBaseline,
  Box,
  TextField,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Button,
  Typography,
  Container,
  OutlinedInput,
  InputAdornment,
  Alert,
  AlertTitle,
  IconButton
} from '@mui/material';
import {
  Visibility,
  VisibilityOff
} from '@mui/icons-material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { theme } from "./style";
import { ThemeProvider } from '@mui/material/styles';

export default function SignIn({ 
  setUsername,
  setPassword,
  usertype,
  setUsertype, 
  handleSubmit,
  invalid,
  setInvalid,
  unixWarning,
  setUnixWarning}) {

    const [isShown, setIsSHown] = useState(false);
    const togglePassword = () => {
      setIsSHown((isShown) => !isShown);
    };

    return (
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in to your mySOC account
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="username"
                name="username"
                autoComplete="emailusername"
                autoFocus
                onChange={e => setUsername(e.target.value)}
              />
<FormControl required fullWidth margin="normal" variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                type={isShown ? 'text' : 'password'}
                                onChange={e => setPassword(e.target.value)}
                                endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={togglePassword}
                                    onMouseDown={e => e.preventDefault()}
                                    edge="end"
                                    >
                                    {isShown ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                                }
                                label="Password"
                            />
                        </FormControl>
                        <FormControl required fullWidth margin="normal">
                            <InputLabel id="usertype-label">Student or Staff</InputLabel>
                            <Select
                                labelId="usertype-label"
                                id="usertype-select"
                                value={usertype}
                                label="Student or Staff *"
                                onChange={(e) => setUsertype(e.target.value)}
                            >
                                <MenuItem value={"student"}>Student</MenuItem>
                                <MenuItem value={"staff"}>Staff</MenuItem>
                            </Select>
                        </FormControl>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
            </Box>
            {invalid && 
              <Alert 
                severity="error"
                onClose={() => {setInvalid(false)}}
              >
                <AlertTitle>ERROR</AlertTitle>
                invalid username / password / usertype <br/>
                <strong>please try again</strong>
              </Alert>
            }
            {unixWarning &&
              <Alert 
              severity="error"
              onClose={() => {setUnixWarning(false)}}
            >
              <AlertTitle>ERROR</AlertTitle>
              SOC UNIX SERVER COMMANDS NOT FUNCTIONING <br/>
              <strong>admins have been notified of the issue</strong>
            </Alert>
            }
          </Box>
        </Container>
      </ThemeProvider>
    )
}