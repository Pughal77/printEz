
import { useState } from 'react';
import TopBanner from './components/TopBanner';
import Welcome from './pages/Welcome';
import Login from './pages/Login';
import { Routes, Route } from 'react-router-dom';

// initialize socket.io
import { io } from "socket.io-client";
const socket = io.connect("http://localhost:3001");

function App() {
  const [quotas, setQuotas] = useState({});
  return (
    <div className="App">
      <TopBanner />
      <Routes>
        <Route path="/" element={<Welcome />}/>
        <Route path="/login" element={<Login 
        socket={socket}
        quotas={quotas}
        setQuotas={setQuotas}/>}/>
      </Routes>
    </div>
    
  );
}

export default App;
