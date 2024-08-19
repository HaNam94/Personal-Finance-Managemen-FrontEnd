import * as Yup from "yup";
import {useFormik} from "formik";
import Helper from "../../utils/helpers";
import IncomeTransactionForm from "./IncomeTransactionForm";
import TransactionApi from "../../Apis/TransactionApi";
import OutcomeTransactionForm from "./OutcomeTransactionForm";
import TransferTransactionForm from "./TransferTransactionForm";
import {useDispatch} from "react-redux";
import {fetchWallets} from "../../Redux/wallet/walletSlice";
import moment from "moment";

const validationSchema = Yup.object({
    amount: Yup.number().min(0, "Số tiền phải lớn hơn 0"),
    datetime: Yup.date().required("vui lòng nhập ngày giao dịch"),
    categoryId: Yup.number().required("Không được để trống"),
    walletId: Yup.number().required("Không đuc để trông")
})

function TransactionFormik({closeModal, transactionType}) {
    const dispatch = useDispatch();

    const formik = useFormik({
            initialValues: {
                amount: 0,
                note: "",
                datetime: moment().format("YYYY-MM-DD"),
                categoryId: 0,
                walletId: 0
            },
            validationSchema,
            onSubmit: async (values, {setSubmitting}) => {
                try {
                    await TransactionApi.createTransaction(values)
                    closeModal();
                    Helper.toastSuccess("Tạo giao dịch mới thành công")
                    dispatch(fetchWallets());
                } catch (error) {
                    Helper.parseError(error)
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
                transactionType === "income" ? (
                        <IncomeTransactionForm formik={formik} closeModal={closeModal} />) :
                    (transactionType === "outcome" ?
                            <OutcomeTransactionForm formik={formik} closeModal={closeModal}/> :
                            <TransferTransactionForm formik={formik} closeModal={closeModal}/>
                    )
            }
        </>
    )
}

export default TransactionFormik;