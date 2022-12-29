import React, { useState, useEffect, useCallback} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Courses = (props) => {
    const [courses, setCourses] = useState([]);

    // fetch list of courses
    const fetchCourses = useCallback( async () => {
        const resp = await axios("http://localhost:5000/api/courses");
        setCourses(resp.data);
    }, []);

    useEffect( () => {
        fetchCourses();
    }, [fetchCourses]);

    useEffect( () => {
        console.log('course information has been loaded');
    }, [courses]);

    // const { courses } = props;
    return(
        <main>
            <div className="wrap main--grid">
                {courses.map((course) => 
                    <Link to={`/courses/${course.id}`} className="course--module course--link" key={course.id}>
                        <h2 className="course--label">Course</h2>
                        <h3 className="course--title">{course.title}</h3>
                    </Link>
                )}
                <Link className="course--module course--add--module" to="/createcourse">
                    <span class="course--add--title">
                        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 13 13" class="add"><polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon></svg>
                        New Course
                    </span>
                </Link>
            </div>
        </main>
    )
};

export default Courses;