import * as Yup from "yup";
import {useFormik} from "formik";
import Helper from "../../utils/helpers";
import {useNavigate} from "react-router-dom";
import CategoryApi from "../../Apis/CategoryApi";
import BudgetForm from "./BudgetForm";
import BudgetApi from "../../Apis/BudgetApi";

const validationSchema = Yup.object({
  budgetName: Yup.string().required("Vui lòng nhập tên!"),
  budgetAmount: Yup.number().min(0, "Vui lòng nhập lớn hơn 0").max(10000000000, "Giá trị quá lớn").required("Vui lòng nhập giá tr!"),
  budgetDescription: Yup.string().required("Vui lòng nhập mô tả!"),
  categoryId: Yup.string().required("Vui lòng chọn phân loại"),
  currency: Yup.string().required("Vui lòng chọn đơn vị tiền")
});

function BudgetNew() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      budgetName: "",
      budgetAmount: 0,
      budgetDescription: "",
      categoryId: "",
      currency: "VND"
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      console.log("hhhhh")
      try {
        await BudgetApi.createBudget(values);
        Helper.toastSuccess('Tạo ngân sách thành công!');
        navigate("/budgets");
      } catch (error) {
        Helper.parseError(error);
      } finally {
        setSubmitting(false);
      }
    },
    validateOnMount: false
  });
  return (
    <div className="card">
      <div className="card-body">
        <BudgetForm formik={formik}/>
      </div>
    </div>
  );
}
export default BudgetNew;