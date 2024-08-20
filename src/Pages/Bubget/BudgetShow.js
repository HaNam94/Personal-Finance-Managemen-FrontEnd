import * as Yup from "yup";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import BudgetApi from "../../Apis/BudgetApi";
import {useFormik} from "formik";
import Helper from "../../utils/helpers";
import BudgetForm from "./BudgetForm";

const validationSchema = Yup.object({
    budgetName: Yup.string().required("Vui lòng nhập tên!"),
    budgetAmount: Yup.number().min(0, "Vui lòng nhập lớn hơn 0").max(10000000000, "Giá trị quá lớn").required("Vui lòng nhập giá tr!"),
    budgetDescription: Yup.string().required("Vui lòng nhập mô tả!"),
    categoryId: Yup.string().required("Vui lòng chọn phân loại"),
    currency: Yup.string().required("Vui lòng chọn đơn vị tiền")
});
function BudgetShow() {
    const { budgetId } = useParams();
    const navigate = useNavigate();
    const [budget, setBudget] = useState(null);


    useEffect(() => {
        const fetchBudget = async () => {
            try {
                const response = await BudgetApi.getBudgetById(budgetId);
                setBudget(response.data);
            } catch (error) {
                navigate("/budgets");
            }
        };
        fetchBudget();
    }, []);
    console.log(budget)

    const formik = useFormik({
        initialValues: budget ? {
            budgetName: budget.budgetName,
            budgetAmount: budget.budgetAmount,
            budgetDescription: budget.budgetDescription,
            categoryId: budget.category.id,
            currency: budget.currency
        } : {
            budgetName: "",
            budgetAmount: 0,
            budgetDescription: "",
            categoryId: "",
            currency: "VND"
        },
        validationSchema,
        enableReinitialize: true,
        onSubmit: async (values, { setSubmitting }) => {
            try {
                await BudgetApi.updateBudget(values, budgetId);
                Helper.toastSuccess('Cập nhật ngân sách thành công!');
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
                <BudgetForm formik={formik}  isUpdate={true}/>
            </div>
        </div>
    );
}
export default BudgetShow;