import { useEffect, useState } from 'react'
import './App.css';
import logo from './logo.svg'
import Home from './components/Home'
import Login from './components/Login'
import UserPage from './components/UserPage'
import FileUpload from './components/FileUpload'
import io from "socket.io-client"

const socket = io.connect("http://localhost:5000")


function App() {
  // loginCredentials is an object containing 3 variables:
  // username, password and usertype
  const [loginCredentials, setLoginCredentials] = useState({})
  const [successfulLogin, setSuccessfulLogin] = useState(false)

  // emitted events
  const loginEvent = (data) => {
    socket.emit("login", data)
  }
  // lsitening for events
  useEffect(() => {
    socket.on("successfulLogin", (data) => {setSuccessfulLogin(true)})
  }, [socket])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <div className="content">
        <Home/>
        <Login 
          loginCredentials = {loginCredentials} 
          setLoginCredentials = {setLoginCredentials}
          loginEvent = {loginEvent}/>
      </div>
      {
        successfulLogin && 
        <div className='successfulLogin'>
          <UserPage username = {loginCredentials.username}/>
          <FileUpload/>
        </div>
      }
      
    </div>
  )
}

export default App