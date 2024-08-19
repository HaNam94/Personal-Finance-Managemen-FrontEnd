import { Button, Modal } from "react-bootstrap";
import React, { useState } from "react";
import WalletActionContent from "./WalletActionContent";

function ShareWalletForms({ walletId, handleSetNewShare }) {
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="main-action">
      <Button
        className="btn-sm ms-2"
        variant="primary"
        onClick={handleShow}
      >
        <span className="mx-2">Thêm người được chia sẻ ví</span>
        <i className="fa-solid fa-plus"></i>
      </Button>
      <Modal show={show} onHide={handleClose} className="modal-box-style">
        <Modal.Header closeButton>
          <Modal.Title>Chia sẻ ví</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {walletId !== null && walletId !== undefined && (
            <WalletActionContent
              walletId={walletId}
              closeModal={handleClose}
              handleSetNewShare={handleSetNewShare}
              setIsLoading={setIsLoading} 
            />
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" className="btn-sm" onClick={handleClose}>Đóng</Button>
          <button type="submit" className="btn btn-primary btn-sm" form={"form-shared-waller"} disabled={isLoading}>
            {isLoading ? (
              <div className="spinner-border spinner-border-sm" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : (
              'Thêm'
            )}
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ShareWalletForms;
