import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { useAuth } from '../contexts/authContext'
import token from '../utils/token'

/* used by route that needs to be hidden behind authentication */
/* only staffs can acces these routes */

// may need to be change to function
const AdminRoute = ({ component: Component, ...rest }) => {
    const { loggedIn } = useAuth();
    const isStaff = token().staff;

    return (
        <Route 
            {...rest}
            render={ props =>
                (loggedIn && isStaff) ?
                ( <Component {...props} /> )
                :
                (   // redirect to login or previous page
                    <Redirect 
                    to={{ 
                        pathname: "/", 
                        state: { referer: props.location } }}
                    /> /* redirect if not auth */
                )
            }
        />
    )
}

export default AdminRoute;