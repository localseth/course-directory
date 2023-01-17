import React, { createContext, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import Data from '../../Data';
import config from '../../config';

// declare context
export const UserContext = createContext();
export const CourseContext = createContext();

export const Provider = (props) => {
    // set cookies
    const cookie = Cookies.get('authenticatedUser');
    const passCookie = Cookies.get('pass');

    // initialize state
    const [courses, setCourses] = useState([]);
    const [course, setCourse] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState({authenticatedUser: cookie ? JSON.parse(cookie) : null});
    const [errors, setErrors] = useState([]);
    const data = new Data();

    // declare variables
    const url = config.apiBaseUrl;

    const navigate = useNavigate();
    const location = useLocation();

    const { authenticatedUser } = user;

    // user context setup
    const updateUser = (str) => {
        setUser(str);
    }

    useEffect( () => {
        console.log('isLoading state has changed')
    }, [isLoading]);

    // signs in the user and sets that user to authenticated if the api call is successful
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
          // hold user credentials in local cookies
          Cookies.set('authenticatedUser', JSON.stringify(user), { expires: 1});
          Cookies.set('pass', password, { expires: 1 })
          console.log(user);
        }
        setIsLoading(false);
        return user;
    }

    // removes the held user credentials from local cookies
    const signOut =  () => {
        setUser({authenticatedUser: null});
        Cookies.remove('authenticatedUser');
        Cookies.remove('pass');
    }

    // calls the createUser function in Data.js and returns the response
    const createUser = async (user) => {
        setIsLoading(true);
        const userReq = await data.createUser(user);
        if (!userReq.length) {
            console.log(userReq.length);
        }
        setIsLoading(false);
        return userReq;
    }

    // data to be passed into components as needed
    const userValue = {
        authenticatedUser,
        data: data,
        errors,
        actions: {
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

    // requests a list of all courses in the database
    const fetchCourses = async () => {
        setIsLoading(true);
        await axios(url + "/courses")
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

    // writes a new course to the database
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

    // updates an existing course
    const updateCourse = async (id, body) => {
        setIsLoading(true);
        const course = await data.createCourse(`/courses/${id}`, 'PUT', body, authenticatedUser.emailAddress, passCookie )
        console.log(course);
        setIsLoading(false);
        if (course === 500) {
            console.log('navigating...');
            return course;
        } else {
            return course;
        }
    }

    // deletes an existing course
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

    // data relevent to courses to be passed to componenets as needed
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

    // Higher Order Component to use context
    return (
        <UserContext.Provider value={userValue}>
            <CourseContext.Provider value={courseValue}>
                { props.children }
            </CourseContext.Provider>
        </UserContext.Provider>
    )
};