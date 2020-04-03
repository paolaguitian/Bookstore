import React, { useState, useContext } from 'react';
import { Form, Input, Button } from 'antd';
import UserContext from '../../context';


const ExtraField = (props) => {
  const [ fields, setFields ] = useState([]);
  const { name, field, getFieldDecorator, diffInitValue,setDirty} = props;
  const userState = useContext(UserContext);
  const user = userState.state.user;

  const renderField = () => {
    return (
      <Form.Item label={name}>
        {getFieldDecorator(field, {
          initialValue: diffInitValue ? user[diffInitValue] : user.field,
        })(<Input onChange={() => setDirty(true)}/>)}
      </Form.Item>
    )
  }

  const addFields = () => {
    setFields([
      ...fields,
      1,
    ]);
  }

  const renderExtraField = () => {
    return fields.map((item, index) => (
      <>
        <Form.Item key={`extra-${field}-${index}`} label={`${name} ${index = index + 1}`}>
          {getFieldDecorator(`${field}${index}`, {
            initialValue: user.field ? `${user[field]}${index}`: '',
          })(<Input onChange={() => setDirty(true)}/>)}
        </Form.Item>
      </>
    ))
  }

  return (
    <>
      <div>
        {renderField()}
        <div className="add-text" onClick={addFields}>
          {` + Add ${name}`}
    </div>
      </div>
      <div className="extra-field-row">
        {renderExtraField()}
      </div>
    </>
  )

}

export default ExtraField;