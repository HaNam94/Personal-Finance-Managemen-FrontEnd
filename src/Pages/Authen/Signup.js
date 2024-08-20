import {useMemo, useState} from "react";
import Orb from "../../Components/Orb/Orb";
import {Link, useNavigate} from "react-router-dom";
import * as Yup from "yup";
import {useDispatch, useSelector} from "react-redux";
import {useFormik} from "formik";
import AuthApi from "../../Apis/AuthApi";
import {setToken} from "../../Redux/auth/authSlice";
import Helper from "../../utils/helpers";
import Logo from "../../Components/Logo";
import FormRegister from "../../Components/Auth/FormRegister";

const validationSchema = Yup.object({
  email: Yup.string().email().required("Vui lòng nhập email!"),
  password: Yup.string().required("Vui lòng nhập mật khẩu!"),
  username: Yup.string().required("Vui lòng nhập họ và tên!"),
  confirmPassword: Yup.string()
    .required("Xác nhận mật khẩu phải nhập!")
    .oneOf([Yup.ref('password'), null], "Mật khẩu xác nhận không trùng với mật khẩu mới")
});


function Signup() {
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
  const [isLoading, setIsLoading] = useState(false);

  if (token) {
    navigate('/login');
  }

  const orbMemo = useMemo(() => {
    return <Orb />
  },[])

  const formik = useFormik({
    initialValues:  { email: '', password: '', username: '', confirmPassword: '' },
    enableReinitialize: true,
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setIsLoading(true);
      try {
        await AuthApi.register(values);
        navigate('/comfirm-email', { email: values.email });
        Helper.toastSuccess('Đăng ký thành công!');
      } catch (error) {
        Helper.parseError(error)
      } finally {
        setIsLoading(false);
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
              <div className="row no-gutters">
                <div className="col-xl-12">
                  <div className="auth-form">
                    <h3 className="text-center mb-4 mt-2">Đăng Ký</h3>
                    <FormRegister formik={formik} isLoading={isLoading}/>
                    <div className="new-account mt-3">
                      <p>
                        Đã có tài khoản ?{" "}
                        <Link to={"/login"} className="text-primary">
                          Đăng nhập
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup;