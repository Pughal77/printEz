import './App.css';
import TopBanner from './components/TopBanner';
import Welcome from './pages/Welcome';
import { useState } from 'react';

function App() {
  const [loginPage, setLoginPage] = useState(false);
  return (
    <div className="App">
      <TopBanner />
      {!loginPage &&
        <Welcome
          setLogin = {setLoginPage} 
        />}
    </div>
    
  );
}

export default App;
