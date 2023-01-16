import React from 'react';
import ErrorDisplay from './ErrorDisplay';

const Forbidden = () => {
    return(
        <ErrorDisplay message="You are not authorized to access this page" />
    )
}

export default Forbidden;