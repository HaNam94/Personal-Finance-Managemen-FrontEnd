import React from "react";

function FormRegister({formik, isLoading}) {
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
            {formik.touched.username && formik.errors.username ?
              <div className="text-danger">{formik.errors.username}</div> : null}
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
            {formik.touched.email && formik.errors.email ?
              <div className="text-danger">{formik.errors.email}</div> : null}
          </div>
          <div className="mb-3">
            <label>Mật khẩu</label>
            <input
              className="form-control"
              id="password"
              name="password"
              type="password"
              onChange={formik.handleChange}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password ?
              <div className="text-danger">{formik.errors.password}</div> : null}
          </div>
          <div className="mb-3">
            <label>Nhập lại mật khẩu</label>
            <input
              className="form-control"
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              onChange={formik.handleChange}
              value={formik.values.confirmPassword}
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword ?
              <div className="text-danger">{formik.errors.confirmPassword}</div> : null}
          </div>
        </div>
      </div>

      <div>
        <button type="submit" className="btn btn-primary btn-block" disabled={formik.isSubmitting}>
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

  )
}

export default FormRegister;