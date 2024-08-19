import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import {useTranslation} from "react-i18next";

function UnshareModal({ email, handleUnshare }) {
  const { t } = useTranslation();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleConfirmUnshare = () => {
    handleUnshare(email);
    handleClose();
  };

  return (
    <>
      <Button variant={"danger"} size={"sm"} onClick={handleShow}>
      {t("deleteShare")}
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
          <h3>Bạn có chắc chắn muốn xóa liên kết chia sẻ với {email} không?</h3>
          <p>Tất cả quyền chia sẻ của người dùng này sẽ bị xóa và không thể khôi phục lại.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn-sm" variant="secondary" onClick={handleClose}>
            Hủy
          </Button>
          <Button className="btn-sm" variant="success" onClick={handleConfirmUnshare}>
            Xác Nhận Xóa
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default UnshareModal;
