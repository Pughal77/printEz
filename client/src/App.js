import { useEffect, useState } from 'react'
import './App.css';
import logo from './logo.svg'
import Home from './components/Home'
import Login from './components/Login'
import UserPage from './components/UserPage'
import FileUpload from './components/FileUpload'

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
        <Login loginCredentials = {loginCredentials} setLoginCredentials={setLoginCredentials}/>
        <UserPage username = {loginCredentials.username}/>
        <FileUpload/>
      </div>
    </div>
  )
}

export default App