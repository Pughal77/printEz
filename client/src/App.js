import { useEffect, useState } from 'react'

// import styling
import './App.css';

// import components
import logo from './logo.svg'
import Home from './components/Home'
import Login from './components/Login'
import UserPage from './components/UserPage'
import FileUpload from './components/FileUpload'

// initialize socket.io
import { io } from "socket.io-client"
const socket = io.connect("http://localhost:3001")

function App() {
  // loginCredentials is an object containing 3 variables:
  // username, password and usertype
  const [loginCredentials, setLoginCredentials] = useState({})

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <div className="content">
        <Home/>
        <Login socket = {socket} loginCredentials = {loginCredentials} setLoginCredentials={setLoginCredentials}/>
        <UserPage username = {loginCredentials.username}/>
        <FileUpload socket = {socket} />
      </div>
    </div>
  )
}

export default App