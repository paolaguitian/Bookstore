import React, { useContext } from 'react';
import './dashboard.css';
import UserContext from '../../context';
import { Form, Icon, Input, Button } from 'antd';


const DashboardForm = (props) => {
  const { getFieldDecorator } = props.form;
  const userState = useContext(UserContext);
  const user = userState.state.user;
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


  const handleSubmit = (e) => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      console.log(values)
    });
  };

  const renderUsername = () => {
    return (
      <Form.Item label="Username">
        {getFieldDecorator('username', {
          rules: [{ required: true, message: 'Please input your username!' }],
          initialValue: user.username,
        })(<Input/>)}
      </Form.Item>
    )
  }

  const renderFirstName = () => {
    return (
      <Form.Item label="First Name">
        {getFieldDecorator('firstname', {
          initialValue: user.firstName,
          rules: [
            {
              required: true,
              message: 'Please input your name!'
            },
          ],
        })(<Input />)}
      </Form.Item>
    )
  }

  const renderLastName = () => {
    return (
      <Form.Item label="Last Name">
        {getFieldDecorator('lastname', {
          initialValue: user.lastName,
          rules: [
            {
              required: true,
              message: 'Please input your last name!'
            },
          ],
        })(<Input />)}
      </Form.Item>
    )
  }

  const renderEmail = () => {
    return (
      <Form.Item label="Email">
        {getFieldDecorator('email', {
          initialValue: user.email,
          rules: [
            {
              required: true,
              message: 'Please input your email!'
            },
          ],
        })(<Input />)}
      </Form.Item>
    )
  }
  const renderPassword = () => {
    return (
      <Form.Item label="Password">
        {getFieldDecorator('password', {
          initialValue: user.password,
          rules: [
            {
              required: true,
              message: 'Please input your password!'
            },
          ],
        })(<Input.Password />)}
      </Form.Item>
    )
  }
  const renderHomeAddress = () => {
    return (
      <Form.Item label="Home Address">
        {getFieldDecorator('homeAddress', {
          initialValue: user.homeAddress,
          rules: [
            {
              required: true,
              message: 'Please input your Home Address!'
            },
          ],
        })(<Input />)}
      </Form.Item>
    )
  }
  const renderPhoneNumber = () => {
    return (
      <Form.Item label="Phone Number">
        {getFieldDecorator('phoneNumber', {
          initialValue: user.phoneNumber,
          rules: [
            {
              required: true,
              message: 'Please input your Phone Number!'
            },
          ],
        })(<Input />)}
      </Form.Item>
    )
  }


  return (
    <div className="profile-container">
      <h1>{`${user.firstName}'s Profile`}</h1>
      <Form
        {...formItemLayout}
        onSubmit={(e) => handleSubmit(e)}
      >
        {renderUsername()}
        {renderFirstName()}
        {renderLastName()}
        {renderEmail()}
        {renderPassword()}
        {renderHomeAddress()}
        {renderPhoneNumber()}
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Update
          </Button>
        </Form.Item>
      </Form>
    </div>

  )
}

const Dashboard = Form.create({ name: 'profile' })(DashboardForm);
export default Dashboard;