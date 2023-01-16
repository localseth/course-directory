import React from 'react';
import { Link } from 'react-router-dom';

const ErrorDisplay = (props) => {
    return(
        <div className='wrap'>
            <h2>{props.message}</h2>
            <Link to="/">Home</Link>
        </div>
    )
}

export default ErrorDisplay;