import React, { useState, useEffect, useCallback, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown'

import { CourseContext, UserContext } from './Context';

const CourseDetail = () => {
    const params = useParams();
    const navigate = useNavigate();

    // set state
    const [errors, setErrors] = useState([]);

    // unpack context variables
    const { course, actions, isLoading } = useContext(CourseContext);
    const { authenticatedUser } = useContext(UserContext);
    const fetchCourse = actions.fetchCourse;

    // handles the DELETE request and navigates to the home route if the request is successful
    const handleDelete = useCallback( async () => {
        await actions.deleteCourse(params.id)
            .then(res => {
                if (res.length) {
                    setErrors(res);
                    console.log(errors);
                } else {
                    navigate('/')
                }
            });
    }, [params.id] );

    // request data for the course specified in the url
    useEffect( () => {
        fetchCourse(params.id);
    }, []);

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
                                <Link to={`/courses/${course?.id}/update`} className='button'>Update Course</Link>
                                <button className='button' onClick={handleDelete}>Delete Course</button>
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
                                <h4 className='course--name'>{course?.title}</h4>
                                <p>By {course?.owner?.firstName} {course?.owner?.lastName}</p>
                                <ReactMarkdown>{course?.description}</ReactMarkdown>
                            </div>
                            <div>
                                <h3 className='course--detail--title'>Estimated Time</h3>
                                {course?.estimatedTime ? <p>{course?.estimatedTime}</p> : ""}
                                <h3 className='course--detail--title'>Materials Needed</h3>
                                <ul className='course--detail--list'>
                                    {course?.materialsNeeded ? <ReactMarkdown>{course?.materialsNeeded}</ReactMarkdown> : null }
                                        
                                        
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

/*
 honorable mentions

the code below are solutions I am proud of coming up with before I added the ReactMarkdown package

This function took in the blocks of text as I saw them formatted in the api and split them at line breaks
    const splitString = (str) => {
        const newArr = str.split('\n');
        return newArr;
    };

    For the course description, I used the above function first then generated <p> tags by mapping over the array
    {splitString(course?.description).map((desc, i) => <p key={i}>{desc}</p>)}

    Then for the materials needed, I did the same thing, but also deleted any asterisks thus relying on the formatting of the <li>
    I also replaced any line that ended with a linebreak with an empty string
    splitString(course?.materialsNeeded.replaceAll('* ', '').replace(/\n$/,'')).map((item, i) => <li key={i}>{item}</li>)
*/

