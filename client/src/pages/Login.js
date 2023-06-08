import { useState, useEffect } from "react"

import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import IconButton from '@mui/material/IconButton';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { ThemeProvider } from '@emotion/react';

import { theme } from '../utils/theme'

function Login({ socket, loginCredentials, setLoginCredentials, 
    setSuccessfulLogin}) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [usertype, setUsertype] = useState('')
    const [isShown, setIsSHown] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [invalid, setInvalid] = useState(false);
    
    const handleSubmit = async(e) => {
        e.preventDefault();
        setLoginCredentials( { username, password, usertype } );
        setIsSubmitted(true);
    }

    const togglePassword = () => {
        setIsSHown((isShown) => !isShown);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    // reacts to events recieved from socket
    useEffect(()=> {
        socket.on("recievedCredentials", (data) => {
            console.log(`CREDENTIALS FOR ${data.username} RECIEVED`);
            setSuccessfulLogin(true);
            setInvalid(false);
        });
        socket.on("invalidCredentials", () => {
            setInvalid(true);
        });
    }, [socket]) 

    // 
    useEffect(() => {
        if(isSubmitted) {
            console.log("sending credentials to the server");
            socket.emit("loginAttempt", loginCredentials);
            setIsSubmitted(false);
        } 
    }, [loginCredentials])

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <Box
                    sx={{
                        marginTop: 3,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'primary.light'}}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography variant="h5" sx={{
                        fontWeight: 800,
                        color: 'primary.main'
                    }}>
                        LOG IN
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Username"
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
                                    onMouseDown={handleMouseDownPassword}
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
                                <MenuItem value={"student"}>student</MenuItem>
                                <MenuItem value={"staff"}>Staff</MenuItem>
                            </Select>
                        </FormControl>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ 
                                mt: 3, 
                                mb: 2,
                                fontWeight: 700
                            }}
                        >
                            submit
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
                </Box>
            </Container>
        </ThemeProvider>
    );
}

export default Login