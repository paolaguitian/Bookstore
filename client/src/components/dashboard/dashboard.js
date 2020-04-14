import React, { useContext, useState } from 'react';
import './dashboard.css';
import UserContext from '../../context';
import { Form, Input, Button } from 'antd';
import ExtraField from './extraField';
import axios from 'axios';
import AddCreditCards from '../creditCard/creditCard'

const DashboardForm = (props) => {
  const { getFieldDecorator } = props.form;
  const userState = useContext(UserContext);
  const user = userState.state.user;
  const [dirty, setDirty] = useState(false)
  const [extraField, setExtraField] = useState([]);


  const handleSubmit = (e, setState) => {
    e.preventDefault();
    props.form.validateFields((err, values) => {

      if(dirty) {
        values = {...values, userID: user.userID}
        if (extraField.length > 0) {
          values = {...values, creditCards: extraField, userID: user.userID}
        }
        localStorage.setItem('user', JSON.stringify(values))
        setState({
          user: JSON.parse(localStorage.getItem('user')),
        });
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
          initialValue: user.firstname,
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
          initialValue: user.lastname,
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

    const renderHomeAddress = () => {
    return (
      <Form.Item label="Home Address">
        {getFieldDecorator('homeAddress', {
          initialValue: user.homeAddress,
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
    <h1>{`${user.firstname}'s Profile`}</h1>
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
        {renderHomeAddress()}
      </div>
      <AddCreditCards
        user={user}
        setExtraField={setExtraField}
        setDirty={setDirty}
      />
      {user.creditCards ?
       <ExtraField
        field={user.creditCards}
        getFieldDecorator={getFieldDecorator}
      /> : null
      }
      <h3>+ Add Shipping Addresses</h3>
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