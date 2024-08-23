import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { TextField, Button, Container, Typography, Paper, Box } from '@mui/material';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Home from './home';
import Header from './header';

function SubmittedData() {
  const location = useLocation();
  const { lastEntry } = location.state || {};
  const [searchDate, setSearchDate] = useState(new Date().toISOString().split('T')[0]);
  const [searchedEntries, setSearchedEntries] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/time-entry`, {
        params: { date: searchDate } // Using params to pass the date
      });
      setSearchedEntries(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      alert('Failed to fetch data');
    }
  };

  return (
    <Box sx={{bgcolor:'#BFD4BF', height: '100vh'}}>
    <div>
    <Header />
   <Container maxWidth="sm" >
   <Box sx={{ mt: 5,bgcolor: '#DBE9F4', height: '{250}', p: 10, borderRadius: 2, boxShadow: 3 }}>
        <Typography variant="h5" gutterBottom>
          Last Submitted Data
        </Typography>
        {lastEntry ? (
          <div>
            <Typography>Date: {lastEntry.date}</Typography>
            <Typography>Start Time: {lastEntry.startTime}</Typography>
            <Typography>End Time: {lastEntry.endTime}</Typography>
            <Typography>Time Difference: {lastEntry.timeDifference}</Typography>
            <Typography>Project: {lastEntry.project}</Typography>
          </div>
        ) : (
          <Typography>No data submitted yet</Typography>
        )}

        <Typography variant="h6" sx={{ mt: 4 }}>
          Search Data by Date  
        </Typography>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Select Date"
            value={dayjs(searchDate)}
            onChange={(newDate) => setSearchDate(newDate.format('YYYY-MM-DD'))}
            renderInput={(params) => <TextField fullWidth {...params} />}
          />
        </LocalizationProvider>
        <Button variant="contained" color="primary" onClick={handleSearch} sx={{ mt: 2 }}>
          Search
        </Button>  

        {searchedEntries.length > 0 && (
          <div>
            <Typography variant="h6" sx={{ mt: 4 }}>
              Search Results
            </Typography>
            <ul>
              {searchedEntries.map((entry, index) => (
                <li key={index}>
                  Date: {entry.date} <br />
                  Start Time: {entry.startTime} <br />
                  End Time: {entry.endTime} <br />
                  Time Difference: {entry.timeDifference} <br />
                  Project: {entry.project} <br />
                </li>
              ))}
            </ul>
          </div>
        )}
    </Box>
    </Container>
    </div>
    </Box>
  );
}

export default SubmittedData;
