import {useEffect, useState} from "react";
import UserApi from "../../Apis/UserApi";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'
import ProfileForm from "../../Components/Profile/ProfileForm";
import * as Yup from "yup";
import {useFormik} from "formik";
import Helper from "../../utils/helpers";
import ProfileChangePassword from "../../Components/Profile/ProfileChangePassword";
import ProfileDelete from "../../Components/Profile/ProfileDelete";
import ProfileAvatar from "../../Components/Profile/ProfileAvatar";
import ProfilePlan from "../../Components/Profile/ProfilePlan";
import {useDispatch} from "react-redux";
import {fetchUser} from "../../Redux/auth/authSlice";

const validationSchema = Yup.object({
  username: Yup.string().required("Họ và tên phải nhập!"),
  email: Yup.string().email().required(),
  dob: Yup.date().required("Ngày sinh phải nhập!")
    .max(new Date(), "Ngày sinh phải nhỏ hơn ngày hiện tại"),
  phone: Yup.string().required("Số điện thoại phải nhập!")
});

function Profile() {
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await UserApi.getCurrentUser();
        setUser(response.data);
      } catch (error) {
        console.error('Error', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);


  console.log(user);

  const formik = useFormik({
    initialValues: user ? {username: user.username, phone: user.phone, dob: user.dob, email: user.email} : { username: '', email: '' },
    enableReinitialize: true,
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await UserApi.updateCurrentUser(values);
        Helper.toastSuccess('Cập nhật thông tin thành công!');
        await dispatch(fetchUser());
      } catch (error) {
        Helper.parseError(error);
      } finally {
        setSubmitting(false);
      }
    },
    validateOnMount: false
  });




  return (
    <div>
      <div className="row">

        <div className="col-12 col-lg-8">
          <div className="card">
            <div className="card-body">
              {
                loading ? (
                  <Skeleton count={2} height={200}/>
                ) : (
                  <div>
                    <ProfileForm formik={formik}/>
                  </div>)
              }
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-4">
          <div className="card">
            <div className="card-body">
              {
                loading ? (
                  <Skeleton count={2} height={200}/>
                ) : (
                  <div className={"text-center"}>
                    <ProfileAvatar user={user}/>
                    <ProfilePlan/>
                    <div className="mt-4">
                      <ProfileChangePassword/>
                      <ProfileDelete/>
                    </div>
                  </div>)
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile