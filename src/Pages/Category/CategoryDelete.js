import {useState} from "react";
import {Button, Modal} from "react-bootstrap";
import Helper from "../../utils/helpers";
import CategoryApi from "../../Apis/CategoryApi";
import {useDispatch} from "react-redux";
import {fetchCategories} from "../../Redux/category/categorySlice";
function CategoryDelete({category}) {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleDelete = async () => {
    try {
      await CategoryApi.deleteCategory(category.id);
      Helper.toastSuccess('Xóa phân loại thành công!');
      dispatch(fetchCategories());
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
          <h3>Bạn có chắc chắn muốn phân loại {category.categoryName} không ?</h3>
          <p>Tất cả dữ liệu liên quan đến phân loại sẽ bị xóa, bao gồm các giao dịch, ngân sách và các phân loại con</p>
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

export default CategoryDelete;