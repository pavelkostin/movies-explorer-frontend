import React from "react";
import { Route, Redirect } from "react-router-dom";


export const ProtectedRoute = ({ component: Component, ...props }) => {
    return (
        /* props.loggedIn !== null && */
        <Route>
            {() =>
                props.loggedIn ? <Component {...props} /> : <Redirect to='/signin' />
            }
        </Route>
    );
};
