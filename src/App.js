import React, { useEffect, useState, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, BrowserRouter }
    from 'react-router-dom';
import { Link } from 'react-router-dom'
import Navbar from './Navbar'
import ToDoApp from './ToDoApp';

export default function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<ToDoApp />}/>
        </Routes>
      </Router>
    </>
  );
}