import { Link } from "react-router-dom";
import PasswordInput from "./PasswordInput";
import Google from "./Google";

function FormLogin({ formik }) {
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="row">
        <div className="col-12">
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
            {formik.touched.email && formik.errors.email && (
              <div className="text-danger">{formik.errors.email}</div>
            )}
          </div>
          <div className="mb-3">
            <PasswordInput
              formik={formik}
              fieldName="password"
              label="Mật khẩu"
            />
          </div>
        </div>
      </div>
      <div className="row d-flex justify-content-between mt-1 mb-2">
        <div className="mb-3">
          <Link to="/forgot-password">Quên mật khẩu ?</Link>
        </div>
      </div>
      <div>
        <button type="submit" className="btn btn-primary btn-block" disabled={formik.isSubmitting}>
          Đăng nhập
        </button>
      </div>
    </form>
  );
}

export default FormLogin;
