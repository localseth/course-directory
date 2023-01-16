import React, { useState, useContext } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';

// components
import Form from './Form';

import { UserContext } from './Context';

const UserSignUp = () => {
    const { authenticatedUser, actions } = useContext(UserContext);

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);
    const [buttonText, setButtonText] = useState('Sign Up');
    const [disabled, setDisabled] = useState(false);

    const navigate = useNavigate();

    const body = {
        firstName,
        lastName,
        emailAddress: username,
        password
    }

    const submit = () => {
        console.log('Submit button pressed');
        setButtonText('Loading...');
        setDisabled(true);
        actions.createUser(body, username, password)
            .then(res => {
                if (res === 500) {
                    setErrors(res);
                    setDisabled(false);
                    setButtonText('Sign Up');
                }
                else if (res.length) {
                    setErrors(res);
                    setDisabled(false);
                    setButtonText('Sign Up');
                } else {
                    setDisabled(true);
                    actions.signIn(username, password);
                    console.log(authenticatedUser, ' successfully signed in!');
                    setButtonText('Signing in...');
                    setTimeout(() => {
                        navigate('/');
                    }, 1500)
                }
            });
    }

    const cancel = () => {
        navigate(-1);
    }

    return(
        errors === 500 ? <Navigate to="/error" /> :
        <main>
            <div className="form--centered">
                <h2>Sign Up</h2>
                
                <Form
                    cancel={cancel}
                    errors={errors}
                    submit={submit}
                    submitButtonText={buttonText}
                    disabled={disabled}
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