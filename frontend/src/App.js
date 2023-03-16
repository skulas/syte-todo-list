import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
// import axios from "axios";
import api from "./api"
import LoginPage from "./LoginPage";
import HomePage from "./HomePage";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = async (email, password) => {
    try {
      console.log(`Logging in with ${email}`)

      const response = await api.post("/auth/login", { email, password });
      const token = response.data.access_token;
      console.log('Login successful')
      localStorage.setItem("token", token);
      setToken(token);
      setIsLoggedIn(true)
    } catch (error) {
      console.error(error);
    }
  };

  const handleRegister = async (email, password) => {
    console.log(`Registering user with email ${email}`)    
    try {
      const response = await api.post("/register", { email, password });
      if (response.status === 200 || response.status === 201) {
        handleLogin(email, password)
      }
    } catch (error) {
      console.log(`Registration for email ${email} failed - error:`)
      console.error(error)
    }
    
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setIsLoggedIn(false)
  };

  return (
    <Router>
      <Routes>
        {isLoggedIn ? <Route path="/" element={<HomePage token={token} onLogout={handleLogout} />} /> :
                       <Route path="/" element={<LoginPage onLogin={handleLogin} onRegister={handleRegister} />} />  }
        {isLoggedIn ? <Route path="/login" element={<HomePage token={token} onLogout={handleLogout} />} /> :
                       <Route path="/login" element={<LoginPage onLogin={handleLogin} onRegister={handleRegister} />} />  }
      </Routes>
    </Router>
  );
}

export default App;
