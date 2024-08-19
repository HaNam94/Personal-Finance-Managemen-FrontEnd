import {useDispatch, useSelector} from "react-redux";
import {useFormik} from "formik";
import UserApi from "../../Apis/UserApi";
import Helper from "../../utils/helpers";
import {fetchUser} from "../../Redux/auth/authSlice";
import SettingForm from "./SettingForm";

function Setting() {
    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            ...user?.setting
        },
        enableReinitialize: true,
        onSubmit: async (values, { setSubmitting }) => {
            try {
                await UserApi.updateSettingUser(values);
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
                <div className="col-12">
                    <div className="card">
                        <div className="card-body">
                            <SettingForm formik={formik}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Setting;