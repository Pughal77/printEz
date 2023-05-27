import { useState } from "react"

function Login({ loginCredentials, setLoginCredentials, loginEvent}) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [usertype, setUsertype] = useState('student')
    const [isShown, setIsSHown] = useState(false);
    
    const handleSubmit = (e) => {
        e.preventDefault()
        const credentials = { username, password, usertype }
        setLoginCredentials( credentials )
        console.log(credentials)
        loginEvent(credentials)
    }

    const togglePassword = () => {
        setIsSHown((isShown) => !isShown);
    };

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
                    display: 'flex'
                }}>Show password?
                    <input
                        className="password-checkbox"
                        type="checkbox"
                        checked={isShown}
                        onChange={togglePassword}
                        style={{
                            width: '25px',
                            padding: '6px 10px',
                            margin: '10px 0',
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
        </div>
    )
}

export default Login