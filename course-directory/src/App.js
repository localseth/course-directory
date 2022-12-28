

import './App.css';

import React, { useEffect, useState, useCallback } from 'react';

import axios from 'axios';

function App() {
  const [courses, setCourses] = useState([]);
  const fetchCourses = useCallback( async () => {
    const resp = await axios("http://localhost:5000/api/courses");
    setCourses(resp.data);
  }, []);

  useEffect( () => {
    fetchCourses();
  }, [fetchCourses]);

  useEffect( () => {
    console.log(courses[0]);
  }, [courses])

  return (
    <div className="App">
      <h1>page title</h1>
      <ul>
        {courses.map((course) =><li key={course.id}>{course.title}</li>)}
      </ul>
    </div>
  );
}

export default App;
