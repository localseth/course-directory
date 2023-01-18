import React, { useEffect, useContext} from 'react';
import { Link } from 'react-router-dom';

// get course context
import { CourseContext } from './Context';

const Courses = () => {
    // unpack context variables and functions
    const { actions, courses, isLoading } = useContext(CourseContext);

    // get courses
    useEffect( () => {
        actions.fetchCourses();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect( () => {
        console.log('course information has been loaded');
    }, [courses]);

    return (
        isLoading ? <h1 className='wrap'>Loading...</h1> :
            <main>
                <div className="wrap main--grid">
                    {/* map over courses to generate list */}
                    {courses.map((course) => 
                        <Link to={`/courses/${course.id}`} className="course--module course--link" key={course.id}>
                            <h2 className="course--label">Course</h2>
                            <h3 className="course--title">{course.title}</h3>
                        </Link>
                    )}
                    <Link className="course--module course--add--module" to="/courses/create">
                        <span className="course--add--title">
                            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 13 13" className="add"><polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon></svg>
                            New Course
                        </span>
                    </Link>
                </div>
            </main>
        )
};

export default Courses;