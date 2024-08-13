import { useState } from 'react'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import './index.css';

import LoginForm from './component/loginform';
import TimeEntryForm from './component/TimeEntryForm';

function App() {

  return (
    <Router>
    <div>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/submit/:username" element={<TimeEntryForm />} />

      </Routes>
    </div>
  </Router>
  )
}

export default App


