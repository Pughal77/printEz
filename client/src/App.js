import { useEffect, useState } from 'react';

// import styling
import './App.css';

// import components
import logo from './assets/logo.svg';
import Home from './pages/Welcome';
import Login from './pages/Login';
import UserPage from './pages/UserPage';
import TopBanner from './components/TopBanner';

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
    <div>
      <TopBanner/>
      
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
    
  )
}

export default App