import React from 'react'
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const navigate = useNavigate();
  const handleSubmit = () => {
    navigate('/submit');
  };

  return (
    <div className='wrapper'>
       <h1>Login</h1>      
       <form action=''>
          <input type='text' placeholder='enter userid or email'/><br /><br />
          <input type='password' placeholder='enter password'></input>
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