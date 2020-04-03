import React, { useContext, useState } from 'react';
import './dashboard.css';
import UserContext from '../../context';
import { Form, Input, Button } from 'antd';
import ExtraField from './extraField';
import axios from 'axios';
import isEmpty from 'lodash';


const DashboardForm = (props) => {
  const { getFieldDecorator } = props.form;
  const userState = useContext(UserContext);
  const user = userState.state.user;
  const [dirty, setDirty] = useState(false)


  const handleSubmit = (e, setState) => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      const userID = user.userID
      values = {...values, userID}
      const updatedValues = {};

      if(dirty) {
        if (values.shippingAddress1) {
          axios.post('api/user/create/ship', values)
          .then((res) => {
            console.log(res.data)
            updatedValues = {...updatedValues, shippingAddress1: res.data.street}
          })
          .catch((err) =>{
            console.log("Could not update Ship")
          })
        }
        if (values.creditCard) {
          axios.post('api/user/create/card', values)
          .then((res) => {
            updatedValues = {...updatedValues, creditCard: res.data.cardNumber}
            console.log(updatedValues)
          })
          .catch((err) =>{
            console.log(updatedValues)
          })
        }

      }

    });
  };

  const renderUsername = () => {
    return (
      <Form.Item label="Username">
        {getFieldDecorator('username', {
          rules: [{ required: true, message: 'Please input your username!' }],
          initialValue: user.username,
        })(<Input onChange={() => setDirty(true)} />)}
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
        })(<Input onChange={() => setDirty(true)} />)}
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
        })(<Input onChange={() => setDirty(true)} />)}
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
        })(<Input onChange={() => setDirty(true)} />)}
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
        })(<Input onChange={() => setDirty(true)} />)}
      </Form.Item>
    )
  }

  return (
    <UserContext.Consumer>
      {({setState}) => (
    <div className="profile-container">
    <h1>{`${user.firstName}'s Profile`}</h1>
    <Form
      className="form-section"
      onSubmit={(e) => handleSubmit(e, setState)}
    >
      <div className="input-row">
        {renderUsername()}
        {renderFirstName()}
        {renderLastName()}
      </div>
      <div className="input-row">
        {renderEmail()}
        {renderPhoneNumber()}
      </div>
      <ExtraField
        diffInitValue='homeAddress'
        name='Shipping Address'
        field='shippingAddress'
        getFieldDecorator={getFieldDecorator}
        setDirty={setDirty}
      />
      <ExtraField
        name='Credit Card'
        field='creditCard'
        getFieldDecorator={getFieldDecorator}
        setDirty={setDirty}
      />
      <Form.Item>
        <Button type="primary" htmlType="submit" disabled={!dirty}>
          Update
        </Button>
      </Form.Item>
    </Form>
  </div>

      )}
    </UserContext.Consumer>


  )
}

const Dashboard = Form.create({ name: 'profile' })(DashboardForm);
export default Dashboard;