import { useState, useEffect} from 'react'
import SignIn from '../style/LoginFormLayout'
import { useNavigate } from 'react-router-dom'
import TopBanner from '../components/TopBanner'

function Login({ socket, quotas, setQuotas, setUser }) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [usertype, setUsertype] = useState('')
    const [invalid, setInvalid] = useState(false);
    const [unixWarning, setUnixWarning] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        socket.emit("loginAttempt", 
        { username, password, usertype } );
        setUser(username);
    }
    useEffect(() => {
        socket.on("recievedCredentials", (data) => {
            console.log(`CREDENTIALS SUCCESSFULLY RECIEVED`);
            setQuotas(data);
            setInvalid(false);
            navigate("/user");
        });
        
        socket.on("invalidCredentials", () => {
            setInvalid(true);
        });

        socket.on("unixDown", () => {
            setUnixWarning(true);
        });
    }, [socket, navigate, setQuotas])

  return (
    <div>
        <TopBanner />
        < SignIn
            setUsername = {setUsername}
            setPassword = {setPassword}
            usertype = {usertype}
            setUsertype = {setUsertype}
            handleSubmit = {handleSubmit}
            invalid = {invalid}
            setInvalid = {setInvalid}
            unixWarning = {unixWarning}
            setUnixWarning = {setUnixWarning}
        />
    </div>
  )
}

export default Login