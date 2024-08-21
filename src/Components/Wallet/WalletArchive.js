import {useState} from "react";
import {Button, Modal} from "react-bootstrap";
import {useTranslation} from "react-i18next";

function WalletArchive({handleArchive, walletStatus}) {
    const { t } = useTranslation();
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button className="btn-sm ms-2 warning" variant="warning" onClick={handleShow}>
                {
                    walletStatus ?
                        "Lưu trữ ví" : "Khôi phục ví"
                }
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Body>
                    <h3>Bạn có chắc chắn muốn {
                        walletStatus ?
                            "lưu trữ" : "khôi phục"
                    } ví này không?</h3>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="btn-sm" variant="secondary" onClick={handleClose}>
                        Hủy
                    </Button>
                    <Button className="btn-sm" variant="success" onClick={handleArchive}>
                        Xác Nhận {
                        walletStatus ?
                            "lưu trữ" : "khôi phục"
                    }
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
export default WalletArchive;