import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import config from '../config';

import Form from './Form';

const UpdateCourse = () => {
    const [course, setCourse] = useState([]);
    const [authUser, setAuthUser] = useState('Authorized User');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [estimatedTime, setEstimatedTime] = useState('');
    const [materials, setMaterials] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [errors, setErrors] = useState([]);

    const navigate = useNavigate();
    const params = useParams();

    const url = config.apiBaseUrl;

    const fetchCourse = useCallback( async () => {
        await axios.get(`${url}/courses/${params.id}`)
            .then(response => {
                setCourse(response.data);
                setTitle(response.data.title);
                setDescription(response.data.description);
                setEstimatedTime(response.data.estimatedTime || '');
                setMaterials(response.data.materialsNeeded || '');
                setIsLoading(false);
        });
    }, [params.id]);

    const submit = () => {
        console.log('Submit button pressed');
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
                    <h2>Create Course</h2>
                    <Form
                        cancel={cancel}
                        errors={errors}
                        submit={submit}
                        submitButtonText='Update Course'
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
                                            value={materials}
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