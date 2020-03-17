import React, { Component } from 'react';
import { Button, Modal } from 'antd';
import SignInForm from '../../components/signInForm';
import RegisterForm from '../../components/registerForm';

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showModal: false,
      showRegister: false,
    }
  }

  openModal = () => {
    this.setState({
      showModal: true,
    })
  }

  closeModal = () => {
    this.setState({
      showModal: false,
    })
  }

  switchToRegister = () => {
    this.setState({
      showRegister: true
    })
  }

  switchToSignIn = () => {
    this.setState({
      showRegister: false
    })
  }

  submitForm = () => {
    console.log("write the logic to submit form to create user or log them in")
  }

  render() {
    return (
      <div>
        <Button
          type="dashed"
          icon="user"
          onClick={this.openModal}>
          Hello, Sign In
        </Button>
        <Modal
          title="Sign in or Create an Account"
          visible={this.state.showModal}
          onOk={this.submitForm}
          onCancel={this.closeModal}
          footer={null}
        >
          {this.state.showRegister ?
            <RegisterForm switchView={this.switchToSignIn}/> :
            <SignInForm switchView={this.switchToRegister}/>}
        </Modal>
      </div>
    )
  }
}

export default Login;