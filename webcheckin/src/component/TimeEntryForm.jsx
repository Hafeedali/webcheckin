import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { AppBar, TextField, Toolbar } from '@mui/material';
import { FormControl, InputLabel, Select, Box, MenuItem, Grid, Typography, Button, Container } from '@mui/material';
import Header from './header';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

function TimeEntryForm() {
  const { username } = useParams();
  const navigate = useNavigate();
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('16:30');
  const [timeDifference, setTimeDifference] = useState('');
  const [project, setProject] = useState('ProjectA');

  useEffect(() => {
    if (startTime && endTime) {
      const start = new Date(`1970-01-01T${startTime}:00`);
      const end = new Date(`1970-01-01T${endTime}:00`);

      const diff = Math.abs(end - start);
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

      const differenceText = `${hours}.${minutes}`;
      setTimeDifference(differenceText);

      if (hours < 5) {
        alert('CALCULATED AS HALFDAY');
      }
    }
  }, [startTime, endTime]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const entry = {
      username,
      date,
      startTime,
      endTime,
      timeDifference,
      project,
    };

    try {
      const response = await axios.post('http://localhost:5000/api/time-entry', entry);
      alert('Data saved successfully!');
      navigate('/submit/ggg/getstart/SubmittedData', { state: { lastEntry: response.data } });
    } catch (error) {
      console.error('Error saving data:', error);
      alert('Failed to save data');
    }
  };

  return (
    <div>
      <Box sx={{bgcolor: '#BFD4BF', minHeight: '100vh'}}>
        <Header /><br />
      <form onSubmit={handleSubmit}>
        <Container maxWidth="sm">
          <Box sx={{ bgcolor: '#DBE9F4', height: '{250}', p: 15, borderRadius: 2, boxShadow: 3 }}>
            <Typography variant="h5" gutterBottom>Hyy {username} Hows your work</Typography>

            <Grid container spacing={2}>
              <Grid item xs={12}>  
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker label="Select Date" value={dayjs(date)} onChange={(newDate) => setDate(newDate.format('YYYY-MM-DD'))} renderInput={(params) => <TextField {...params} />} />
                </LocalizationProvider>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField id="standard-basic" label="Start time" variant="standard" type="time" value={startTime} min="09:00" onChange={(e) => setStartTime(e.target.value)} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField id="standard-basic" label="End time" variant="standard" type="time" value={endTime} max="19:00" onChange={(e) => setEndTime(e.target.value)} />
              </Grid>
              <Grid item xs={12}>
                <TextField id="filled-basic" label="Total" variant="filled" value={timeDifference} />
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <FormControl variant="standard" required fullWidth sx={{ width: 200 }}>
                  <InputLabel id="project-label" sx={{ mt: 2, fontSize: '1.2rem'}}>Project</InputLabel>
                  <Select
                    labelId="project-label"
                    value={project}
                    onChange={(e) => setProject(e.target.value)}
                    label="Project"
                  >
                    <MenuItem value="ProjectA">ProjectA</MenuItem>
                    <MenuItem value="ProjectB">ProjectB</MenuItem>
                    <MenuItem value="ProjectC">ProjectC</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" color="primary" type="submit">Submit</Button>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </form>
      </Box>
    </div>
  );
}

export default TimeEntryForm;
