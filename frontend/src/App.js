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
      console.log(api.defaults)
      const response = await api.post("/auth/login", { email, password });
      const token = response.data.access_token;
      console.log(`Login response.data: ${JSON.stringify(response.data)}`)
      console.log(`Login response.data.access_token: ${JSON.stringify(response.data.access_token)}`)
      console.log(`Login token: ${token}`)
      console.log('Login successful')
      localStorage.setItem("token", token);
      setToken(token);
      setIsLoggedIn(true)
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setIsLoggedIn(false)
  };

  return (
    <Router>
      <Routes>
        {isLoggedIn ? <Route path="/" element={<HomePage token={token} onLogout={handleLogout} />} /> :
                       <Route path="/" element={<LoginPage onLogin={handleLogin} />} />  }
        {isLoggedIn ? <Route path="/login" element={<HomePage token={token} onLogout={handleLogout} />} /> :
                       <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />  }
      </Routes>
    </Router>
  );
}

export default App;
