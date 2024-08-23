import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import { Box, Button,Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function LoginForm() {
  const [username, setUsername] = useState('');
  const[password,setPassword] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password === '1234') {
        try {
            // Save login data to MongoDB
            await axios.post('http://localhost:5000/api/login', {
                username,
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
    <Box 
      bgcolor=' #BFD4BF' 
      height="100vh" // Full height of the viewport
      display="flex" 
      alignItems="center" 
      justifyContent="center"
    >
      <Box
      bgcolor='#DBE9F4' height={250} width={250} display="flex" alignItems="center" justifyContent="center" gap={1} p={3} sx={{ border: '2px solid grey' }}
      >
    <Container maxWidth="sm">
       <h1>Login</h1>      
       <form>
      <div>
         <TextField id="standard-basic" label="username" variant="standard"   value={username} onChange={(e) => setUsername(e.target.value)} />
         </div>
         <div>
          <TextField label="Password" type="password" variant="standard" margin="normal"  value={password} onChange={(e)=>setPassword(e.target.value)} />
          </div>
          
        <Button variant='contained' color='primary' onClick={handleSubmit}>Login</Button>
      
       </form>
    </Container>
    </Box>
    </Box>
  )
}

export default LoginForm