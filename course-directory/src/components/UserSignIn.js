import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const UserSignIn = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState('');

    const handleCancel = (e) => {
        e.preventDefault();
        navigate(-1);
    }

    return (
        <main>
            <div className="form--centered">
                <h2>Sign In</h2>
                
                <form>
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
                    <button className="button" type="submit">Sign In</button><button className="button button-secondary" onClick={handleCancel}>Cancel</button>
                </form>
                <p>Don't have a user account? Click here to <Link to="/signup">sign up</Link>!</p>
                
            </div>
        </main>
    )
}

export default UserSignIn;