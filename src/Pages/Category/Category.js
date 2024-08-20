import {useEffect, useState} from "react";
import Skeleton from "react-loading-skeleton";
import CategoryItem from "./CategoryItem";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {useTranslation} from "react-i18next";

function Category() {
  const { t } = useTranslation();
  const categories = useSelector((state) => state.category.categories);
  const status = useSelector((state) => state.category.status);
    console.log(categories);
  return (
    <div>

      <div className="text-end mb-3">
        <Link to={'/categories/new'} className="btn btn-primary btn-sm">
          <span className="me-2">{t("addCategory")}</span>
          <i className="fa-solid fa-plus"></i>
        </Link>
      </div>
      <div className="row">
        <div className="col-12">
          {
            status === "pending" ?
              <Skeleton count={4} height={80}/>
              : categories.map((c, index) => <CategoryItem key={c.id} category={c} />)
          }
        </div>
      </div>
    </div>
  )
}

export default Category;