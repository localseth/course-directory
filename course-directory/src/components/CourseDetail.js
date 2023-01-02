import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';


const CourseDetail = (props) => {
    const [course, setCourse] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const params = useParams();
    
    const fetchCourse = useCallback( async () => {
        await axios.get(`http://localhost:5000/api/courses/${params.id}`).then(response => {
            setCourse(response.data);
            setIsLoading(false);
        });
    }, [params.id]);

    const handleDelete = useCallback( async () => {
        await axios.delete(`http://localhost:5000/api/courses/${params.id}`);
    }, [params.id] );

    const splitString = (str) => {
        const newArr = str.split('\n');
        return newArr;
    };

    useEffect( () => {
        fetchCourse();
    }, [fetchCourse]);

    useEffect( () => {
        console.log(params, course);
    }, [params, course]);

    if (isLoading) {
        return(
            <h1 className='wrap'>Loading...</h1>
        )
    } else {
        return (
            <main>
                <div className='actions--bar'>
                    <div className='wrap'>
                        <Link to={`/UpdateCourse/${course.id}`} className='button'>Update Course</Link>
                        <a href="#" className='button' onClick={handleDelete}>Delete Course</a>
                        <Link to={`/courses`} className='button button-secondary'>Return to List</Link>
                    </div>
                </div>
                <div className='wrap'>
                    <h2>Course Detail</h2>
                    <form>
                        <div className='main--flex'>
                            <div>
                                <h3 className='course--detail--title'>Course</h3>
                                <h4 className='course--name'>{course.title}</h4>
                                <p>By {course.owner.firstName} {course.owner.lastName}</p>
                                {splitString(course.description).map((desc, i) => <p key={i}>{desc}</p>)}
                            </div>
                            <div>
                                <h3 className='course--detail--title'>Estimated Time</h3>
                                {course.estimatedTime ? <p>{course.estimatedTime}</p> : ""}
                                <h3 className='course--detail--title'>Materials Needed</h3>
                                <ul className='course--detail--list'>
                                    {course.materialsNeeded
                                        ? 
                                        splitString(course.materialsNeeded.replaceAll('* ', '').replace(/\n$/,'')).map((item, i) => <li key={i}>{item}</li>)
                                        :
                                        ""
                                    }
                                </ul>
                            </div>
                        </div>
                    </form>
                </div>
            </main>
        )
    }
}

export default CourseDetail;