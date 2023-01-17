import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

// components
import Form from './Form';

// get context
import { UserContext, CourseContext } from './Context';

const CreateCourse = () => {

    const navigate = useNavigate();

    // unpack context variables and functions
    const { authenticatedUser } = useContext(UserContext);
    const { actions } = useContext(CourseContext);

    // set state
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [estimatedTime, setEstimatedTime] = useState('');
    const [materialsNeeded, setMaterials] = useState('');
    const [buttonText, setButtonText] = useState('Create Course');
    const [errors, setErrors] = useState([]);

    // get authenticated user variables
    const { firstName, lastName } = authenticatedUser;

    // package information to be passed to the API
    const body = {
        title,
        description,
        estimatedTime,
        materialsNeeded,
        userId: authenticatedUser.id
    }

    // pass course data to http request when form is submitted
    const submit = () => {
        setButtonText('Loading...');
        console.log('Submit button pressed');
        actions.createCourse(body)
            .then(res => {
                // handle errors
                if (res?.length) {
                    setErrors(res);
                    setButtonText('Create Course');
                } 
                // or navigate to home route
                else if (res && !res.length) {
                    navigate('/');
                }
            });
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

                                    <p>By {firstName} {lastName}</p>

                                    <label htmlFor="courseDescription">Course Description</label>
                                    <textarea
                                        id="courseDescription"
                                        name="courseDescription"
                                        placeholder='Enter description here...'
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
    );
}

export default CreateCourse;