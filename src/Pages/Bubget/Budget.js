import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import BudgetItem from "./BudgetItem";
import BudgetApi from "../../Apis/BudgetApi";

function Budget() {
  const [budgets, setBudgets] = useState([]);
  const [loading, setLoading] = useState(true);
useEffect(() => {
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
}, []);

  return (
      <div>

          <div className="text-end mb-3">
              <Link to={'/budgets/new'} className="btn btn-primary btn-sm">
                  <span className="me-2">Tạo budget mới</span>
                  <i className="fa-solid fa-plus"></i>
              </Link>
          </div>
          <div className="row">
              <div className="col-12">
                  {
                      loading ?
                          <Skeleton count={4} height={80}/>
                          : budgets.map((b, index) => <BudgetItem key={b.id} budget={b}/>)
                  }
              </div>
          </div>
      </div>
  )
}

export default Budget;