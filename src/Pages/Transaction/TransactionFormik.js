import * as Yup from "yup";
import {useFormik} from "formik";
import Helper from "../../utils/helpers";
import IncomeTransactionForm from "./IncomeTransactionForm";
import TransactionApi from "../../Apis/TransactionApi";
import {useNavigate} from "react-router-dom";
import OutcomeTransactionForm from "./OutcomeTransactionForm";
import TransferTransactionForm from "./TransferTransactionForm";

const validationSchema = Yup.object({
    amount: Yup.number().min(0, "Số tiền phải lớn hơn 0"),
    datetime: Yup.date().required("vui lòng nhập ngày giao dịch"),
    categoryId: Yup.number().required("Không được để trống"),
    walletId: Yup.number().required("Không đuc để trông")
})

function TransactionFormik({closeModal, transactionType, reload}) {

    const formik = useFormik({
            initialValues: {
                amount: 0,
                note: "",
                datetime: new Date(),
                categoryId: 0,
                walletId: 0
            },
            validationSchema,
            onSubmit: async (values, {setSubmitting}) => {
                try {
                    await TransactionApi.createTransaction(values)
                    closeModal();
                    Helper.toastSuccess("Tạo giao dịch mới thành công")
                    reload(true);
                } catch (error) {
                    console.log(error)
                    Helper.toastError("Tạo giao dịch thất bại")
                } finally {
                    setSubmitting(false);
                }
            },
            validateOnMount: false
        }
    )
    return (
        <>
            {
                transactionType == "income" ? (
                        <IncomeTransactionForm formik={formik} closeModal={closeModal} />) :
                    (transactionType == "outcome" ?
                            <OutcomeTransactionForm formik={formik} closeModal={closeModal}/> :
                            <TransferTransactionForm formik={formik} closeModal={closeModal} reload={reload}/>
                    )
            }
        </>
    )
}

export default TransactionFormik;