import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";

function DBudget() {
  const { t } = useTranslation();
  return (
    <div className="card">
      <div className="card-header border-0 pb-0">
        <div>
          <h4 className="card-title mb-2">{t("budget")}</h4>
        </div>
      </div>
      <div className="card-body">
        <div className="progress default-progress">
          <div className="progress-bar bg-gradient-1 progress-animated" style={{width: '70%', height: '20px'}}
               role="progressbar">
          </div>
        </div>
        <div className="d-flex align-items-end mt-2 pb-3 justify-content-between">
          <span>{t("foodDrink")}</span>
          <span className="fs-18"><span className="text-black pe-2">2.000.000</span>/3.000.000</span>
        </div>
        <div className="progress default-progress mt-4">
          <div className="progress-bar bg-gradient-2 progress-animated" style={{width: '70%', height: '20px'}}
               role="progressbar">
            <span className="sr-only">70% Complete</span>
          </div>
        </div>
        <div className="d-flex align-items-end mt-2 pb-3 justify-content-between">
          <span>{t("Restaurant")}</span>
          <span className="fs-18"><span className="text-black pe-2">$1567</span>/$5000</span>
        </div>
        <div className="progress default-progress mt-4">
          <div className="progress-bar bg-gradient-3 progress-animated" style={{width: '70%', height: '20px'}}
               role="progressbar">
            <span className="sr-only">35% Complete</span>
          </div>
        </div>
        <div className="d-flex align-items-end mt-2 pb-3 justify-content-between">
          <span>{t("Installment")}</span>
          <span className="fs-18"><span className="text-black pe-2">$487</span>/$10000</span>
        </div>
        <div className="progress default-progress mt-4">
          <div className="progress-bar bg-gradient-4 progress-animated" style={{width: '95%', height: '20px'}}
               role="progressbar">
            <span className="sr-only">95% Complete</span>
          </div>
        </div>
        <div className="d-flex align-items-end mt-2 justify-content-between">
          <span>{t("Property")}</span>
          <span className="fs-18"><span className="text-black pe-2">$3890</span>/$4000</span>
        </div>
      </div>
      <div className="card-footer border-0 pt-0">
        <Link to={"/budgets"} className="btn btn-outline-primary d-block btn-lg">{t("More")}</Link>
      </div>
    </div>
  )
}

export default DBudget;