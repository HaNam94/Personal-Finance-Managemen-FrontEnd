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
                        t("storage") : t("restore")
                }
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Body>
                    <h3>{ t("youWant")} {
                        walletStatus ?
                        t("storage") : t("restore")
                    } { t("walletin")}</h3>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="btn-sm" variant="secondary" onClick={handleClose}>
                    {t("cancel")}
                    </Button>
                    <Button className="btn-sm" variant="success" onClick={handleArchive}>
                         {
                        walletStatus ?
                        t("storage") : t("restore")
                    }
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
export default WalletArchive;