import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';


import { UserContext, CourseContext } from './Context';

// components
import Form from './Form';

const CreateCourse = () => {
    const { authenticatedUser } = useContext(UserContext);
    const { actions } = useContext(CourseContext);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [estimatedTime, setEstimatedTime] = useState('');
    const [materials, setMaterials] = useState('');
    const [errors, setErrors] = useState([]);

    const { firstName, lastName } = authenticatedUser;

    const body = {
        title,
        description,
        estimatedTime,
        materials,
        id: authenticatedUser.id
    }

    const navigate = useNavigate();

    const submit = () => {
        console.log('Submit button pressed');
        actions.createCourse('/courses', body)
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

                                    <p>By {firstName} {lastName}</p>

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