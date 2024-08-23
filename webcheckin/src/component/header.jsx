import { AppBar, Button, Toolbar, Typography } from '@mui/material';
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom';


function Header() {
    const {username}= useParams('');
    const navigate =useNavigate ('');
    const employee=()=>{
        navigate ('/employee');
      }
      const home=()=>{
        navigate (`/submit/${username}`);
      }

  return (
    <div>
      <AppBar position="static">
    <Toolbar>
      <Typography variant="h6">
        Efforttracker
      </Typography>
      <Button color="inherit" onClick={home}>Home</Button>
      <Button color="inherit" onClick={employee}>Employees</Button>
      <Button color="inherit">About</Button>
      <Button color="inherit">Contact</Button>
    </Toolbar>
  </AppBar>
    </div>
  )
}

export default Header
