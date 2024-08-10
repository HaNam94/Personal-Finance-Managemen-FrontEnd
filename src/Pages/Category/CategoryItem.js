import SubCategoryItem from "./SubCategoryItem";
import {useState} from "react";
import {Collapse} from "react-bootstrap";
import CategoryDelete from "./CategoryDelete";

function CategoryItem({category}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-white shadow-sm p-3 rounded-3  mb-2">
      <div className="d-flex align-items-center">
        <div className="border-end pe-3">
          <span className={`badge light badge-${category.categoryType === 1 ? "success" : "danger"}`}>{category.categoryType === 1 ? "Thu" : "Chi"}</span>
        </div>
        <div className="border-end px-3">
          <div className="d-flex align-items-center">
            <div>
              <img src={`/images/icons/${category.icon}.png`} className="img-fluid" style={{width: "50px"}}/>
            </div>
            <div className="ms-3">
              <h5 className="mb-0">{category.categoryName}</h5>
            </div>
          </div>
        </div>
        <div className="px-3">
          <span className="ms-2 fs-14">{category.note}</span>
        </div>
        <div className="flex-grow-1 ps-3 text-end">
          <button type="button" className="btn btn-rounded btn-outline-secondary btn-sm p-2 ms-2">
            <span className="me-2">Giao dịch</span>
            <i className="fa-solid fa-chart-line"></i>
          </button>
          <button type="button" className="btn btn-rounded btn-outline-secondary btn-sm p-2 ms-2" onClick={() => setOpen(!open)}>
            <span className="me-2">Mục con</span>
            <i className="fa-solid fa-network-wired"></i>
          </button>
          <button type="button" className="btn btn-rounded btn-outline-secondary btn-sm p-2 ms-2">
            <span className="me-2">Sửa</span>
            <i className="fa-solid fa-pen-to-square"></i>
          </button>
          <CategoryDelete category={category} />
        </div>
      </div>

        <Collapse in={open}>
        <div className="mt-4">
          {
            category.subCategories.length > 0 ?
            category.subCategories.map((subcategory, index) => <SubCategoryItem key={subcategory.id} category={subcategory}/>) :
              <div className="text-center">Không có mục con</div>
          }

        </div>
        </Collapse>

    </div>
  )
}

export default CategoryItem;