
import {useMemo} from "react";
import Orb from "../../Components/Orb/Orb";
import ANiUpgrade from "../../LottieData/upgrade.json";
import Lottie from "lottie-react";
import {Link} from "react-router-dom";
import Logo from "../../Components/Logo";
import {useTranslation} from "react-i18next";


function Upgrade() {
  const { t } = useTranslation();
  const orbMemo = useMemo(() => {
    return <Orb />
  },[])

  return (
    <div id="main-wrapper" className="login-page">
      {orbMemo}
      <div className="container h-100">
        <div className="row justify-content-center h-100 align-items-center">
          <div className="col-6">
            <div className="authincation-content px-3 text-center py-5">
              <div className="d-flex align-items-center justify-content-center">
                <Logo width={50} simple={true}/>
                <div className="ms-3">
                  <i className="fa-solid fa-x"></i>
                </div>
                <Lottie animationData={ANiUpgrade} style={{width: "100px"}}/>
              </div>
              <h3 className="mt-4 mb-3">{t("updatePremium")}</h3>

              <div>
                <p className="mb-5 fs-18 px-5">
                {t("blabla")}
                </p>
                <div className="text-center">
                  <Link className="btn btn-secondary btn-sm" to={"/"}>{t("cancel")}</Link>
                  <button className="btn btn-success btn-sm ms-2">{t("updateNow")}</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Upgrade;