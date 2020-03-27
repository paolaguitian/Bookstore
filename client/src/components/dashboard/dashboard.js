import React, { useState, useContext } from 'react';
import './dashboard.css';
import UserContext from '../../context';
import { Form, Input } from 'antd';


const DashboardForm = (props) => {
  const userState = useContext(UserContext);
  const user = userState.state.user;
  console.log(user)
  const [fields, setFields] = useState(user);
  const { getFieldDecorator } = props.form;


  const renderUsername = () => {
    return (
      <Form.Item label="Username">
      {getFieldDecorator('username', {
        initialValue: user.username,
        rules: [
          {
            required: true,
            message:  'Please input a username!'
           },
        ],
      })(<Input />)}
    </Form.Item>
    )
  }

  const renderFirstName = () => {
    return (
      <Form.Item label="First Name">
      {getFieldDecorator('name', {
        initialValue: user.firstName,
        rules: [
          {
            required: true,
            message:  'Please input your name!'
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
            message:  'Please input your last name!'
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
            message:  'Please input your email!'
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
            message:  'Please input your password!'
           },
        ],
      })(<Input.Password/>)}
    </Form.Item>
    )
  }
  const renderHomeAddress= () => {
    return (
      <Form.Item label="Home Address">
      {getFieldDecorator('password', {
        initialValue: user.homeAddress,
        rules: [
          {
            required: true,
            message:  'Please input your Home Address!'
           },
        ],
      })(<Input/>)}
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
            message:  'Please input your Phone Number!'
           },
        ],
      })(<Input/>)}
    </Form.Item>
    )
  }

  return (
    <div className="profile-container">
      <h1>{`${user.firstName}'s Profile`}</h1>
      <Form
        name="basic"
        // onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
      >
        {renderUsername()}
        {renderFirstName()}
        {renderLastName()}
        {renderEmail()}
        {renderHomeAddress()}
        {renderPhoneNumber()}

     </Form>
    </div>
  )
}


const Dashboard = Form.create({ name: 'profile' })(DashboardForm);


export default Dashboard;