import React, { useEffect, useState, useRef, } from 'react';
import { BrowserRouter as Router, Routes, Route, BrowserRouter }
    from 'react-router-dom';
import { Link } from 'react-router-dom'
import ToDoApp from './ToDoApp';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { Button, ThemeProvider, createTheme } from '@mui/material';
import Signup from './Signup';
import { AuthProvider } from './AuthContext';


// Define your custom theme
const darkMode = createTheme({
  palette: {
    primary: {
      main: '#9b5de5',  // color 1
    },
    secondary: {
      main: '#fb5607',  // color 2
    },
    error: {
      main: '#ff006e',  // color 3
    },
    warning: {
      main: '#8338ec',  // color 4
    },
    info: {
      main: '#3a86ff',  // color 5
    },
    background: {
      default: '#333',  // dark grey background for your app
      paper: '#424242', // slightly lighter background for paper-like surfaces
    },
    text: {
      primary: '#ffffff',  // primary text color, used for most text
      secondary: '#bdbdbd', // secondary text color, less important text
    },
  },
});

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider theme={darkMode}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Router basename="/todo">
            <Routes>
              <Route path="/" element={<ToDoApp />}/>
              <Route path="/Signup" element={<Signup />}/>
            </Routes>
          </Router>
        </LocalizationProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}