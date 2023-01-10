// stateless component

import React, { useState, useContext, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

import { UserContext } from './Context';

const UserSignOut = () => {
    const [redirect, setRedirect] = useState(false);
    const { actions } = useContext(UserContext);
    useEffect( () => actions.signOut(), [actions]);
  
    setTimeout( () => {
        setRedirect(true);
    }, 2000);

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