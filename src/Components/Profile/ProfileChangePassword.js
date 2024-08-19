import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import ProfileUpdatePasswordForm from './ProfileUpdatePasswordForm'; // Import component
import * as Yup from 'yup';
import { useFormik } from 'formik';
import UserApi from '../../Apis/UserApi';
import Helper from '../../utils/helpers';

const validationSchema = Yup.object({
  currentPassword: Yup.string().required('Mật khẩu hiện tại phải nhập!'),
  newPassword: Yup.string()
    .required('Mật khẩu mới phải nhập!')
    .min(6, 'Mật khẩu phải từ 6 đến 50 kí tự'),
  confirmPassword: Yup.string()
    .required('Xác nhận mật khẩu phải nhập!')
    .oneOf([Yup.ref('newPassword'), null], 'Mật khẩu xác nhận không trùng với mật khẩu mới'),
});

function ProfileChangePassword() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const formik = useFormik({
    initialValues: { currentPassword: '', newPassword: '', confirmPassword: '' },
    enableReinitialize: true,
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await UserApi.updateCurrentUser(values);
        Helper.toastSuccess('Cập nhật thông tin thành công!');
        setShow(false);
        formik.resetForm();
      } catch (error) {
        Helper.showApiError(error.response.data);
      } finally {
        setSubmitting(false);
      }
    },
    validateOnMount: false,
  });

  return (
    <>
      <Button className="btn-sm ms-2" variant="primary" onClick={handleShow}>
        Thay đổi mật khẩu
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Thay đổi mật khẩu</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ProfileUpdatePasswordForm formik={formik} /> 
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn-sm" variant="secondary" onClick={handleClose}>
            Hủy
          </Button>
          <Button className="btn-sm" variant="success" onClick={formik.submitForm} disabled={formik.isSubmitting}>
            Lưu
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ProfileChangePassword;
