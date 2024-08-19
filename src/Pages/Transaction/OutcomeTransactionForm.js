import React, {useEffect, useState} from "react";
import Select from "react-select";
import {useSelector} from "react-redux";
import Helper from "../../utils/helpers";
import moment from "moment/moment";
function OutcomeTransactionForm({formik, closeModal}) {
  const selectedWalletId = useSelector((state) => state.wallet.selectedWalletId);
    const [selectedOptionCategory, setSelectedOptionCategory] = useState(null);
    const [selectedOptionWallet, setSelectedOptionWallet] = useState(null);
    const ownerWallets = useSelector((state) => state.wallet.ownerWallets);
    const outcomeCategories = useSelector((state) => state.category.outcomeCategories);


    useEffect(() => {
        if (selectedWalletId) {
            const defaultWallet = ownerWallets.find(wallet => wallet.id === selectedWalletId);
            setSelectedOptionWallet(defaultWallet);
            formik.setFieldValue('walletId', defaultWallet ? defaultWallet.id : '');
        }
    }, [])

    const handleSelectCategoryChange = (selectedOption) => {
        setSelectedOptionCategory(selectedOption);
        formik.setFieldValue('categoryId', selectedOption? selectedOption.id : '');
    };

    const handleSelectWalletChange = (selectedOption) => {
        setSelectedOptionWallet(selectedOption);
        formik.setFieldValue('walletId', selectedOption? selectedOption.id : '');
    };

    return (
        // <h1>test outcome</h1>
        <div>
            <form onSubmit={formik.handleSubmit}>
                <div className="row">
                    <div className="col-6">
                        <div className="mb-3">
                            <label>Số tiền</label>
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
                            <label>Ghi chú</label>
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
                            <label>Ngày chi</label>
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
                            <label>Loại giao dịch</label>
                            <Select

                                defaultValue={0}
                                onChange={handleSelectCategoryChange}
                                name="categoryId"
                                value={selectedOptionCategory}
                                getOptionValue={(option) => option.id}
                                getOptionLabel={(option) => option.categoryName}
                                options={outcomeCategories}
                                components={{Option: Helper.customOptionSelect, SingleValue: Helper.customSingleValueSelect}}

                                styles={Helper.customStylesSelect}
                            />
                            {formik.touched.categoryId && formik.errors.categoryId ?
                                <div className="text-danger">{formik.errors.categoryId}</div> : null}
                        </div>
                        <div className="mb-3">
                            <label>Ví tiền</label>
                            <Select
                                defaultValue={0}
                                onChange={handleSelectWalletChange}
                                name="walletId"
                                value={selectedOptionWallet}
                                getOptionValue={(option) => option.id}
                                getOptionLabel={(option) => option.walletName}
                                options={ownerWallets}
                                components={{Option: Helper.customOptionSelect, SingleValue: Helper.customSingleValueSelect}}
                                styles={Helper.customStylesSelect}
                            />
                            {formik.touched.walletId && formik.errors.walletId ?
                                <div className="text-danger">{formik.errors.walletId}</div> : null}
                        </div>

                    </div>
                    <div className="text-end">
                        <button className="btn btn-secondary btn-sm" type="button" onClick={closeModal}>Hủy</button>
                        <button type="submit" className="btn btn-success mx-2 px-4 btn-sm">
                            Thêm
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
export default OutcomeTransactionForm;
