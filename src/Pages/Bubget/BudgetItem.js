import {FormattedNumber} from "react-intl";
import {Link} from "react-router-dom";
import BudgetDelete from "./BudgetDelete";
import CategoryTransaction from "../Category/CategoryTransaction";
import {useTranslation} from "react-i18next";

function BudgetItem({budget, reload}) {
    const { t } = useTranslation();
    return (
        <div className="bg-white shadow-sm p-3 rounded-3  mb-2">
            <div className="d-flex align-items-center">
                <div className="border-end px-3">
                    <img src={`/images/icons/${budget.categoryIcon}.png`} className="img-fluid"
                         style={{width: "50px"}}/>
                </div>
                <div className="border-end px-3">
                    <h5 className="mb-0 lh-1 mb-1">{budget.budgetName}</h5>
                    <p className="mb-0 lh-1">{budget.budgetDescription}</p>
                </div>
                <div className="border-end px-3">
                    <h5 className="mb-0 lh-1 mb-1">
                        <FormattedNumber value={budget.budgetAmount} style="currency" currency={budget.currency}/>
                    </h5>

                    <p className="mb-0 lh-1">{t("remaining")}: <FormattedNumber value={budget.budgetAmount - budget.totalAmountForMonth} style="currency" currency={budget.currency}/></p>
                </div>
                <div className="border-end px-3 flex-grow-1">
                    <div className="progress default-progress">
                        <div className="progress-bar bg-gradient-1 progress-animated" role="progressbar"
                             style={{width: `${(budget.totalAmountForMonth / budget.budgetAmount) * 100}%`, height: '20px'}}></div>
                    </div>
                </div>
                <div className=" ps-3 text-end">
                    <CategoryTransaction categoryId={budget.categoryId} isSmall={true}/>
                    <Link to={"/budgets/" + budget.id}
                          className="btn btn-rounded btn-outline-secondary btn-sm p-1 ms-2">
                        <span className="me-2">{t("edit")}</span>
                        <i className="fa-solid fa-pen-to-square"></i>
                    </Link>
                    <BudgetDelete budget={budget} reload={reload}/>
                </div>
            </div>


        </div>
    )
}

export default BudgetItem;