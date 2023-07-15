import { useState } from 'react';
import Welcome from './pages/Welcome';
import Login from './pages/Login';
import User from './pages/User';
import { Routes, Route } from 'react-router-dom';

// initialize socket.io
import { io } from "socket.io-client";
const socket = io.connect("http://localhost:3001");

function App() {
  const [quotas, setQuotas] = useState({});
  const [user, setUser] = useState({})
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
          quotas={quotas}
          user={user}
        />} />
      </Routes>
    </div>
    
  );
}

export default App;
