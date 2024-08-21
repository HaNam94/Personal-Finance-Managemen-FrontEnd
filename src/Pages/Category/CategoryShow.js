import * as Yup from "yup";
import { useFormik } from "formik";
import Helper from "../../utils/helpers";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import CategoryApi from "../../Apis/CategoryApi";
import CategoryForm from "./CategoryForm";
import {useDispatch} from "react-redux";
import {fetchCategories} from "../../Redux/category/categorySlice";

const validationSchema = Yup.object({
  categoryName: Yup.string().required("Vui lòng nhập tên ph loai!"),
  icon: Yup.string().required("Vui lòng chọn icon!"),
  note: Yup.string().required("Vui lòng nhập ghi chú")
});

function CategoryShow() {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();


  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await CategoryApi.getCategoryById(categoryId);
        setCategory(response.data);
      } catch (error) {
        navigate("/categories");
      } finally {
        setLoading(false);
      }
    };
    fetchCategory();
  }, []);

  const formik = useFormik({
    initialValues: category ? {
      categoryName: category.categoryName,
      icon: category.icon,
      note: category.note
    } : {
      categoryName: "",
      icon: "icon_0",
      categoryType: 1,
      note: ""
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await CategoryApi.updateCategory(categoryId, values);
        Helper.toastSuccess('Cập nhật phn loại thành công!');
        dispatch(fetchCategories())
        navigate("/categories");
      } catch (error) {
        Helper.toastError('Cập nhật phan loại thất bại!');
      } finally {
        setSubmitting(false);
      }
    },
    validateOnMount: false
  });


  return (
    <>
      <div className="card">
        <div className="card-body">
          {
            loading ? (
              <Skeleton count={2} height={200} />
            ) : (
              <CategoryForm
                formik={formik}
              />
            )
          }
        </div>
      </div>
    </>
  );
}

export default CategoryShow;
