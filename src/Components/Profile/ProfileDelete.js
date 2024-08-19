import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import UserApi from "../../Apis/UserApi";
import { useDispatch } from "react-redux";
import {logout} from "../../Redux/auth/authSlice";
import Helper from "../../utils/helpers";
import Lottie from "lottie-react";
import AniWaning from "../../LottieData/warning.json";


function ProfileDelete() {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleDelete = async () => {
    try {
      await UserApi.deleteUserAll();
      Helper.toastSuccess("Tài khoản của bạn đã được xóa")
      dispatch(logout());
      
    } catch (error) {
      console.error('Xóa tài khoản thất bại:', error);
    
    }
  };

  return (
    <>
      <Button className="btn-sm ms-2" variant="danger" onClick={handleShow}>
        Xóa tài khoản
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
          <div className="text-center">
          <h4>Bạn có chắc chắn muốn xóa tài khoản không?</h4>
          <p>Tất cả dữ liệu liên quan sẽ bị xóa, không thể khôi phục lại!</p>
          <div className="w-25 mx-auto">
                <Lottie animationData={AniWaning} />
              </div>
          </div>
         
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn-sm" variant="secondary" onClick={handleClose}>
            Hủy
          </Button>
          <Button className="btn-sm" variant="success" onClick={handleDelete}>
            Xác Nhận Xóa
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ProfileDelete;
