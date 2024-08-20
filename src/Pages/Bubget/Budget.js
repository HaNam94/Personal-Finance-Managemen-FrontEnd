import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import BudgetItem from "./BudgetItem";
import BudgetApi from "../../Apis/BudgetApi";
import moment from "moment";
import useCurrencyConverter from "../../effect/useCurrencyConverter";
import SemiChart from "../../Components/Chart/SemiChart";
import { FormattedNumber } from "react-intl";
import { useSelector } from "react-redux";
import Lottie from "lottie-react";
import AniEmpty from "../../LottieData/empty.json";  

function Budget() {
  const [budgets, setBudgets] = useState([]);
  const [loading, setLoading] = useState(true);
  const uCurrency = useSelector((state) => state.auth.user.setting.currency);

  const { convertCurrency } = useCurrencyConverter();

  useEffect(() => {
    if (!loading) {
      return;
    }
    const fetchBudgets = async () => {
      try {
        const response = await BudgetApi.getAll();
        setBudgets(response.data);
      } catch (error) {
        console.error('Error', error);
      } finally {
        setLoading(false);
      }
    };
    fetchBudgets();
  }, [loading]);

  const now = moment();
  const startOfMonth = moment().startOf('month');
  const endOfMonth = now;
  let totalBudget = 0;
  let totalAmount = 0;

  const updatedBudgetsData = () => {
    return budgets.map((budget) => {
      const totalAmountForMonth = budget.transactions
        .filter((transaction) => {
          const transactionDate = moment(transaction.datetime);
          return transactionDate.isBetween(startOfMonth, endOfMonth, null, '[]');
        })
        .reduce((sum, transaction) => {
          totalAmount += convertCurrency(transaction.amount, transaction.walletCurrency);
          return sum + convertCurrency(transaction.amount, transaction.walletCurrency, budget.currency);
        }, 0);

      totalBudget += convertCurrency(budget.budgetAmount, budget.currency);
      return {
        ...budget,
        totalAmountForMonth,
      };
    });
  };

  return (
    <div>
      <div className="text-end mb-3">
        <Link to={'/budgets/new'} className="btn btn-primary btn-sm">
          <span className="me-2">Tạo budget mới</span>
          <i className="fa-solid fa-plus"></i>
        </Link>
      </div>
      {loading ? (
          <Skeleton count={4} height={80} />
      ) :
        <>
          {
            budgets.length > 0 ? (
                <div className="row">
                  <div className="col-8">
                    {
                      updatedBudgetsData().map((b, index) => (
                          <BudgetItem key={b.id} budget={b} reload={setLoading} />
                      ))
                    }
                  </div>
                  <div className="col-4">
                    <div className="bg-white shadow-sm p-3 rounded-3  mb-2">
                      <div className="text-center">
                        <p className="mb-1">Số tiền có thể chi</p>
                        <h3 className="fw-bold">
                          <FormattedNumber value={totalBudget - totalAmount} style="currency" currency={uCurrency} />
                        </h3>
                      </div>
                      <SemiChart percent={Number(((totalAmount / totalBudget) * 100).toFixed(2))} />

                      <div className="d-flex justify-content-between mt-4">
                        <div className="text-center">
                          <h5 className="fw-bold">
                            <FormattedNumber value={totalBudget} style="currency" currency={uCurrency} />
                          </h5>
                          <p className="mb-1">Tổng</p>
                        </div>
                        <div className="text-center">
                          <h5 className="fw-bold">
                            <FormattedNumber value={totalAmount} style="currency" currency={uCurrency} />
                          </h5>
                          <p className="mb-1">Đã chi</p>
                        </div>
                        <div className="text-center">
                          <h5 className="fw-bold">{moment().endOf('month').diff(moment(), 'days')} ngày</h5>
                          <p className="mb-1">Cuối tháng</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) :
              <div className={"w-25 mx-auto"}>
                <Lottie animationData={AniEmpty}/>
              </div>
          }
        </>
      }
    </div>
  );
}

export default Budget;
