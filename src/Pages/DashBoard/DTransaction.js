import IncomeSvg from "../../Components/Icon/IncomeSvg";
import OutComeSvg from "../../Components/Icon/OutComeSvg";
import {useTranslation} from "react-i18next";
import {useEffect, useState} from "react";
import Helper from "../../utils/helpers";
import TransactionApi from "../../Apis/TransactionApi";
import Skeleton from "react-loading-skeleton";
import {FormattedNumber} from "react-intl";
import {useSelector} from "react-redux";
import moment from "moment/moment";

function DTransaction() {
  const { t } = useTranslation();
  const [transactions, setTransactions] = useState(null);
  const [loading, setLoading] = useState(true);
  const formatDate = useSelector((state) => state.auth.user.setting.formatDate);



  useEffect(() => {
    if (!loading) return;
    const fetchTransaction = async () => {
      await Helper.delay(600)
      try {
        const response = await TransactionApi.getAll({});
        console.log(response);
        setTransactions(response.data.content);
      } catch (error) {
        console.error('Error', error)
      } finally {
        setLoading(false);
      }
    };
    fetchTransaction();
  }, [loading]);

  return (
    <div className="card">
      <div className="card-header d-block d-sm-flex border-0">
        <div className="me-3">
          <h4 className="card-title mb-2">{t("recentTransactions")}</h4>
          <span className="fs-12">
          {t("lastFiveTransactions")}
          </span>
        </div>
      </div>
      <div className="card-body p-0">
        <div className="table-responsive">
          {
            loading ?
                <Skeleton count={1} height={50}/> :
                <table className="table table-responsive-md card-table transactions-table">
                  <tbody>
                  {
                    transactions.slice(0, 5).map((transaction, index) => (
                        <tr>
                          <td>
                            {
                              transaction.categoryType === 1 ?
                                  <IncomeSvg /> : <OutComeSvg />
                            }
                          </td>
                          <td>
                            <h6 className="fs-16 font-w600 mb-0">
                              {transaction.categoryName}
                            </h6>
                            <span className="fs-14">{transaction.note}</span>
                          </td>
                          <td>
                            <h6 className="fs-16 text-black font-w600 mb-0">
                              {transaction.note}
                            </h6>
                            <span className="fs-14">{
                              moment(transaction.datetime, "YYYY-MM-DD").format(formatDate)
                            }</span>
                          </td>
                          <td>
                            <span className="fs-16 text-black font-w600">
                              <FormattedNumber value={transaction.amount} style="currency" currency={transaction.walletCurrency}/>
                            </span>
                          </td>
                          <td>
                            <span className="text-black fs-16 font-w500 text-end d-block">
                              {transaction.walletName}
                            </span>
                          </td>
                        </tr>
                    ))
                  }
                  </tbody>
                </table>
          }


        </div>
      </div>
    </div>
  )
}

export default DTransaction;