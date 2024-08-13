import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function LoginForm() {
  const [username, setUsername] = useState('');
  const[password,setPassword] = useState('');
  const [teamleader,setTeamleader]=useState('');
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password === '1234') {
        try {
            // Save login data to MongoDB
            await axios.post('http://localhost:5000/api/login', {
                username,
                 teamleader,
                password,
            });
    navigate(`/submit/${username}`);
  } catch (error) {
    console.error('Error during login', error);
    alert('An error occurred while saving your data. Please try again.');
}
} else {
alert('Incorrect password. Please try again.');
}
};


  return (
    <div className='wrapper'>
       <h1>Login</h1>      
       <form action=''>
          <input type='text' value={username} onChange={(e) => setUsername(e.target.value)} placeholder='enter userid or email'/>
          <input type='text' value={teamleader} onChange={(e)=>setTeamleader(e.target.value)} placeholder='TL name' />
          <input type='password' value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='enter password'></input>
        <div className='rem-for'>
          <label><input type="checkbox" />remember me</label>
          <a href='#'>forgot password</a></div>
        <button type='submit' onClick={handleSubmit}>Login</button>
        <p className='reg'>dont have an account?<a href='#'>register</a></p>
       </form>
    </div>
  )
}

export default LoginForm