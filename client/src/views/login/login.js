import React, { useState } from 'react';
import { Button, Modal, Dropdown, Menu } from 'antd';
import SignInForm from '../../components/signInForm';
import RegisterForm from '../../components/registerForm';

const Login = (props) => {
  const [showModal, setModal] = useState(false)
  const [showRegister, setRegister] = useState(false)

  const menu = (
    <Menu>
      <Menu.Item>
        <a href="/dashboard">
          Dashboard
        </a>
      </Menu.Item>
      <Menu.Item>
        {/* TODO: logout user, clear session token  */}
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    props.isLoggedIn ?
      <Dropdown overlay={menu} placement="bottomCenter">
        <Button icon="user"/>
      </Dropdown>
      :
      <div>
        <Button
          type="dashed"
          icon="user"
          onClick={setModal(true)}>
          Hello, Sign In
       </Button>
        <Modal
          title="Sign in or Create an Account"
          visible={showModal}
          onOk={this.submitForm}
          onCancel={setModal(false)}
          footer={null}
        >
          {showRegister ?
            <RegisterForm switchView={setRegister(false)} /> :
            <SignInForm switchView={setRegister(true)} />
          }
        </Modal>
      </div>
  );
}

export default Login;