

import './global.css';

import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

// import components
import Header from './components/Header';
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';

function App() {

  return (
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Navigate to="/courses" />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:id" element={<CourseDetail />} />
        </Routes>
      </div>
  );
}

export default App;
