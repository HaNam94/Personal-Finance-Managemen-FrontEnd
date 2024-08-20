import {useState} from "react";
import {Button, Modal} from "react-bootstrap";
import Helper from "../../utils/helpers";
import CategoryApi from "../../Apis/CategoryApi";
import {useDispatch} from "react-redux";
import BudgetApi from "../../Apis/BudgetApi";
function BudgetDelete({budget, reload}) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleDelete = async () => {
    try {
      await BudgetApi.deleteBudget(budget.id);
      Helper.toastSuccess('Xóa ngân sách thành công!');
      reload(true);
    } catch (error) {
      Helper.parseError(error)
    }
  }

  return (
    <>
      <button type="button" className="btn btn-rounded btn-outline-danger btn-sm p-1 ms-2" onClick={handleShow}>
        <span className="me-2">Xóa</span>
        <i className="fa-solid fa-trash"></i>
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
          <h3>Bạn có chắc chắn muốn ngân sách {budget.budgetName} không ?</h3>
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

export default BudgetDelete;