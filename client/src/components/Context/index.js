import React, { createContext, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import Data from '../../Data';
import config from '../../config';

export const UserContext = createContext();
export const CourseContext = createContext();

export const Provider = (props) => {
    const cookie = Cookies.get('authenticatedUser');
    const passCookie = Cookies.get('pass');
    const url = config.apiBaseUrl;

    const navigate = useNavigate();
    const location = useLocation();

    // initialize state
    const [courses, setCourses] = useState([]);
    const [course, setCourse] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState({authenticatedUser: cookie ? JSON.parse(cookie) : null});
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState(passCookie ? passCookie : '');
    const [errors, setErrors] = useState([]);
    const data = new Data();

    // user context setup
    const updateUser = (str) => {
        setUser(str);
    }

    useEffect( () => {
        console.log('isLoading state has changed')
    }, [isLoading]);

    const signIn = async (username, password) => {
        setIsLoading(true);
        console.log('singIn function called!')
        const user = await data.getUser(username, password);
        if (user !== null) {
          setUser(() => {
            return {
              authenticatedUser: user
            }
          });
          Cookies.set('authenticatedUser', JSON.stringify(user), { expires: 1});
          Cookies.set('pass', password, { expires: 1 })
          console.log(user);
        }
        setIsLoading(false);
        return user;
    }

    const signOut =  () => {
        setUser({authenticatedUser: null});
        Cookies.remove('authenticatedUser');
        Cookies.remove('pass');
    }

    const createUser = async (user, username, password) => {
        setIsLoading(true);
        const userReq = await data.createUser(user);
        if (!userReq.length) {
            console.log(userReq.length);
        }
        setIsLoading(false);
        return userReq;
    }

    const { authenticatedUser } = user;
    const userValue = {
        authenticatedUser,
        data: data,
        errors,
        actions: {
            setUsername: setUsername,
            setPassword: setPassword,
            updateUser: updateUser,
            signIn: signIn,
            signOut: signOut,
            createUser: createUser,
            setErrors: setErrors
        }
    }

    // course context setup

    // this function passes a request to the api by accepting the id from the route on the page rendering the CourseDetail component
    const fetchCourse = async (id) => {
        setIsLoading(true);
        await axios.get(url + `/courses/${id}`)
            .then(response => {
                if (!response.data.id && !location.pathname.includes('/create')) {
                    navigate('/notfound')
                }
                console.log('fetching course #' + id, response.data);
                setCourse(response.data);
            })
            .catch(err => {
                if (err.response.status === 500) {
                    navigate('/error');
                }
                console.log(err.response)
            })
            .finally(setIsLoading(false));
    };

    const fetchCourses = async () => {
        setIsLoading(true);
        await axios("http://localhost:5000/api/courses")
            .then(resp => {
                if (resp.data) {
                    console.log(resp.data);
                    setCourses(resp.data);
                    setIsLoading(false);
                }
            })
            .catch(err => {
                console.error(err);
                if (err.response.status === 500) {
                    navigate('/error');
                }
            })
            .finally(setIsLoading(false));
    }

    const createCourse = async (body) => {
        setIsLoading(true);
        const course = await data.createCourse('/courses', 'POST', body, authenticatedUser.emailAddress, passCookie)
        console.log(course);
        setIsLoading(false);
        if (course === 500) {
            navigate('/error')
        } else {
            return course;
        }
        
    }

    const updateCourse = async (id, body) => {
        setIsLoading(true);
        const course = await data.createCourse(`/courses/${id}`, 'PUT', body, authenticatedUser.emailAddress, passCookie )
        console.log(course);
        setIsLoading(false);
        if (course === 500) {
            console.log('navigating...');
            // navigate('/error');
            return course;
        } else {
            return course;
        }
    }

    const deleteCourse = async (id) => {
        setIsLoading(true);
        const course = await data.createCourse(`/courses/${id}`, 'DELETE', null, authenticatedUser.emailAddress, passCookie );
        setIsLoading(false);
        if (course === 500) {
            navigate('/error')
        } else {
            return course;
        }
    }

    const courseValue = {
        courses,
        course,
        isLoading,
        actions: {
            setCourses: setCourses,
            setCourse: setCourse,
            fetchCourse: fetchCourse,
            fetchCourses: fetchCourses,
            createCourse: createCourse,
            updateCourse: updateCourse,
            deleteCourse: deleteCourse 
        }
    }

    return (
        <UserContext.Provider value={userValue}>
            <CourseContext.Provider value={courseValue}>
                { props.children }
            </CourseContext.Provider>
        </UserContext.Provider>
    )
};