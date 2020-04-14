import React, { useState } from 'react';
import './creditCard.css';
import axios from 'axios';
import { Modal, Form, Button, Input, Alert, DatePicker } from 'antd';

const AddCreditCardsForm = (props) => {
  const [showModal,setModal] = useState(false);
  const [showError,setError] = useState(false);
  const [date,setDate] = useState('');
  const { getFieldDecorator } = props.form;
  const { userID } = props.user

  const onSubmit = (e) => {
    e.preventDefault();
    props.form.validateFieldsAndScroll((err, values) => {
      const cvcNum = parseInt(values.cvc);
      const valuesWithUserId = {...values, expDate: date, cvc: cvcNum, userID}

      axios.post('api/user/create/card', valuesWithUserId)
      .then((res) => {
        const creditCards = res.data;
        props.setExtraField(creditCards)
        setModal(false);
        props.setDirty(true)
      })
      .catch((err) =>{
        setError(true)
      })
    });
  }


    return (
      <div className="credit-cards">
        <div className="add-text" onClick={()=> setModal(true)}>
          + Add Credit Card
        </div>
        <Modal
          title="Add Credit Card"
          visible={showModal}
          onCancel={() => setModal(false)}
        >
          <Form onSubmit={(e) => onSubmit(e)} className="login-form">
          {showError ?
                <Alert
                  message="Error"
                  description="Could Not Save This CreditCard"
                  type="error"
                  showIcon
                />
                : null
          }
          <div className="credit-card-modal-body">
            <div>
              <Form.Item>
                {getFieldDecorator('number', {
                  rules: [
                    { required: true, message: 'Not a valid card number' },
                    { min: 16, message: 'Not a valid card number'}
                  ],
                })(
                  <Input
                    placeholder="Card Number"
                  />,
                )}
              </Form.Item>
            </div>
            <div className="secondary-info">
              <Form.Item>
                {getFieldDecorator('cvc', {
                  rules: [
                    { required: true, message: 'CVC code is located on back of card' },
                    { max: 4, message: 'Incorrect cvc'}
                  ],
                })(
                  <Input
                    placeholder="CVC"
                  />,
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('expDate', {
                  rules: [
                    { required: true, message: 'Enter Expiration Date' },
                  ],
                })(<DatePicker onChange={(date, dateString) => setDate(dateString)} />)}
              </Form.Item>
            </div>
          </div>
          <Form.Item>
            <Button
              type="primary"
              block
              htmlType="submit"
            >
              Add this Card
          </Button>
          </Form.Item>
        </Form>
        </Modal>
      </div>
    );
}
const AddCreditCards = Form.create({ name: 'creditCards' })(AddCreditCardsForm);
export default AddCreditCards