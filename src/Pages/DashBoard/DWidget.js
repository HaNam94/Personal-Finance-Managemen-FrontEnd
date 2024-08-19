import {useTranslation} from "react-i18next";
import {useEffect, useState} from "react";
import Helper from "../../utils/helpers";
import WalletApi from "../../Apis/WalletApi";
import TransactionApi from "../../Apis/TransactionApi";
import moment from "moment";
import {FormattedNumber} from "react-intl";

function DWidget() {
  const { t } = useTranslation();
  const [transactions, setTransactions] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const startDate = moment().startOf('month').format('YYYY-MM-DD');
        const endDate = moment().endOf('month').format('YYYY-MM-DD');
        const res = await TransactionApi.search({
          startDate,
          endDate
        });
        setTransactions(res.data);
      } catch (error) {
        Helper.parseError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchTransactions();

  }, []);

  const sumAmount = (categoryType) => {
    return transactions.filter(transaction => transaction.categoryType === categoryType)
        .reduce((sum, transaction) => sum + transaction.amount, 0);
  }

  return (
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
  )
}

export default DWidget;