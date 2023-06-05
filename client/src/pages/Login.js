import { useState, useEffect } from "react"

function Login({ socket, loginCredentials, setLoginCredentials, 
    setSuccessfulLogin}) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [usertype, setUsertype] = useState('student')
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

    useEffect(() => {
        if(isSubmitted) {
            console.log("sending credentials to the server");
            socket.emit("loginAttempt", loginCredentials);
            setIsSubmitted(false);
        } 
    }, [loginCredentials])

    return (
        <div className="login">
            <h2>LOG IN</h2>
            <form onSubmit={handleSubmit}>
                <label>Username</label>
                <input
                    className="input-username"
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="enter your SoC login ID"
                />
                <label>Password</label>
                <input
                    className="input-password"
                    type={isShown ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="enter your Password"
                />
                <label style={{
                    display: 'flex',
                    fontSize: 'calc(0px + 2vmin)'
                }}>Show password?
                    <input
                        className="password-checkbox"
                        type="checkbox"
                        checked={isShown}
                        onChange={togglePassword}
                        style={{
                            width: '25px',
                            padding: '6px 10px',
                            margin: '5px 0',
                            verticalAlign: 'bottom',
                            position: 'relative'
                        }}
                    />
                </label>
                <label>Student or Staff</label>
                <select
                    className="input-usertype"
                    value={usertype}
                    required
                    onChange={(e) => setUsertype(e.target.value)}
                >
                    <option value="student">student</option>
                    <option value="staff">staff</option>
                </select>
                <button>submit</button>
            </form>
            {invalid && 
                <p>Invalid Username/Password, Try Again</p>
            }
        </div>
    )
}

export default Login