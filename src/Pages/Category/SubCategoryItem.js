import CategoryDelete from "./CategoryDelete";
import {Link} from "react-router-dom";
import CategoryTransaction from "./CategoryTransaction";

function SubCategoryItem({category, handleReload}) {
  return (
    <div className="bg-white shadow-sm p-3 rounded-3  mb-2 ms-4">
    <div className="d-flex align-items-center">
      <div className="pe-3">
        <i className="fa-solid fa-angles-right"></i>
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
        <CategoryTransaction categoryId={category.id} isSmall={true} />

        <Link to={"/categories/" + category.id} type="button" className="btn btn-rounded btn-outline-secondary btn-sm p-1 ms-2">
          <span className="me-2">Sửa</span>
          <i className="fa-solid fa-pen-to-square"></i>
        </Link>
        <CategoryDelete category={category} handleReload={handleReload}/>
      </div>
    </div>
    </div>
  );
}

export default SubCategoryItem;