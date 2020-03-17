//This file will contain all the context variables for state that needs to be used in almost all applications
//see https://reactjs.org/docs/context.html

import React from 'react';

const UserContext = React.createContext({
  state: { user: { id: null } },
  setState: () => {},
});

export default UserContext;
