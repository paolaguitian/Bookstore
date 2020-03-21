import React from 'react';
import { Redirect, withRouter } from "react-router-dom";


const ProtectedRoute = (props) => {
  const {isLoggedIn, component} = props;

  if (isLoggedIn) {
    const ComponentWithRouter = withRouter(component)
    return (
      <div>
        <ComponentWithRouter/>
      </div>
    );
  } else {
    return (
      <Redirect to="/"/>
    );
  }
}

export default ProtectedRoute;