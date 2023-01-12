import React, { useState, useEffect, useCallback, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown'
import axios from 'axios';

import { CourseContext, UserContext } from './Context';


const CourseDetail = (props) => {
    // const [course, setCourse] = useState([]);
    // const [isLoading, setIsLoading] = useState(true);
    const [errors, setErrors] = useState([]);

    const params = useParams();
    
    // const fetchCourse = useCallback( async () => {
    //     await axios.get(`http://localhost:5000/api/courses/${params.id}`).then(response => {
    //         console.log('fetching course #' + params.id, params);
    //         setCourse(response.data);
    //         setIsLoading(false);
    //     });
    // }, [params.id]);

    const { course, actions, isLoading } = useContext(CourseContext);
    const { authenticatedUser } = useContext(UserContext);
    const fetchCourse = actions.fetchCourse;

    const handleDelete = useCallback( async () => {
        await actions.deleteCourse(params.id)
            .then(res => {
                if (res.length) {
                    setErrors(res);
                }
            });
    }, [params.id] );

    const splitString = (str) => {
        const newArr = str.split('\n');
        return newArr;
    };

    useEffect( () => {
        fetchCourse(params.id);
    }, [params]);

    if (isLoading) {
        return(
            <h1 className='wrap'>Loading...</h1>
        )
    } else {
        return (
            <main>
                <div className='actions--bar'>
                    <div className='wrap'>
                        {authenticatedUser && authenticatedUser.emailAddress === course?.owner?.emailAddress ?
                            <>
                                <Link to={`/courses/${course.id}/update`} className='button'>Update Course</Link>
                                <a href="#" className='button' onClick={handleDelete}>Delete Course</a>
                            </>
                            :
                            <></>
                        }
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
                                <ReactMarkdown>{course.description}</ReactMarkdown>
                                {/* {splitString(course.description).map((desc, i) => <p key={i}>{desc}</p>)} */}
                            </div>
                            <div>
                                <h3 className='course--detail--title'>Estimated Time</h3>
                                {course.estimatedTime ? <p>{course.estimatedTime}</p> : ""}
                                <h3 className='course--detail--title'>Materials Needed</h3>
                                <ul className='course--detail--list'>
                                    {course.materialsNeeded ? <ReactMarkdown>{course.materialsNeeded}</ReactMarkdown> : null }
                                        {/* splitString(course.materialsNeeded.replaceAll('* ', '').replace(/\n$/,'')).map((item, i) => <li key={i}>{item}</li>) */}
                                        
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