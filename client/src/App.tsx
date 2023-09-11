import React, { useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home'

interface User {
  username: string;
  password: string;
}

const LoginPage: React.FC<{ onLogin: (loginUser: User) => void }> = ({ onLogin }) => {
  const [loginUser, setLoginUser] = useState<User>({
    username: '',
    password: '',
  });

  const [registerUser, setRegisterUser] = useState<User>({
    username: '',
    password: '',
  });

  const handleLoginInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoginUser({ ...loginUser, [event.target.name]: event.target.value });
  };

  const handleRegisterInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterUser({ ...registerUser, [event.target.name]: event.target.value });
  };

  const handleLogin = () => {
    axios.post(`${process.env.REACT_APP_API_URL}${process.env.REACT_APP_LOGIN_ENDPOINT}`, loginUser)
      .then(response => {
        console.log(response.data);
        // Handle successful login
        sessionStorage.setItem('isLoggedIn', 'true'); // Store login status in storage        
        onLogin(loginUser); // Update isLoggedIn state
        sessionStorage.setItem('username', loginUser.username); // Store username in session storage
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleRegister = () => {
    axios.post(`${process.env.REACT_APP_API_URL}${process.env.REACT_APP_REGISTER_ENDPOINT}`, registerUser)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div className="bg-slate-400 flex justify-center items-center h-screen w-screen">
      <div className="bg-slate-100 p-8 shadow-md rounded-md">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <input
          type="text"
          name="username"
          value={loginUser.username}
          onChange={handleLoginInputChange}
          placeholder="Username"
          className="border border-gray-300 rounded-md px-3 py-2 mb-4 w-full"
        />
        <input
          type="password"
          name="password"
          value={loginUser.password}
          onChange={handleLoginInputChange}
          placeholder="Password"
          className="border border-gray-300 rounded-md px-3 py-2 mb-4 w-full"
        />
        <button
          onClick={handleLogin}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Login
        </button>
      </div>
      <div className="bg-green-100 p-8 shadow-md rounded-md ml-4">
        <h2 className="text-2xl font-bold mb-4">Register</h2>
        <input
          type="text"
          name="username"
          value={registerUser.username}
          onChange={handleRegisterInputChange}
          placeholder="Username"
          className="border border-gray-300 rounded-md px-3 py-2 mb-4 w-full"
        />
        <input
          type="password"
          name="password"
          value={registerUser.password}
          onChange={handleRegisterInputChange}
          placeholder="Password"
          className="border border-gray-300 rounded-md px-3 py-2 mb-4 w-full"
        />
        <button
          onClick={handleRegister}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Register
        </button>
      </div>


    </div>
  );
}; 
const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(sessionStorage.getItem('isLoggedIn') === 'true');  
  const [username, setUsername] = useState(sessionStorage.getItem('username') || '');
  

  const handleLogin = (loginUser: User) => {
    setIsLoggedIn(true);
    setUsername(loginUser.username);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-200">
      <Router>
        <Routes>
          <Route
            path="/login"
            element={isLoggedIn ? <Navigate to="/" replace /> : <LoginPage onLogin={handleLogin} />}
          />
          <Route
            path="/"
            element={
              isLoggedIn ? (
                <Home username={username} setIsLoggedIn={setIsLoggedIn}/>
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
        </Routes>
      </Router>
    </div>
  );
};
export default App;

