import React, { useState } from 'react'
import './Login.css';


function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEmail('');
    setPassword('');
    console.log(`Username :${email}\n Password ${password}`)
  };

  return (
    <div>
       <div className="formContainer">
        <form method='post' className="contactForm" onSubmit={handleSubmit}>
            <h1>Login.</h1>
            <input className="formInput" type="email" name="email" id="email" placeholder='e-mail@email.com' 
            onChange={(e) => setEmail(e.target.value)} value={email} required />
            <input className="formInput" type="password" name="password" id="password" placeholder='password'
            onChange={(e) => setPassword(e.target.value)} value={password} required  />  
            <button className="formButton">Log In</button>
            <button className="formButton">Register</button>
        </form>
    </div>
    </div>
  )
}

export default Login
