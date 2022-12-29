import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';


const CourseDetail = (props) => {
    const [course, setCourse] = useState([]);

    const params = useParams();
    
    const fetchCourse = useCallback( async () => {
        const resp = await axios(`http://localhost:5000/api/courses/${params.id}`);
        setCourse(resp.data);
    }, [params.id]);
      

    useEffect( () => {
        fetchCourse()
    }, [fetchCourse]);

    useEffect( () => {
        console.log(params, course);
    })

    return (
        <h1>{course.title}</h1>
    )
}

export default CourseDetail;