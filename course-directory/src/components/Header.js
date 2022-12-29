// stateless component

import React from 'react';
// import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header>
            <div className="wrap header--flex">
                <h1 className="header--logo">Courses</h1>
                <nav>
                    <ul className="header--signedout">
                        <li>Sign Up</li>
                        <li>Sign In</li>
                    </ul>
                </nav>
            </div>
        </header>
    )
};

export default Header;