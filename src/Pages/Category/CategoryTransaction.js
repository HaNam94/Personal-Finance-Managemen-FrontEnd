import {useEffect, useState} from "react";
import {Button, Modal} from "react-bootstrap";
import TransactionItem from "../Transaction/TransactionItem";
import Lottie from "lottie-react";
import AniEmpty from "../../LottieData/empty.json";
import TransactionApi from "../../Apis/TransactionApi";


function CategoryTransaction({categoryId}) {
  const [show, setShow] = useState(false);
  const [transactions, setTransactions] = useState([])

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    if (!show) return;
    const fetchTransactions = async () => {
      try {
        const response = await TransactionApi.getByCategoryId(categoryId);
        setTransactions(response.data);
      } catch (error) {
        setTransactions([]);
        console.error('Error', error);
      }
    };

    fetchTransactions();
  }, [show])
  return (
    <>
      <button type="button" className="btn btn-rounded btn-outline-secondary btn-sm p-2 ms-2" onClick={handleShow}>
        <span className="me-2">Giao dịch</span>
        <i className="fa-solid fa-chart-line"></i>
      </button>
      <Modal show={show} onHide={handleClose} size="lg" className="modal-box-style">
        <Modal.Header closeButton>
          <Modal.Title>Danh sách giao dịch</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {
              transactions.length == 0 ?
                (<div className="w-25 mx-auto pb-5">
                  <Lottie animationData={AniEmpty}
                  />
                </div> ) :
              transactions.map((transaction, i) =>  <TransactionItem key={transaction.id} transaction={transaction} />)
            }
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" className="btn-sm" onClick={handleClose}>Đóng</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default CategoryTransaction;