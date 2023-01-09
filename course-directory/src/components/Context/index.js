import React, { createContext, useState, useEffect, useCallback } from 'react';
// import { useParams } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import Data from '../../Data';

export const UserContext = createContext();
export const CourseContext = createContext();

export const Provider = (props) => {
    const cookie = Cookies.get('authenticatedUser');
    // const params = useParams();

    // initialize state
    const [course, setCourse] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState({authenticatedUser: cookie ? JSON.parse(cookie) : null});
    const data = new Data();

    // user context setup
    const updateUser = (str) => {
        setUser(str);
    }

    // useEffect( () => {
    //     console.log(user);
    // }, [user]);

    // useEffect( () => {
    //     console.log(course);
    // }, [course]);

    useEffect( () => {
        console.log('isLoading state has changed')
    }, [isLoading]);

    const signIn = async (username, password) => {
        console.log('singIn function called!')
        const user = await data.getUser(username, password);
        if (user !== null) {
          setUser(() => {
            return {
              authenticatedUser: user
            }
          });
          Cookies.set('authenticatedUser', JSON.stringify(user), { expires: 1});
        }
        return user;
    }

    const signOut =  () => {
        setUser({authenticatedUser: null});
        Cookies.remove('authenticatedUser');
    }

    const { authenticatedUser } = user;
    const userValue = {
        authenticatedUser,
        data: data,
        actions: {
            updateUser: updateUser,
            signIn: signIn,
            signOut: signOut
        }
    }

    // course context setup
    const fetchCourse = async (id) => {
        await axios.get(`http://localhost:5000/api/courses/${id}`)
            .then(response => {
                console.log('fetching course #' + id)
                setCourse(response.data);
                setIsLoading(false);
        });
    };

    const courseValue = {
        course,
        isLoading,
        actions: {
            fetchCourse: fetchCourse 
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