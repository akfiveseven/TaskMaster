import React, { useEffect, useState, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, BrowserRouter }
    from 'react-router-dom';
import { Link } from 'react-router-dom'
import ToDoApp from './ToDoApp';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'



export default function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Router>
        <Routes>
          <Route path="/" element={<ToDoApp />}/>
        </Routes>
      </Router>
    </LocalizationProvider>
  );
}