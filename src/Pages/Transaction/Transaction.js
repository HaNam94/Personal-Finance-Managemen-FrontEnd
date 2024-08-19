import TransactionActionModal from "./TransactionActionModal";
import {useEffect, useState} from "react";
import TransactionApi from "../../Apis/TransactionApi";
import TransactionItem from "./TransactionItem";
import TransactionDelete from "../../Components/Transaction/TransactionDelete";
import Lottie from "lottie-react";
import AniEmpty from "../../LottieData/empty.json";
import Skeleton from "react-loading-skeleton";
import TransactionEditModal from "../../Components/Transaction/TrasactionEditModal";
import Helper from "../../utils/helpers";

function Transaction() {
    const [transactions, setTransactions] = useState([]);
    const [categoryType, setCategoryType] = useState(2);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        if (!loading) return;
        const fetchTransaction = async () => {
          await Helper.delay(600)
          try {
            const response = await TransactionApi.getAll({
              categoryType,
              page
            });

            setTransactions(response.data.content);
            setTotalPages(response.data.totalPages);
          } catch (error) {
            console.error('Error', error)
          } finally {
            setLoading(false);
          }
        };
        fetchTransaction();
    }, [loading]);

    const handleTypeChange = (type) => {
      setCategoryType(type);
      setLoading(true);
    };

  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < totalPages) {
      setPage(newPage);
      setLoading(true);
    }
  };

  const renderPagination = () => {
    const pages = [];
    for (let i = 0; i < totalPages; i++) {
      pages.push(
        <li key={i} className={`page-item ${page === i ? "active" : ""}`}>
          <a className="page-link" href="javascript:void(0)" onClick={() => handlePageChange(i)}>
            {i + 1}
          </a>
        </li>
      );
    }

    return (
      <nav>
        <ul className="pagination pagination-gutter pagination-primary no-bg">
          <li className="page-item page-indicator">
            <a className="page-link" href="javascript:void(0)" onClick={() => handlePageChange(page - 1)} disabled={page === 0}>
              <i className="fa-solid fa-chevron-left"></i>
            </a>
          </li>
          {pages}
          <li className="page-item page-indicator">
            <a className="page-link" href="javascript:void(0)" onClick={() => handlePageChange(page + 1)} disabled={page === totalPages - 1}>
              <i className="fa-solid fa-chevron-right"></i>
            </a>
          </li>
        </ul>
      </nav>
    );
  };

    return (
        <div>
            <div className="d-flex flex-wrap align-items-center mb-3">
                <div className="me-auto">
                    <div className="card-tabs style-1 mt-3 mt-sm-0">
                        <ul className="nav nav-tabs" role="tablist">
                            <li className="nav-item">
                                <button className={categoryType === 2 ? "nav-link active" : "nav-link"} onClick={() => handleTypeChange(2)}>Tất cả</button>
                            </li>
                            <li className="nav-item">
                                <button className={categoryType === 1 ? "nav-link active" : "nav-link"} onClick={() => handleTypeChange(1)}>Thu</button>
                            </li>
                            <li className="nav-item">
                                <button className={categoryType === 0 ? "nav-link active" : "nav-link"} onClick={() => handleTypeChange(0)}>Chi</button>
                            </li>
                        </ul>
                    </div>
                </div>
                <TransactionActionModal reload={setLoading}/>
            </div>
            <div className="row">
                <div className="col-12">
                    {
                        loading ? (
                            <Skeleton count={2} height={200}/>
                        ) : (
                            <>{
                              transactions.length === 0 ?
                                    (<div className="w-25 mx-auto pb-5">
                                        <Lottie animationData={AniEmpty}
                                        />
                                    </div> ): (
                                  <>{
                                    transactions.map((transaction, i) =>
                                      (<TransactionItem key={transaction.id}
                                                        transaction={transaction}
                                                        deleteBtn={<TransactionDelete
                                                          transactionId={transaction.id} reload={setLoading}
                                                        />}
                                                        editBtn={<TransactionEditModal transactionId={transaction.id}
                                                                                       reload={setLoading}/>}
                                      />))
                                  }
                                    <div className="d-flex justify-content-center mt-3">
                                      {renderPagination()}
                                    </div>
                                  </>)
                            }
                            < />
                        )
                    }
                </div>
              <div className="col-12">

              </div>
            </div>
        </div>
    )
}

export default Transaction;