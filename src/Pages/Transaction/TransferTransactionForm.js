import React, {useState} from "react";
import Select from "react-select";
import {useDispatch, useSelector} from "react-redux";
import WalletApi from "../../Apis/WalletApi";
import Helper from "../../utils/helpers";
import {fetchWallets} from "../../Redux/wallet/walletSlice";
import {useTranslation} from "react-i18next";


function TransferTransactionForm({ formik, closeModal}) {
    const { t } = useTranslation();
    const [selectedSourceWallet, setSelectedSourceWallet] = useState(null);
    const [selectedDestinationWallet, setSelectedDestinationWallet] = useState(null);
    const ownerWallets = useSelector((state) => state.wallet.ownerWallets);
    const dispatch = useDispatch();


    const handleSourceWalletChange = (selectedOption) => {
        if(selectedOption === selectedDestinationWallet) {
            formik.setFieldValue('destinationWalletId', '');
            setSelectedDestinationWallet(null);
        }
        setSelectedSourceWallet(selectedOption);
        formik.setFieldValue('sourceWalletId', selectedOption ? selectedOption.id : '');
    };

    const handleDestinationWalletChange = (selectedOption) => {
        setSelectedDestinationWallet(selectedOption);
        formik.setFieldValue('destinationWalletId', selectedOption ? selectedOption.id : '');
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const fromWalletId = selectedSourceWallet ? selectedSourceWallet.id : null;
        const toWalletId = selectedDestinationWallet ? selectedDestinationWallet.id : null;
        const amount = formik.values.amount;

        if (fromWalletId && toWalletId && amount) {
            try {
                await WalletApi.transferMoney(fromWalletId, toWalletId, amount);
                Helper.toastSuccess("Chuyển tiền thành công");
                closeModal();
                dispatch(fetchWallets());
            } catch (error) {
                Helper.parseError(error);
            }
        } else {
            Helper.toastError("Vui lòng điền đầy đủ thông tin");
        }
    };

    // Lọc các ví nhận tiền (loại trừ ví đã được chọn làm ví chuyển tiền)
    const availableDestinationWallets = ownerWallets.filter(wallet =>
        wallet.id !== selectedSourceWallet?.id
    );


    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-12">
                        <div className="mb-3">
                            <label>{t("amount")}</label>
                            <input
                                className="form-control"
                                type="number"
                                name="amount"
                                onChange={formik.handleChange}
                                value={formik.values.amount}
                            />
                            {formik.touched.amount && formik.errors.amount ?
                                <div className="text-danger">{formik.errors.amount}</div> : null}
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="mb-3">
                        {t("walletIn")}
                            <Select
                                defaultValue={0}
                                onChange={handleSourceWalletChange}
                                name="sourceWalletId"
                                value={selectedSourceWallet}
                                getOptionValue={(option) => option.id}
                                getOptionLabel={(option) => option.walletName}
                                options={ownerWallets}
                                components={{Option: Helper.customOptionSelect, SingleValue: Helper.customSingleValueSelect}}
                                styles={Helper.customStylesSelect}
                            />
                        </div>
                        <div className="mb-3">
                        {t("walletOut")}
                            <Select
                                onChange={handleDestinationWalletChange}
                                name="destinationWalletId"
                                value={selectedDestinationWallet}
                                getOptionValue={(option) => option.id}
                                getOptionLabel={(option) => option.walletName}
                                options={availableDestinationWallets}
                                components={{Option: Helper.customOptionSelect, SingleValue: Helper.customSingleValueSelect}}
                                styles={Helper.customStylesSelect}
                            />
                        </div>
                    </div>
                    <div className="text-end">
                        <button className="btn btn-secondary btn-sm" type="button" onClick={closeModal}>{t("cancel")}</button>
                        <button type="submit" className="btn btn-success mx-2 px-4 btn-sm">{t("add")}</button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default TransferTransactionForm;

