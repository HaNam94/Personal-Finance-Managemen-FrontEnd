import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import UserApi from "../../Apis/UserApi";
import { useDispatch } from "react-redux";
import {logout} from "../../Redux/auth/authSlice";
import Helper from "../../utils/helpers";
import Lottie from "lottie-react";
import AniWaning from "../../LottieData/warning.json";
import {useTranslation} from "react-i18next";

function ProfileDelete() {
  const { t } = useTranslation();
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
      {t("deleteAccount")}
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
          <div className="text-center">
          <h4>{t("confirmDelete1")}</h4>
          <p>{t("confirmDelete2")}</p>
          <div className="w-25 mx-auto">
                <Lottie animationData={AniWaning} />
              </div>
          </div>
         
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn-sm" variant="secondary" onClick={handleClose}>
          {t("cancel")}
          </Button>
          <Button className="btn-sm" variant="success" onClick={handleDelete}>
          {t("delete")}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ProfileDelete;
