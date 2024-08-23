import { AppBar, Box, Button, Container, Grid, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import Header from './header';


function Home() {
  const {username} = useParams ('');
  const navigate = useNavigate();
  const hansub=()=>{
    navigate (`/submit/${username}/getstart`);
  }
  return (
    <Box
    sx={{
      bgcolor:'#BFD4BF' ,height: '100vh', display: 'flex',flexDirection: 'column',
    }}
  >
    <div >
         <Header />
      <div>
      <Container 
        maxWidth="sm" 
        sx={{mt: 5,p: 3,backgroundColor:'#DBE9F4' , borderRadius: 2, boxShadow: 3}}>
          <Typography variant="h4" align="center" color="textPrimary" gutterBottom>
            Welcome {username} 
          </Typography>
          <Typography variant="h5" align="center" color="textSecondary" paragraph>
          Effort tracker Solutions has invited you to update your work. this will help us to track your working and help you to enhance your work
          </Typography>
          <div>
            <Grid container spacing={2} justifyContent="center">
              <Grid item>
                <Button variant="contained" color="primary" id='submit' onClick ={hansub}>
                  Get Started
                </Button>
              </Grid>
              <Grid item>
                <Button variant="outlined" color="primary">
                  Learn More
                </Button>
              </Grid>
            </Grid>
          </div>
        </Container>
      </div>
      </div>
      </Box>
  )
}

export default Home

