import React, {useEffect, useState} from "react";
import moment from "moment/moment";
import {useSelector} from "react-redux";
import DateRangePicker from "react-bootstrap-daterangepicker";
import Select from "react-select";
import Helper from "../../utils/helpers";
import TransactionActionModal from "../Transaction/TransactionActionModal";
import Skeleton from "react-loading-skeleton";
import Lottie from "lottie-react";
import AniEmpty from "../../LottieData/empty.json";
import {FormattedNumber} from "react-intl";
import {useTranslation} from "react-i18next";
import TransactionApi from "../../Apis/TransactionApi";

function Report() {
    const [transactions, setTransactions] = useState(null);
    const [category, setCategory] = useState({ id: '', categoryName: 'Phân loại', icon: "icon_000" });
    const [wallet, setWallet] = useState({ id: '', walletName: 'Ví tiền', icon: "icon_000" });
    const [startDate, setStartDate] = useState(moment().subtract(30, 'days'));
    const [endDate, setEndDate] = useState(moment());
    const categories = useSelector((state) => state.category.allCategories);
    const wallets = useSelector((state) => state.wallet.wallets);
    const { t } = useTranslation();
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        setLoading(true);
        const fetchTransactions = async () => {
            try {
                const res = await TransactionApi.search({
                    startDate: startDate.format('YYYY-MM-DD'),
                    endDate: endDate.format('YYYY-MM-DD'),
                });
                setTransactions(res.data);
            } catch (error) {
                Helper.parseError(error);
            }finally {
                setLoading(false);
            }
        };
        fetchTransactions();

    }, [startDate]);

    const handleCategoryChange = (newCategory) => {
        setCategory(newCategory);
    };
    const handleWalletChange = (newWallet) => {
        setWallet(newWallet);
    };
    const handleApplyDate = (event, picker) => {
        setStartDate(picker.startDate);
        setEndDate(picker.endDate);
    };
    const sumAmount = (categoryType) => {
        return transactions.filter(transaction => transaction.categoryType === categoryType)
            .reduce((sum, transaction) => sum + transaction.amount, 0);
    }
    return (
        <div>
            <div className="d-flex flex-wrap align-items-center mb-3">
                <div className="ms-auto d-flex">
                    <DateRangePicker
                        initialSettings={{
                            startDate: startDate.toDate(),
                            endDate: endDate.toDate(),
                            locale: {
                                format: 'DD/MM/YYYY',
                            },
                        }}
                        onApply={handleApplyDate}
                    >
                        <div className="input-daterange me-3">
                            <i className="fa-solid fa-calendar-days"></i>
                            <input
                                type="text"
                                className="form-control"
                                value={`${startDate.format('DD/MM/YYYY')} - ${endDate.format('DD/MM/YYYY')}`}
                                readOnly
                            />
                        </div>
                    </DateRangePicker>
                    <div className="select-filter me-3">
                        <Select
                            defaultValue={""}
                            onChange={handleCategoryChange}
                            value={category}
                            getOptionValue={(option) => option.id}
                            getOptionLabel={(option) => option.categoryName}
                            options={[
                                {id: '', categoryName: 'Phân loại', icon: "icon_000"},
                                ...categories,
                            ]}
                            components={{
                                Option: Helper.customOptionSelect,
                                SingleValue: Helper.customSingleValueSelect
                            }}
                            styles={Helper.customStylesSelect}
                        />
                    </div>
                    <div className="select-filter me-3">
                        <Select
                            defaultValue={""}
                            onChange={handleWalletChange}
                            value={wallet}
                            getOptionValue={(option) => option.id}
                            getOptionLabel={(option) => option.walletName}
                            options={[
                                {id: '', walletName: 'Ví tiền', icon: "icon_000"},
                                ...wallets,
                            ]}
                            components={{
                                Option: Helper.customOptionSelect,
                                SingleValue: Helper.customSingleValueSelect
                            }}
                            styles={Helper.customStylesSelect}
                        />
                    </div>
                </div>
            </div>
            <div className="row">
                <>
                    <div className="col-4">
                        <div className="card progress-card">
                            <div className="card-body d-flex">
                                <div className="me-auto">
                                    <h4 className="card-title mb-0">{t("totalTransactions")}</h4>
                                    <span className="fs-12">{t("currentMonth")}</span>
                                    <div className="d-flex align-items-center mt-2">
                                        <h2 className="fs-34 mb-0 me-3">{
                                            loading ? "-" :
                                                transactions.length
                                        }</h2>
                                        <span className="badge badge-danger">-10.5%</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="card progress-card">
                            <div className="card-body d-flex">
                                <div className="me-auto">
                                    <h4 className="card-title mb-0">{t("totalIncome")}</h4>
                                    <span className="fs-12">{t("currentMonth")}</span>
                                    <div className="d-flex align-items-center mt-2">
                                        <h2 className="fs-34 mb-0 me-3">
                                            {
                                                loading ? "-" :
                                                    <FormattedNumber value={sumAmount(1)} style="currency" currency={"VND"}/>
                                            }


                                        </h2>
                                        <span className="badge badge-success">+0.5%</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="card progress-card">
                            <div className="card-body d-flex">
                                <div className="me-auto">
                                    <h4 className="card-title mb-0">{t("totalExpense")}</h4>
                                    <span className="fs-12">{t("currentMonth")}</span>
                                    <div className="d-flex align-items-center mt-2">
                                        <h2 className="fs-34 mb-0 me-3">
                                            {
                                                loading ? "-" :
                                                    <FormattedNumber value={sumAmount(0)} style="currency" currency={"VND"}/>
                                            }
                                        </h2>
                                        <span className="badge badge-danger">-1.5%</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                </>
            </div>
        </div>

    )
}

export default Report;