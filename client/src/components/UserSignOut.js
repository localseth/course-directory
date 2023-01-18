// stateless component

import React, { useState, useContext, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

import { UserContext } from './Context';

const UserSignOut = () => {
    // set state
    const [redirect, setRedirect] = useState(false);
    
    // unpack context actions
    const { actions } = useContext(UserContext);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect( () => actions.signOut(), []);
    
    // handles state change to display a sign out message then redirects to the home route
    setTimeout( () => {
        setRedirect(true);
    }, 1500);

    if (!redirect) {
        return (
            <div className="wrap">
                <h1>User has been signed out</h1>
                <p>Redirecting to homepage...</p>
            </div>
        )
    } else {
        return (
            <Navigate to="/" />
        )
    }
}

export default UserSignOut;