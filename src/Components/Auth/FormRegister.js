import React from "react";
import PasswordInput from "./PasswordInput"; 

function FormRegister({ formik, isLoading }) {
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="row">
        <div className="col-12">
          <div className="mb-3">
            <label>Tên người dùng</label>
            <input
              className="form-control"
              id="username"
              name="username"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.username}
            />
            {formik.touched.username && formik.errors.username ? (
              <div className="text-danger">{formik.errors.username}</div>
            ) : null}
          </div>
          <div className="mb-3">
            <label>Email</label>
            <input
              className="form-control"
              id="email"
              name="email"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-danger">{formik.errors.email}</div>
            ) : null}
          </div>
          <div className="mb-3">
            <PasswordInput
              formik={formik}
              fieldName="password"
              label="Mật khẩu"
            />
          </div>
          <div className="mb-3">
            <PasswordInput
              formik={formik}
              fieldName="confirmPassword"
              label="Nhập lại mật khẩu"
            />
          </div>
        </div>
      </div>

      <div>
        <button
          type="submit"
          className="btn btn-primary btn-block"
          disabled={formik.isSubmitting}
        >
          {isLoading ? (
            <div className="spinner-border spinner-border-sm" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          ) : (
            'Đăng Ký'
          )}
        </button>
      </div>
    </form>
  );
}

export default FormRegister;
