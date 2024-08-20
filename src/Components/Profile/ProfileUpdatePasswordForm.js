import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import {useTranslation} from "react-i18next";

const PasswordInput = ({ formik, fieldName, label }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Form.Group controlId={fieldName}>
      <Form.Label>{label}</Form.Label>
      <div className="position-relative">
        <Form.Control
          type={showPassword ? 'text' : 'password'}
          name={fieldName}
          {...formik.getFieldProps(fieldName)}
          isInvalid={formik.touched[fieldName] && formik.errors[fieldName]}
        />
        <FontAwesomeIcon
          icon={showPassword ? faEyeSlash : faEye}
          className="position-absolute"
          style={{ top: '21px', right: '10px', cursor: 'pointer' }}
          onClick={handleTogglePassword}
        />
        <Form.Control.Feedback type="invalid">
          {formik.errors[fieldName]}
        </Form.Control.Feedback>
      </div>
    </Form.Group>
  );
};

const ProfileUpdatePasswordForm = ({ formik }) => {
  const { t } = useTranslation();
  return (
    <Form onSubmit={formik.handleSubmit}>
      <PasswordInput formik={formik} fieldName="currentPassword" label= {t("nowPass")} />
      <PasswordInput formik={formik} fieldName="newPassword" label={t("newPass")} />
      <PasswordInput formik={formik} fieldName="confirmPassword" label={t("confirmPass")} />
    </Form>
  );
};

export default ProfileUpdatePasswordForm;
