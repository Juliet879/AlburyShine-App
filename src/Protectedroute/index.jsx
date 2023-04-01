import React from 'react';
import { Redirect } from '@react-navigation/native';

const ProtectedRoute = ({ component: Component, userRole, requiredRoles, ...rest }) => {
  const userHasAccess = requiredRoles.includes(userRole);

  if (userHasAccess) {
    return <Component {...rest} />;
  } else {
    return <Redirect to="/Unauthorized" />;
  }
};

export default ProtectedRoute;
