import React, { useState, useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import Form from './Form';

import { UserContext } from './Context';

const UserSignIn = (props) => {

    const { authenticatedUser, actions, errors } = useContext(UserContext);
    const navigate = useNavigate();
    const location = useLocation();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const submit = () => {
        const from = location.state ? location.state.from : '/';
        actions.signIn(username, password);
        console.log(location);
        if (authenticatedUser) {
            navigate(from);
        }
    }

    const cancel = () => {
        const to = authenticatedUser ? '/' : -1
        navigate(to);
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