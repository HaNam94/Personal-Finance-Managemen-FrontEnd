import {useDispatch} from "react-redux";
import {logout} from "../../Redux/auth/authSlice";
import {useState} from "react";
import {Button, Modal} from "react-bootstrap";
import Lottie from "lottie-react";
import logoutLottieData from "../../LottieData/logout.json";
import {useTranslation} from "react-i18next";

function Logout() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  const handleLogout = (e) => {
    dispatch(logout());
  };

  const handleShow = (e) => {
    e.preventDefault();
    setShow(true);
  };

  const handleClose = () => setShow(false);

  return (
    <>
      <a href="/" onClick={handleShow} className="m ai-icon">
        <svg id="icon-logout" xmlns="http://www.w3.org/2000/svg" className="text-danger" width="28"
             height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
             stroke-linecap="round" stroke-linejoin="round">
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
          <polyline points="16 17 21 12 16 7"></polyline>
          <line x1="21" y1="12" x2="9" y2="12"></line>
        </svg>
      </a>

      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
          <div className="w-50 mx-auto">
            <Lottie animationData={logoutLottieData}/>
          </div>
          <h4 className="text-center">{t("confirmLogout")}</h4>

          <div className="text-center mt-4">
            <Button className="mx-2" variant="secondary" onClick={handleClose}>
            {t("logout")}
            </Button>
            <Button className="mx-2" variant="success" onClick={handleLogout}>
            {t("logout")}
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default Logout;
