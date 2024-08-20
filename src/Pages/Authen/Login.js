import {useMemo, useState} from "react";
import Orb from "../../Components/Orb/Orb";
import {Link, useNavigate} from "react-router-dom";
import Logo from "../../Components/Logo";
import FormLogin from "../../Components/Auth/FormLogin";
import {useFormik} from "formik";
import Helper from "../../utils/helpers";
import * as Yup from "yup";
import AuthApi from "../../Apis/AuthApi";
import {useDispatch, useSelector} from "react-redux";
import {setToken} from "../../Redux/auth/authSlice";
import Google from "../../Components/Auth/Google";

const validationSchema = Yup.object({
  email: Yup.string().email().required("Vui lòng nhập email!"),
  password: Yup.string().required("Vui lòng nhập mật khẩu!")
});

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  if (token) {
    navigate('/');
  }

  const orbMemo = useMemo(() => {
    return <Orb />
  },[])

  const formik = useFormik({
    initialValues:  { email: '', password: '' },
    enableReinitialize: true,
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const res = await AuthApi.login(values);
        dispatch(setToken(res.data.accessToken) );
        navigate('/');
        Helper.toastSuccess('Đăng nhập thành công!');
      } catch (error) {
        Helper.parseError(error);
      }
    },
    validateOnMount: false
  });

  return (
    <div id="main-wrapper" className="login-page">
      {orbMemo}
      <div className="container h-100">
        <div className="row justify-content-center h-100 align-items-center">
          <div className="col-md-6">
            <div className="authincation-content">
              <div className="auth-form">
                <div className="text-center mb-3">
                  <Logo width={70} height={70} simple={true}/>
                </div>
                <h3 className="text-center mb-4 mt-2">Đăng Nhập</h3>
                <FormLogin formik={formik} />
                <div className=" mt-3 text-center">
                  <p><small>Hoặc</small></p>
                  <div className="d-inline-block">
                    <Google/>
                  </div>
                </div>
                <div className="new-account mt-3 text-center">
                  <p>
                    Chưa có tài khoản ?{" "}
                    <Link to={"/signup"} className="text-primary">
                      Đăng ký
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login;