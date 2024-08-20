import {useState} from "react";
import {Button, Modal} from "react-bootstrap";
import TransactionApi from "../../Apis/TransactionApi";
import Helper from "../../utils/helpers";
import {useDispatch} from "react-redux";
import {fetchWallets} from "../../Redux/wallet/walletSlice";
import {useTranslation} from "react-i18next";

function TransactionDelete({transactionId}) {
    const { t } = useTranslation();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const dispatch = useDispatch();

    const handleDeleteTransactionById = async () => {
        try {
            await TransactionApi.deleteTransaction(transactionId)
            handleClose()
            Helper.toastSuccess("Xoá thành công")
            dispatch(fetchWallets());
        } catch (error) {

            Helper.parseError(error)
        }
    }
    return (
        <>
            <button  className="btn btn-rounded btn-outline-danger btn-sm p-2 ms-2" onClick={handleShow}>
            {t("delete")}
            </button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Body>
                    <h3>{t("confirmDeleteTrans")}</h3>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="btn-sm" variant="secondary" onClick={handleClose}>
                    {t("cancel")}
                    </Button>
                    <Button className="btn-sm" variant="success" onClick={handleDeleteTransactionById}>
                    {t("delete")}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default TransactionDelete;