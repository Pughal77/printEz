import { useState, useEffect } from 'react';
import Welcome from './pages/Welcome';
import Login from './pages/Login';
import User from './pages/User';
import { Routes, Route } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

// initialize socket.io
import { io } from "socket.io-client";
const socket = io.connect("http://localhost:3001");

function App() {
  const [quotas, setQuotas] = useState({normalQuota: "", colorQuota: ""});
  const [user, setUser] = useState("")
  const navigate = useNavigate();
  useEffect(() => {
    socket.on("newConnection", () => {
      console.log("new connection established")
      navigate("/");
    });
  }, [navigate])
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Welcome />}/>
        <Route path="/login" element={<Login 
          socket={socket}
          quotas={quotas}
          setQuotas={setQuotas}
          setUser={setUser}
        />}/>
        <Route path="/user" element={<User
          socket = {socket}
          setQuotas={setQuotas}
          quotas={quotas}
          user={user}
        />} />
      </Routes>
    </div>
    
  );
}

export default App;
