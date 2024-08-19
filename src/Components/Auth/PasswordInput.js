import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const PasswordInput = ({ formik, fieldName, label, value, onChange, placeholder }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const inputProps = formik
    ? {
        ...formik.getFieldProps(fieldName),
        isInvalid: formik.touched[fieldName] && formik.errors[fieldName],
      }
    : {
        value,
        onChange,
      };

  return (
    <Form.Group controlId={fieldName}>
      <Form.Label>{label}</Form.Label>
      <div className="position-relative">
        <Form.Control
          type={showPassword ? 'text' : 'password'}
          name={fieldName}
          {...inputProps}
          placeholder={placeholder}
          className="pr-5"
        />
        <FontAwesomeIcon
          icon={showPassword ? faEyeSlash : faEye}
          className="position-absolute eye-icon"
          style={{ top: '50%', right: '10px', cursor: 'pointer', transform: 'translateY(-50%)' }}
          onClick={handleTogglePassword}
        />
        {formik && (
          <Form.Control.Feedback type="invalid">
            {formik.errors[fieldName]}
          </Form.Control.Feedback>
        )}
      </div>
    </Form.Group>
  );
};

export default PasswordInput;
