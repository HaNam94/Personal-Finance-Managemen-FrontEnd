import {NavLink} from "react-router-dom";
import Logo from "../Logo";
import {useTranslation} from "react-i18next";

function Nav() {
  const { t } = useTranslation();
  return (
    <div className="dlabnav box-style">
      <div className="nav-header">
        <Logo width={53} height={53} />
      </div>

      <div className="dlabnav-scroll">
        <ul className="metismenu" id="menu">

          <li>
            <NavLink to={"/"} className="has-arrow ai-icon">
              <i className="fa-solid fa-house"></i>
              <span className="nav-text">{t("dashboard")}</span>
            </NavLink>
          </li>

          <li>
            <NavLink to={"/wallets"} className="has-arrow ai-icon">
              <i className="fa-solid fa-wallet"></i>
              <span className="nav-text">{t("wallet")}</span>
            </NavLink>
          </li>
          <li>
            <NavLink to={"/transactions"} className="has-arrow ai-icon">
              <i className="fa-solid fa-money-bill-transfer"></i>
              <span className="nav-text">{t("transaction")}</span>
            </NavLink>
          </li>
          <li>
          <NavLink to={"/budgets"} className="has-arrow ai-icon">
              <i className="fa-solid fa-coins"></i>
              <span className="nav-text">{t("budget")}</span>
          </NavLink>
          </li>
          <li>
          <NavLink to={"/categories"} className="has-arrow ai-icon">
              <i className="fa-solid fa-layer-group"></i>
              <span className="nav-text">{t("category")}</span>
          </NavLink>
          </li>
          <li>
          <NavLink to={"/reports"} className="has-arrow ai-icon">
              <i className="fa-solid fa-chart-line"></i>
              <span className="nav-text">{t("report")}</span>
          </NavLink>
          </li>
          <li>
            <NavLink to={"/profile"} className="has-arrow ai-icon">
              <i className="fa-solid fa-user"></i>
              <span className="nav-text">{t("profile")}</span>
            </NavLink>
          </li>
          <li>
            <NavLink to={"/setting"} className="has-arrow ai-icon">
              <i className="fa-solid fa-gear"></i>
              <span className="nav-text">{t("setting")}</span>
            </NavLink>
          </li>

        </ul>
        <div className="copyright">
          <p>
            <strong>{t("titleTabBar")}</strong> {t("minides")}
          </p>
          <p className="fs-12">
            Made with <span className="heart"/> by HN x ĐN
          </p>
        </div>
      </div>
    </div>

  )
}

export default Nav;