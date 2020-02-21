import React, { Component } from 'react';
import { Button } from 'antd';

class Login extends Component {
  render() {
    return (
      <div>
        <Button type="dashed" icon="user" size="default">
          Hello, Sign In
        </Button>
      </div>
    )
  }
}

export default Login;