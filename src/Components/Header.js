import {useLocation} from "react-router-dom";
import Logout from "./Auth/Logout";
import {useSelector} from "react-redux";
import Helper from "../utils/helpers";
import LanguageSwitch from "../translate/LanguageSwitch";
import {useTranslation} from "react-i18next";

export default function Header() {
  const { t } = useTranslation();
  const location = useLocation();
  const user = useSelector((state) => state.auth.user);
  console.log(user)
  const getTitle = () => {
    const path = location.pathname;

    if (/^\/transactions/.test(path)) {
      return t("transaction");
    }
    if (/^\/wallets/.test(path)) {
      return t("wallet");
    }
    if (/^\/budgets/.test(path)) {
      return t("budget");
    }
    if (/^\/categories/.test(path)) {
      return t("category");
    }
    if (/^\/reports/.test(path)) {
      return t("report");
    }
    if (/^\/profile/.test(path)) {
      return t("profile");
    }
    if (/^\/setting/.test(path)) {
      return t("setting");
    }

    return t("dashboard");
  }

  return (
    <div className="header">
      <div className="header-content">
        <nav className="navbar navbar-expand box-style">
          <div className="collapse navbar-collapse justify-content-between">
            <div className="header-left">
              <div className="dashboard_bar">{getTitle()}</div>
            </div>
            <ul className="navbar-nav header-right">
              <li className="nav-item">
                <LanguageSwitch />
              </li>
              <li className="nav-item">
                <div className="user-con"><img src={user?.avatar ? Helper.imageHostUrl(user.avatar) : "./images/avatar.png"} alt=""/>
                  <div className="text">
                    <h5 className="mb-0">{user?.username}</h5><p className="mb-0">{user?.email}</p>
                  </div>
                </div>
              </li>
              <li className="nav-item">
                <Logout />
              </li>

            </ul>
          </div>
        </nav>
      </div>
    </div>
  )
}
