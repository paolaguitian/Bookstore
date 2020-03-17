import React, { Component } from 'react';
import { Form, Input, Button, Icon } from 'antd';
import axios from 'axios';
import UserContext from '../context';
import { withRouter } from 'react-router';

class Register extends Component {
  state = {
    confirmDirty: false,
  };

  handleSubmit = (e, setState) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        axios.post('/api/user/create', values)
          .then((res) => {
            const data = res.data;
            setState({ user: data, isLoggedIn: true });
            this.props.history.push('/dashboard');
            //1. authenticate user
            // 2. SET SESSION TOKEN
          })
          .catch(function (err) {
            // TODO:
            // error view/try again later
            console.log(`UH OH: ${err}`)
          })
      }
    });
  };

  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };


  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };

    return (
      <UserContext.Consumer>
        {(
          { setState }) => (
            <Form
              {...formItemLayout}
              onSubmit={(e) => this.handleSubmit(e, setState)}
            >
              <Form.Item label="First Name">
                {getFieldDecorator('firstName', {
                  rules: [{ required: true, message: 'Please input your first name!', },],
                })(<Input />)}
              </Form.Item>

              <Form.Item label="Last Name">
                {getFieldDecorator('lastName', {
                  rules: [{ required: true, message: 'Please input your last name!', },],
                })(<Input />)}
              </Form.Item>

              <Form.Item label="E-mail">
                {getFieldDecorator('email', {
                  rules: [
                    {
                      type: 'email',
                      message: 'The input is not valid E-mail!',
                    },
                    {
                      required: true,
                      message: 'Please input your E-mail!',
                    },
                  ],
                })(<Input />)}
              </Form.Item>

              <Form.Item label="Username">
                {getFieldDecorator('username', {
                  rules: [{ required: true, message: 'Please input a username!', },],
                })(<Input />)}
              </Form.Item>

              <Form.Item label="Password" hasFeedback>
                {getFieldDecorator('password', {
                  rules: [
                    {
                      required: true,
                      message: 'Please input your password!',
                    },
                    {
                      validator: this.validateToNextPassword,
                    },
                  ],
                })(<Input.Password />)}
              </Form.Item>

              <Form.Item label="Confirm Password" hasFeedback>
                {getFieldDecorator('confirm', {
                  rules: [
                    {
                      required: true,
                      message: 'Please confirm your password!',
                    },
                    {
                      validator: this.compareToFirstPassword,
                    },
                  ],
                })(<Input.Password onBlur={this.handleConfirmBlur} />)}
              </Form.Item>

              <Form.Item label="Home Address">
                {getFieldDecorator('homeAddress', {
                  rules: [{ required: true, message: 'Please input your home address!', },],
                })(<Input />)}
              </Form.Item>

              <Form.Item label="Phone Number">
                {getFieldDecorator('phoneNumber', {
                  rules: [{ required: true, message: 'Please input your phone number!', },],
                })(<Input />)}
              </Form.Item>

              <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">
                  Register
          </Button>
              </Form.Item>
              <Icon type="arrow-left" onClick={this.props.switchView} />
            </Form>
          )}
      </UserContext.Consumer>
    );
  }
}

const RegisterForm = Form.create({ name: 'register' })(Register);
export default withRouter(RegisterForm);