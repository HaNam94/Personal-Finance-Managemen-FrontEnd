import React, {useEffect, useState} from "react";
import moment from "moment/moment";
import {useSelector} from "react-redux";
import DateRangePicker from "react-bootstrap-daterangepicker";
import Select from "react-select";
import Helper from "../../utils/helpers";
import {FormattedNumber} from "react-intl";
import {useTranslation} from "react-i18next";
import TransactionApi from "../../Apis/TransactionApi";
import BarChart from "../../Components/Chart/BarChart";
import useCurrencyConverter from "../../effect/useCurrencyConverter";

function Report() {
    const { t } = useTranslation();
    const [transactions, setTransactions] = useState(null);
    const [category, setCategory] = useState({ id: '', categoryName: t("category"), icon: "icon_000" });
    const [wallet, setWallet] = useState({ id: '', walletName:t("wallet"), icon: "icon_000" });
    const [startDate, setStartDate] = useState(moment().subtract(7, 'days'));
    const [endDate, setEndDate] = useState(moment());
    const categories = useSelector((state) => state.category.allCategories);
    const wallets = useSelector((state) => state.wallet.wallets);
    const [loading, setLoading] = useState(true);
    const { convertCurrency } = useCurrencyConverter();
        const uCurrency = useSelector((state) => state.auth.user.setting.currency);
    const formatDate = useSelector((state) => state.auth.user.setting.formatDate);


    useEffect(() => {
        setLoading(true);
        const fetchTransactions = async () => {
            try {
                const res = await TransactionApi.search({
                    startDate: startDate.format('YYYY-MM-DD'),
                    endDate: endDate.format('YYYY-MM-DD'),
                    categoryId: category?.id,
                    walletId: wallet?.id,
                });
                setTransactions(res.data);
            } catch (error) {
                Helper.parseError(error);
            }finally {
                setLoading(false);
            }
        };
        fetchTransactions();

    }, [startDate, category, wallet]);

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
            .reduce((sum, transaction) => sum + convertCurrency(transaction.amount, transaction.walletCurrency), 0);
    }
    const generateXAxis = () => {
        let dates = [];
        let currentDate = moment(startDate);

        while (currentDate <= endDate) {
            dates.push(currentDate.format(formatDate));
            currentDate = currentDate.add(1, 'days');
        }

        return dates;
    }
    const generateChartData = () => {
        const transactionSums = {};

        transactions.forEach(transaction => {
            const date = moment(transaction.datetime).format('YYYY-MM-DD');
            const type = transaction.categoryType === 1 ? 'Thu' : 'Chi';
            if (!transactionSums[date]) {
                transactionSums[date] = { Thu: 0, Chi: 0 };
            }
            transactionSums[date][type] += convertCurrency(transaction.amount, transaction.walletCurrency);
        });

        const dateRange = [];
        let currentDate = moment(startDate);
        while (currentDate.isSameOrBefore(endDate, 'day')) {
            dateRange.push(currentDate.format('YYYY-MM-DD'));
            currentDate = currentDate.add(1, 'day');
        }

        const thuData = [];
        const chiData = [];

        dateRange.forEach(date => {
            thuData.push(transactionSums[date]?.Thu.toFixed(2) || 0);
            chiData.push(transactionSums[date]?.Chi.toFixed(2) || 0);
        });
        console.log([
            { name: 'Thu', data: thuData },
            { name: 'Chi', data: chiData }
        ])
        return [
            { name:t("revenue") , data: thuData },
            { name:t("expenditure") , data: chiData }
        ];
    };

    return (
        <div>
            <div className="d-flex flex-wrap align-items-center mb-3 wrapper-search">
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
                                value={`${startDate.format(formatDate)} - ${endDate.format(formatDate)}`}
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
                                {id: '', categoryName: t("category"), icon: "icon_000"},
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
                                {id: '', walletName: t("wallet"), icon: "icon_000"},
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
                <div className="col-12 col-lg-4">
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
                <div className="col-12 col-lg-4">
                    <div className="card progress-card">
                        <div className="card-body d-flex">
                            <div className="me-auto">
                                <h4 className="card-title mb-0">{t("totalIncome")}</h4>
                                <span className="fs-12">{t("currentMonth")}</span>
                                <div className="d-flex align-items-center mt-2">
                                    <h2 className="fs-34 mb-0 me-3">
                                        {
                                            loading ? "-" :
                                                <FormattedNumber value={sumAmount(1)} style="currency" currency={uCurrency}/>
                                        }


                                    </h2>
                                    <span className="badge badge-success">+0.5%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-lg-4">
                    <div className="card progress-card">
                        <div className="card-body d-flex">
                            <div className="me-auto">
                                <h4 className="card-title mb-0">{t("totalExpense")}</h4>
                                <span className="fs-12">{t("currentMonth")}</span>
                                <div className="d-flex align-items-center mt-2">
                                    <h2 className="fs-34 mb-0 me-3">
                                        {
                                            loading ? "-" :
                                                <FormattedNumber value={sumAmount(0)} style="currency" currency={uCurrency}/>
                                        }
                                    </h2>
                                    <span className="badge badge-danger">-1.5%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-12">
                    <div className="card">
                        <div className="card-body">
                            {
                                !loading && <BarChart data={generateChartData()} xaxis={generateXAxis()}/>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Report;