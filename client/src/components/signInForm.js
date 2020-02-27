import React, { Component } from 'react';
import { Form, Icon, Input, Button } from 'antd';


class SignIn extends Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        //TODO: login user and resgister cookie, set global isLoggedIn to true
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Username"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
            />
          )}
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            block
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
          <div>
            <p>Don't Have An Account?</p>
            <Button
              type="link"
              size="small"
              onClick={this.props.switchView}>
              Sign Up
            </Button>
          </div>
        </Form.Item>
      </Form>
    );
  }
}

const SignInForm = Form.create({ name: 'normal_login' })(SignIn);
export default SignInForm;
