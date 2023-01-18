// this component handles routes that require usuer authentication

import React, { useContext, useEffect } from "react";
import { Outlet, Navigate, useLocation, useParams } from "react-router-dom";

// get user and course context
import { UserContext, CourseContext } from "./components/Context";

const PrivateRoute = () => {
    const params = useParams();
    const location = useLocation();

    // unpack context variables and functions
    const { authenticatedUser } = useContext(UserContext);
    const { course, actions } = useContext(CourseContext);

    useEffect( () => {
        actions.fetchCourse(params.id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params.id]);
    
    // only allow the user to access the CreateCourse component if they are authenticated, otherwise navigate to sign in page
    if (location.pathname === '/courses/create') {
        return authenticatedUser ? <Outlet /> : <Navigate to="/signin" state={{from: location.pathname}} />;
    }
    // check if user is authenticated and the owner of a course to allow access to the update page
    else if (course.id && location.pathname.includes('/update')) {
        if (authenticatedUser){
            // if authenticated user is the owner, access is granted; otherwise navigate to the 'forbidden' route
            return authenticatedUser.emailAddress === course.owner?.emailAddress
            ?
                <Outlet />
            :
                <Navigate
                    to="/forbidden"
                    state={{from: location.pathname}}
                />;
        }
        // if not authenticated, navigate to sign in page
        else {
            return <Navigate to="/signin" state={{from: location.pathname}} />
        }
    }
    // if trying to update the course but there is no such course, navigate to the 'not found' route
    else if (!course.id && location.pathname.includes('/update')) {
        <Navigate to="/notfound" />
    }
};

export default PrivateRoute;

