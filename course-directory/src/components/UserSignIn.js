import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Form from './Form';

const UserSignIn = (props) => {

    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState('');

    const submit = () => {
        console.log('Submit button pressed');
    }

    const cancel = () => {
        navigate(-1);
    }

    const handleChange = (e) => {
        // Can I pass a function such as setUserName or setPassword as a function by calling in the onChange event?
    }

    return (
        <main>
            <div className="form--centered">
                <h2>Sign In</h2>
                
                <Form
                    cancel={cancel}
                    errors={errors}
                    submit={submit}
                    submitButtonText="Sign In"
                    elements={ () => (
                        <>
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
                <p>Don't have a user account? Click here to <Link to="/signup">sign up</Link>!</p>
                
            </div>
        </main>
    )
}

export default UserSignIn;