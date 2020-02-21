import React, { Component } from 'react';
import { Button, Modal } from 'antd';

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showModal: false,
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
          title="Basic Modal"
          visible={this.state.showModal}
          onOk={this.submitForm}
          onCancel={this.closeModal}
        >
          <p>Login Fields...</p>
        </Modal>
      </div>
    )
  }
}

export default Login;