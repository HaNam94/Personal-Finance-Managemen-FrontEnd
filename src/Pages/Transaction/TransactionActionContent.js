import {useState} from "react";
import TransactionFormik from "./TransactionFormik";

function TransactionActionContent({closeModal, actionType = "income"}) {
  const [transactionType, setTransactionType] = useState(actionType);

  const handleTransactionTypeChange = (type) => {
    setTransactionType(type);
  };

  return (
    <div>
      <div className="me-auto">
        <div className="card-tabs style-1 mt-3 mt-sm-0">
          <ul className="nav nav-tabs mx-auto shadow-sm" role="tablist">
            <li className="nav-item">
              <a
                className={`nav-link ${transactionType === "income" ? "active" : ""}`}
                href="#"
                onClick={() => handleTransactionTypeChange("income")}
              >Thêm Khoản Thu</a>
            </li>

            <li className="nav-item">
            <a
              className={`nav-link ${transactionType === "outcome" ? "active" : ""}`}
              href="#"
              onClick={() => handleTransactionTypeChange("outcome")}
            >Thêm Khoản Chi</a>
            </li>

            <li className="nav-item">
              <a
                className={`nav-link ${transactionType === "transfer" ? "active" : ""}`}
                href="#"
                onClick={() => handleTransactionTypeChange("transfer")}
              >Chuyển tiền</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="card mt-4">
        <div className="card-body">
          {
            <TransactionFormik transactionType={transactionType} closeModal={closeModal}/>
          }
        </div>
      </div>
    </div>
  )
}

export default TransactionActionContent;