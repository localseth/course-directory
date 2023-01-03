import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Form from './Form';

const UserSignUp = (props) => {

    const navigate = useNavigate();
    
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState('');

    const submit = () => {
        console.log('Submit button pressed');
    }

    const cancel = () => {
        navigate(-1);
    }

    return(
        <main>
            <div className="form--centered">
                <h2>Sign Up</h2>
                
                <Form
                    cancel={cancel}
                    errors={errors}
                    submit={submit}
                    submitButtonText="Sign Up"
                    elements={ () => (
                        <>
                            <label htmlFor="firstName">First Name</label>
                            <input 
                                id="firstName"
                                name="firstName"
                                type="text"
                                value={firstName}
                                onChange={e => setFirstName(e.target.value)}
                            />
                            <label htmlFor="lastName">Last Name</label>
                            <input 
                                id="lastName"
                                name="lastName"
                                type="text"
                                value={lastName}
                                onChange={e => setLastName(e.target.value)}
                            />
                            <label htmlFor="emailAddress">Email Address</label>
                            <input
                                id="emailAddress"
                                name="emailAddress"
                                type="email"
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                            />
                            <label htmlFor="password">Password</label>
                            <input 
                                id="password"
                                name="password"
                                type="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                        </>
                    )}
                />
                <p>Already have a user account? Click here to <Link to='/signin'>sign in</Link>!</p>
            </div>
        </main>
    )
};

export default UserSignUp;