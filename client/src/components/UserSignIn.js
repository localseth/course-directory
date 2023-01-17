import React, { useState, useContext } from 'react';
import { Link, Navigate, useNavigate, useLocation } from 'react-router-dom';

import Form from './Form';

// get context
import { UserContext } from './Context';

const UserSignIn = () => {

    const navigate = useNavigate();
    const location = useLocation();

    // set state
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [buttonText, setButtonText] = useState('Sign In');
    const [disabled, setDisabled] = useState(false);
    const [signInError, setSignInError] = useState('');

    // unpack context
    const { authenticatedUser, actions, errors } = useContext(UserContext);
    const { signIn } = actions;

    // handles sign in, errors, and redirect after a successful sign in
    const submit = () => {
        setButtonText('Signing In...');
        setDisabled(true);
        const from = location.state ? location.state.from : '/';
        signIn(username, password)
            .then(user => {
                if (user === null) {
                    setSignInError('User not authorized');
                    setButtonText('Sign In');
                    setDisabled(false)
                } else {
                    setTimeout(() => {
                        navigate(from);
                    }, 1000)
                }
            });
        console.log(location);
    }

    const cancel = () => {
        const to = authenticatedUser ? '/' : -1
        navigate(to);
    }

    // displays an "unauthorized" warning if sign in is unsuccessful
    const Unauthorized = () => {
        let errorsDisplay = null;
        if (signInError) {
            errorsDisplay = (
                <div className="validation--errors">
                    <h3>{signInError}</h3>
                </div>
            )
        }

        return errorsDisplay;
    }

    return (
        authenticatedUser && !disabled
        ?
        <Navigate to="/" />
        :
        <main>
            <div className="form--centered">
                <h2>Sign In</h2>

                <Unauthorized />
                
                <Form
                    cancel={cancel}
                    errors={errors}
                    submit={submit}
                    submitButtonText={buttonText}
                    disabled={disabled}
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