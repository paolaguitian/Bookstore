import React from 'react';
import './extraField.css';
import { Input } from 'antd';

const ExtraField = (props) => {
  const { field } = props;

  const renderExtraField = () => {
    return field.map((item, index) => (
      <div className="extraField">
        <h2>{`Card #${index + 1}`}</h2>
        Card Number:
        <Input
          value={item.cardNumber}
          allowClear={false}
        />
        <div className="minorInfo">
          CVC:
          <Input
            value={item.cvc}
            allowClear={false}
          />
          Expiration Date:
          <Input
            value={item.expDate}
            allowClear={false}
          />
        </div>

      </div>

    ))
  }

  return (
    <>
      <div className="extra-field-row">
        {renderExtraField()}
      </div>
    </>
  )

}

export default ExtraField;