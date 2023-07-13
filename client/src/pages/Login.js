import { useState, useEffect} from 'react'
import SignIn from '../style/LoginFormLayout'

function Login({ socket, quotas, setQuotas }) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [userType, setUsertype] = useState('')
    const [invalid, setInvalid] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        socket.emit("loginAttempt", 
        { username, password, userType } );
    }
    useEffect(() => {
        socket.on("recievedCredentials", (data) => {
            console.log(`CREDENTIALS SUCCESSFULLY RECIEVED`);
            setQuotas(data);
            setInvalid(false);
            console.log(quotas)
        });
        socket.on("invalidCredentials", () => {
            setInvalid(true);
        });
    }, [socket, quotas, setQuotas])

  return SignIn({
    setUsername,
    setPassword,
    userType,
    setUsertype,
    handleSubmit,
    invalid,
    setInvalid
    })
}

export default Login