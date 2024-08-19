import {useState} from "react";
import {Button, Modal} from "react-bootstrap";
import {useTranslation} from "react-i18next";
function WalletDelete({handleDelete}) {
  const { t } = useTranslation();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button className="btn-sm ms-2 btn-danger" variant="danger" onClick={handleShow}>
      {t("deleteWallet")}
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
          <h3>Bạn có chắc chắn muốn xóa ví này không?</h3>
          <p>Tất cả dữ liệu liên quan sẽ bị xóa, không thể khôi phục lại!</p>
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
  )
}
export default WalletDelete;