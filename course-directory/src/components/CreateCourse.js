import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import config from '../config';

import Form from './Form';

const CreateCourse = () => {
    const [authUser, setAuthUser] = useState('Authorized User');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [estimatedTime, setEstimatedTime] = useState('');
    const [materials, setMaterials] = useState('');
    const [errors, setErrors] = useState([]);

    const url = config.apiBaseUrl;

    const navigate = useNavigate();

    const submit = () => {
        console.log('Submit button pressed');
        axios.put(`${url}/courses`)
    }

    const cancel = () => {
        navigate(-1);
    }

    return (
        <main>
            <div className="wrap">
                <h2>Create Course</h2>
                <Form
                    cancel={cancel}
                    errors={errors}
                    submit={submit}
                    submitButtonText='Create Course'
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

                                    <p>By {authUser}</p>

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
    );
}

export default CreateCourse;