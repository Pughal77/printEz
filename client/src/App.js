import { useEffect, useState } from 'react';

// import styling
import './App.css';

// import components
import logo from './logo.svg';
import Home from './pages/Home';
import Login from './pages/Login';
import UserPage from './pages/UserPage';
import FileUpload from './components/UserPage/FileUpload';

// initialize socket.io
import { io } from "socket.io-client";
const socket = io.connect("http://localhost:3001");

function App() {
  // loginCredentials is an object containing 3 variables:
  // username, password and usertype
  const [loginCredentials, setLoginCredentials] = useState({});
  const [loginPage, setLoginPage] = useState(false);
  const [successfulLogin, setSuccessfulLogin] = useState(false);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <div className="content">
        {!loginPage &&
          <Home
            setLogin = {setLoginPage} 
          />
        }
        {loginPage && !successfulLogin &&
          <Login 
            socket={socket} 
            loginCredentials={loginCredentials} 
            setLoginCredentials={setLoginCredentials}
            setSuccessfulLogin={setSuccessfulLogin}
          />
        }
        {successfulLogin &&
          <UserPage 
            username={loginCredentials.username} 
            socket={socket}
          />
        }
      </div>
    </div>
  )
}

export default App