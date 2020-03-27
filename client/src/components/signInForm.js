import React, { useState } from 'react';
import { Form, Icon, Input, Button } from 'antd';
import axios from 'axios';
import UserContext from '../context';
import { Alert } from 'antd';
import { withRouter } from 'react-router';



const SignIn = (props) =>  {
    const { getFieldDecorator } = props.form;
    const [formError, showError] = useState(null);

    const handleSubmit = (e, setState) => {
      e.preventDefault();
      props.form.validateFields((err, values) => {
        if (!err) {
          axios.post('/api/user/read', values)
            .then((res) => {
              localStorage.setItem('token', res.data.accessToken)
              localStorage.setItem('user', JSON.stringify(res.data.user))
              setState({
                user:localStorage.getItem('user'),
                isLoggedIn: localStorage.getItem('token')
              });
              props.history.push('/dashboard');
            })
            .catch((err) => {
              showError(err.response.data)
            })
        }
      });
    };


    return (
      <UserContext.Consumer>
        {(
          { setState }) => (
        <Form onSubmit={(e) => handleSubmit(e,setState)} className="login-form">
          {formError ?
                <Alert
                 message="Error"
                 description={formError}
                 type="error"
                 showIcon
                />
              : null}
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
              Don't Have An Account? Join Us
            <Icon type="usergroup-add" onClick={props.switchView} />
            </div>
          </Form.Item>
        </Form>
        )}
      </UserContext.Consumer>
    );

}

const SignInForm = Form.create({ name: 'normal_login' })(SignIn);
export default withRouter(SignInForm);