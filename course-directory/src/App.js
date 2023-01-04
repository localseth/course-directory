

import './global.css';

import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

// import components
import Header from './components/Header';
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';
import CreateCourse from './components/CreateCourse';

function App() {

  return (
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Navigate to="/courses" />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:id" element={<CourseDetail />} />
          <Route path="/signin" element={<UserSignIn />} />
          <Route path="/signup" element={<UserSignUp />} />
          <Route path="/createcourse" element={<CreateCourse buttonText="Create Course" />} />
          <Route path="/updatecourse/:id" element={<CreateCourse buttonText="Update Course" />} />
        </Routes>
      </div>
  );
}

export default App;
