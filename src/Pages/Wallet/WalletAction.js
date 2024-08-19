import {useState} from "react";
import {Button, Modal} from "react-bootstrap";
import TransactionActionContent from "../Transaction/TransactionActionContent";
import {useDispatch} from "react-redux";
import {setSelectedWalletId} from "../../Redux/wallet/walletSlice";

function WalletAction({walletId}) {
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  const [actionType, setActionType] = useState("income");

  const handleClose = () => setShow(false);
  const handleShow = (type) => {
    dispatch(setSelectedWalletId(walletId));
    setActionType(type)
    setShow(true)
  };
  return (
    <div className="wallet-item-action">
      <Button className="btn-sm" variant="primary" onClick={() => handleShow("income")
      }>
        <span className="mx-2">Thu</span>
        <i className="fa-solid fa-plus"></i>
      </Button>
      <Button className="btn-sm ms-2" variant="primary" onClick={() => handleShow("outcome")}>
        <span className="mx-2">Chi</span>
        <i className="fa-solid fa-minus"></i>
      </Button>
      <Modal show={show} onHide={handleClose} size="lg" className="modal-box-style">
        <Modal.Body>
          <TransactionActionContent closeModal={handleClose} actionType={actionType} selectedWalletId={walletId} />
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default WalletAction;