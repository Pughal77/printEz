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
  // quotas contain the available normal quota and color quota of the user
  const [quotas, setQuotas] = useState({});
  // variables to help control page logic
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
          quotas={quotas}
          setQuotas={setQuotas}
        />
      }
      {successfulLogin &&
        <UserPage 
          username={loginCredentials.username} 
          quotas={quotas}
          socket={socket}
        />
      }
    </div>
    
  )
}

export default App