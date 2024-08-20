import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import BudgetItem from "./BudgetItem";
import BudgetApi from "../../Apis/BudgetApi";
import moment from "moment";
import useCurrencyConverter from "../../effect/useCurrencyConverter";

function Budget() {
  const [budgets, setBudgets] = useState([]);
  const [loading, setLoading] = useState(true);
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
                console.error('Error', error)
            } finally {
                setLoading(false);
            }
        };
        fetchBudgets();
    }, [loading]);

    const now = moment();
    const startOfMonth = moment().startOf('month');
    const endOfMonth = now; // Current date

    const updatedBudgetsData = () => {
        return budgets.map(budget => {
            // Calculate the sum of amounts for transactions within the current month
            const totalAmountForMonth = budget.transactions
                .filter(transaction => {
                    const transactionDate = moment(transaction.datetime);
                    return transactionDate.isBetween(startOfMonth, endOfMonth, null, '[]'); // '[]' for inclusive
                })
                .reduce((sum, transaction) => sum + convertCurrency(transaction.amount, transaction.walletCurrency, budget.currency), 0);

            // Return the updated budget object with the new field
            return {
                ...budget,
                totalAmountForMonth
            };
        });
    }
    console.log(updatedBudgetsData())

  return (
      <div>

          <div className="text-end mb-3">
              <Link to={'/budgets/new'} className="btn btn-primary btn-sm">
                  <span className="me-2">Tạo budget mới</span>
                  <i className="fa-solid fa-plus"></i>
              </Link>
          </div>
          <div className="row">
              <div className="col-8">
                  {
                      loading ?
                          <Skeleton count={4} height={80}/>
                          : updatedBudgetsData().map((b, index) => <BudgetItem key={b.id} budget={b} reload={setLoading}/>)
                  }
              </div>
          </div>
      </div>
  )
}

export default Budget;