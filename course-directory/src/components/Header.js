// stateless component

import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';

import { UserContext } from './Context';

const Header = () => {

    const { authenticatedUser } = useContext(UserContext);

    return (
        <header>
            <div className="wrap header--flex">
                <h1 className="header--logo"><Link to="/courses">Courses</Link></h1>
                <nav>
                {authenticatedUser ? 
                    <ul className='header--signedin'>
                        <li>Welcome, {authenticatedUser.firstName}!</li>
                        <li><NavLink to="/signout">Sign Out</NavLink></li>
                    </ul>
                    :
                    <ul className="header--signedout">
                        <li><NavLink to="/signin">Sign In</NavLink></li>
                        <li><NavLink to="/signup">Sign Up</NavLink></li>
                    </ul>
                }
                </nav>
            </div>
        </header>
    )
};

export default Header;