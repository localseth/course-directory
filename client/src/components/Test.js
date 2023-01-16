import React from 'react';

const Test = (props) => {
    const { courses } = props;
    return(
        <>
            <h1>page title</h1>
            <ul>
                {courses.map((course) =><li key={course.id}>{course.title}</li>)}
            </ul>
        </>
    )
}

export default Test;