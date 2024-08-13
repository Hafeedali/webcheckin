import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function TimeEntryForm() {
  const {username}= useParams('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]); 
  const [startTime, setStartTime] = useState('09:00'); 
  const [endTime, setEndTime] = useState('');
  const [timeDifference, setTimeDifference] = useState('');
  const [project, setProject] = useState('ProjectA');
  const [savedEntries, setSavedEntries] = useState([]);

  useEffect(() => {
    if (startTime && endTime) {
      const start = new Date(`1970-01-01T${startTime}:00`);
      const end = new Date(`1970-01-01T${endTime}:00`);

      const diff = Math.abs(end - start);
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

      const differenceText = `${hours} hours and ${minutes} minutes`;
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
      project
    };

    try {
      const response = await axios.post('http://localhost:5000/api/time-entry', entry);
      setSavedEntries([...savedEntries, response.data]);
      alert('Data saved successfully!');
    } catch (error) {
      console.error('Error saving data:', error);
      alert('Failed to save data');
    }
  };

  useEffect(() => {
    const fetchSavedEntries = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/time-entry');
        setSavedEntries(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchSavedEntries();
  }, []);

  return (
    <div className='wrapper'>
      <h2>Hyy {username} Hows your work </h2>
      <form onSubmit={handleSubmit}>
        <label>Date:<input type="date" value={date} onChange={(e) => setDate(e.target.value)}required/></label><br />
        <label>Start Time:<input type="time" value={startTime} min="09:00" onChange={(e) => setStartTime(e.target.value)}required/></label><br />
        <label>End Time :<input type="time" value={endTime} max="19:00" onChange={(e) => setEndTime(e.target.value)} required/></label><br />
        <label className='in-btn'> Total Time:<input type="text" value={timeDifference} readOnly /> </label><br />
        <label>Project:<select value={project} onChange={(e) => setProject(e.target.value)} required>
            <option value="ProjectA">ProjectA</option>
            <option value="ProjectB">ProjectB</option>
            <option value="ProjectC">ProjectC</option></select> </label><br />
        <button type="submit">Submit</button>
      </form>
      <h2>saved data</h2>
      <ul>
        {savedEntries.map((entry, index) => (
          <li key={index}>
            name: {username} <br />
            date: {entry.date} <br />
            working time: {entry.startTime} to {entry.endTime} ({entry.timeDifference}) <br />
            project     : {entry.project}<br />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TimeEntryForm;
