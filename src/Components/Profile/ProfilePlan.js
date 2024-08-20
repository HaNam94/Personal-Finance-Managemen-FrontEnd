import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";

function ProfilePlan() {
  const { t } = useTranslation();
  return (
    <>
      <h5 className={"mt-3"}>{t("freeAccount")} <Link to={"/upgrade"} className="text-blue">{t("freeAccount")}</Link></h5>
    </>
  )
}
export default ProfilePlan;