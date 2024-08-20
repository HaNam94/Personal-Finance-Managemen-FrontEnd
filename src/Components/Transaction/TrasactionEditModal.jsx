import {Modal} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import Select from "react-select";
import {useFormik} from "formik";
import TransactionApi from "../../Apis/TransactionApi";
import Helper from "../../utils/helpers";
import * as Yup from "yup";
import {useDispatch, useSelector} from "react-redux";
import {fetchWallets} from "../../Redux/wallet/walletSlice";
import moment from "moment/moment";
import {useTranslation} from "react-i18next";


const validationSchema = Yup.object({
    amount: Yup.number().min(0, "Số tiền phải lớn hơn 0"),
    note: Yup.string().required("Vui lòng nhập ghi chú"),
    datetime: Yup.date().required("vui lòng nhập ngày giao dịch"),
    categoryId: Yup.number().required("Không được để trống"),
    walletId: Yup.number().required("Không đuc để trông")
})
function TransactionEditModal({transactionId}){
    const { t } = useTranslation();
    const [show, setShow] = useState(false);
    const wallets = useSelector((state) => state.wallet.wallets);
    const [selectedOptionCategory, setSelectedOptionCategory] = useState(null);
    const [selectedOptionWallet, setSelectedOptionWallet] = useState(null);
    const [transaction, setTransaction] = useState(null );
    const dispatch = useDispatch();
    const categories = useSelector((state) => state.category.categories);



    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true)
        getTransactionById();
        const category = categories.find(c => c.id === transaction.categoryId)
        setSelectedOptionCategory(category)
        const wallet = wallets.find(w=> w.id === transaction.walletId)
        setSelectedOptionWallet(wallet)
    };

    const getTransactionById = async ()=>{
        const resp = await TransactionApi.getTransactionById(transactionId)

        await formik.setFieldValue("amount", resp.data.amount)
        await formik.setFieldValue("note", resp.data.note)
        await formik.setFieldValue("datetime", resp.data.datetime)
        await formik.setFieldValue("categoryId", resp.data.categoryId)
        await formik.setFieldValue("walletId", resp.data.walletId)
        setTransaction({...resp.data})
    }


    useEffect(() => {
        getTransactionById();
    }, []);
    const formik = useFormik({
            initialValues: {
                id:0,
                amount: 0,
                note: "",
                datetime: "",
                categoryId: 0,
                walletId: 0
            },
            validationSchema,
            onSubmit: async (values, {setSubmitting}) => {
                try {
                    await TransactionApi.updateTransaction(transactionId,values)

                    Helper.toastSuccess("Cập nhật giao dịch mới thành công")
                    dispatch(fetchWallets());
                    handleClose();
                } catch (error) {
                    Helper.parseError(error);
                } finally {
                    setSubmitting(false);
                }
            },
            validateOnMount: false
        }
    )

    const handleSelectCategoryChange = (selectedOption) => {
        setSelectedOptionCategory(selectedOption);
        formik.setFieldValue('categoryId', selectedOption? selectedOption.id : '');
    };

    const handleSelectWalletChange = (selectedOption) => {
        setSelectedOptionWallet(selectedOption);
        formik.setFieldValue('walletId', selectedOption? selectedOption.id : '');
    };
    return (
        <>
                <button type="button" className="btn btn-rounded btn-outline-secondary btn-sm p-2" onClick={handleShow}>
                    <span className="me-2">{t("edit")}</span>
                    <i className="fa-solid fa-pen-to-square"></i>
                </button>
            <Modal show={show} onHide={handleClose} size="lg" className="modal-box-style">
                <Modal.Body>
                    <div className="card mt-4">
                        <div className="card-body">
                            <div>
                                <form onSubmit={formik.handleSubmit}>
                                    <div className="row">
                                        <div className="col-6">
                                            <div className="mb-3">
                                                <label>{t("amount")}</label>
                                                <input
                                                    className="form-control"
                                                    type="number"
                                                    name="amount"
                                                    onChange={formik.handleChange}
                                                    value={formik.values.amount}/>
                                                {formik.touched.amount && formik.errors.amount ?
                                                    <div className="text-danger">{formik.errors.amount}</div> : null}
                                            </div>
                                            <div className="mb-3">
                                                <label>{t("note")}</label>
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                    name="note"
                                                    onChange={formik.handleChange}
                                                    value={formik.values.note}/>
                                                {formik.touched.note && formik.errors.note ?
                                                    <div className="text-danger">{formik.errors.note}</div> : null}
                                            </div>
                                            <div className="mb-3">
                                                <label>{t("transactionDate")}</label>
                                                <input
                                                    className="form-control"
                                                    type="date"
                                                    name="datetime"
                                                    onChange={formik.handleChange}
                                                    value={formik.values.datetime}
                                                    max={moment().format("YYYY-MM-DD")}
                                                />
                                                {formik.touched.datetime && formik.errors.datetime ?
                                                    <div className="text-danger">{formik.errors.datetime}</div> : null}
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="mb-3">
                                                <label>{t("transactionType")}</label>
                                                <Select
                                                    onChange={handleSelectCategoryChange}
                                                    name="categoryId"
                                                    value={selectedOptionCategory}
                                                    getOptionValue={(option) => option.id}
                                                    getOptionLabel={(option) => option.categoryName}
                                                    options={categories}
                                                    components={{Option: Helper.customOptionSelect, SingleValue: Helper.customSingleValueSelect}}
                                                    styles={Helper.customStylesSelect}
                                                />

                                            </div>
                                            <div className="mb-3">
                                                <label>{t("wallet")}</label>
                                                <Select
                                                    onChange={handleSelectWalletChange}
                                                    name="walletId"
                                                    value={selectedOptionWallet}
                                                    getOptionValue={(option) => option.id}
                                                    getOptionLabel={(option) => option.walletName}
                                                    options={wallets}
                                                    components={{Option: Helper.customOptionSelect, SingleValue: Helper.customSingleValueSelect}}
                                                    styles={Helper.customStylesSelect}
                                                />
                                            </div>

                                        </div>
                                        <div className="text-end">
                                            <button className="btn btn-secondary btn-sm" type="button"
                                                   onClick={handleClose}>{t("cancel")}
                                            </button>
                                            <button type="submit" className="btn btn-success mx-2 px-4 btn-sm">
                                            {t("edit")}
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default TransactionEditModal;