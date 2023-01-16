import React, { useState, useCallback, useEffect, useContext } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import config from '../config';

//context
import { UserContext, CourseContext } from './Context';

//components
import Form from './Form';

const UpdateCourse = () => {
    const { authenticatedUser } = useContext(UserContext);
    const { course, actions, isLoading } = useContext(CourseContext);

    const { setCourse } = actions;

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [estimatedTime, setEstimatedTime] = useState('');
    const [materialsNeeded, setMaterials] = useState('');
    const [buttonText, setButtonText] = useState('Update Course');
    const [errors, setErrors] = useState([]);

    const navigate = useNavigate();
    const params = useParams();

    const url = config.apiBaseUrl;

    // set up request body
    const body = {
        id: course.id,
        title,
        description,
        estimatedTime,
        materialsNeeded,
        userId: authenticatedUser.id
    }

    const fetchCourse = useCallback( async () => {
        await axios.get(`${url}/courses/${params.id}`)
            .then(response => {
                console.log(response.data);
                if (response.status === 500) {
                    setErrors(500);
                } else {
                    setCourse(response.data);
                    setTitle(response.data.title);
                    setDescription(response.data.description);
                    setEstimatedTime(response.data.estimatedTime || '');
                    setMaterials(response.data.materialsNeeded || '');
                }
        });
    }, [params.id]);

    const submit = async () => {
        setButtonText('Loading...');
        console.log('Submit button pressed');
        await actions.updateCourse(params.id, body)
            .then(res => {
                console.log(res);
                if (res?.length) {
                    console.log(res);
                    setErrors(res);
                    setButtonText('Update Course')
                } else if (!res?.length && res !== 500) {
                    navigate(`/courses/${params.id}`);
                } else if (res && res === 500) {
                    navigate('/error');
                }
            });
    }

    const cancel = () => {
        navigate(-1);
    }

    
    useEffect( () => {
        fetchCourse();
    }, [params.id]);

    if (isLoading) {
        return(
            <h1 className='wrap'>Loading...</h1>
        )
    } else {
        return (
            <main>
                <div className="wrap">
                    <h2>Update Course</h2>
                    <Form
                        cancel={cancel}
                        errors={errors}
                        submit={submit}
                        submitButtonText={buttonText}
                        elements={ () => (
                            <>
                                <div className="main--flex">
                                    <div>
                                        <label htmlFor="courseTitle">Course Title</label>
                                        <input
                                            id="courseTitle" 
                                            name="courseTitle"
                                            type="text"
                                            value={title}
                                            onChange={e => setTitle(e.target.value)}
                                        />

                                        <p>By {course.owner.firstName} {course.owner.lastName}</p>

                                        <label htmlFor="courseDescription">Course Description</label>
                                        <textarea
                                            id="courseDescription"
                                            name="courseDescription"
                                            // placeholder='Enter description here...'
                                            value={description}
                                            onChange={e => setDescription(e.target.value)} />
                                    </div>
                                    <div>
                                        <label htmlFor="estimatedTime">Estimated Time</label>
                                        <input
                                            id="estimatedTime"
                                            name="estimatedTime"
                                            type="text"
                                            value={estimatedTime}
                                            onChange={e => setEstimatedTime(e.target.value)}
                                        />

                                        <label htmlFor="materialsNeeded">Materials Needed</label>
                                        <textarea
                                            id="materialsNeeded"
                                            name="materialsNeeded"
                                            value={materialsNeeded}
                                            onChange={e => setMaterials(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </>
                        )}
                    />
                </div>
            </main>
        )
    };
}

export default UpdateCourse;