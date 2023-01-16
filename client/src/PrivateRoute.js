import React, { useContext, useEffect } from "react";
import { Outlet, Navigate, useLocation, useParams } from "react-router-dom";

import { UserContext, CourseContext } from "./components/Context";

const PrivateRoute = () => {
    const params = useParams();
    const location = useLocation();
    console.log(location);
    const { authenticatedUser } = useContext(UserContext);
    const { course, actions } = useContext(CourseContext);

    useEffect( () => {
        actions.fetchCourse(params.id);
    }, [params.id]);

    if (location.pathname === '/courses/create') {
        return authenticatedUser ? <Outlet /> : <Navigate to="/signin" state={{from: location.pathname}} />;
    } else if (course.id && location.pathname.includes('/update')) {
        if (authenticatedUser){
            return authenticatedUser.emailAddress === course.owner?.emailAddress
            ?
                <Outlet />
            :
                <Navigate
                    to="/forbidden"
                    state={{from: location.pathname}}
                />;
        } else {
            return <Navigate to="/signin" state={{from: location.pathname}} />
        }
    } else if (!course.id && location.pathname.includes('/update')) {
        <Navigate to="/notfound" />
    }
};

export default PrivateRoute;

