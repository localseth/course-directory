

import './global.css';

import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

// import components
import Header from './components/Header';
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';
import UserSignOut from './components/UserSignOut';
import UpdateCourse from './components/UpdateCourse';
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
          <Route path="/signout" element={<UserSignOut />} />
          <Route path="/courses/create" element={<CreateCourse />} />
          <Route path="/courses/:id/update" element={<UpdateCourse />} />
        </Routes>
      </div>
  );
}

export default App;
