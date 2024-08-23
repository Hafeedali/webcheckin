import { useState } from 'react'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import './index.css';

import LoginForm from './component/loginform';
import TimeEntryForm from './component/TimeEntryForm';
import Home from './component/home';
import Employee from './component/Employee';
import SubmittedData from './component/Details';

function App() {

  return (
    <Router>
    <div>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/submit/:username" element={<Home />} />
        <Route path="/submit/:username/getstart" element={<TimeEntryForm />} />
        <Route path="/submit/:username/getstart/SubmittedData" element={<SubmittedData />} />
        
        <Route path="/employee" element={<Employee />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </div>
  </Router>
  )
}

export default App;


