import React from 'react';
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ component: Component, isLoggedIn, path, ...props  }) => {
  return (
    <Route path={path}>
      {
        () => isLoggedIn ? <Component {...props} /> : <Redirect to="/sign-in" />
      }
    </Route>
)}

export default ProtectedRoute;