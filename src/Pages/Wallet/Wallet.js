import { Link } from "react-router-dom";
import WalletItem from "./WalletItem";
import Skeleton from "react-loading-skeleton";
import Lottie from "lottie-react";
import AniEmpty from "../../LottieData/empty.json";
import {useSelector} from "react-redux";
import {useTranslation} from "react-i18next";


function Wallet() {
  const { t } = useTranslation();
  const wallets = useSelector((state) => state.wallet.wallets);
  const status = useSelector((state) => state.wallet.status);
  return (
    <div>
      <div className="text-end">
        <Link to={'/wallets/new'} className="btn btn-primary btn-sm">
          <span className="me-2">{t("addWallet")}</span>
          <i className="fa-solid fa-plus"></i>
        </Link>
      </div>
      <div className="row invoice-card-row mt-4">
        {
            status === "loading" ? (
            <Skeleton count={2} height={200} />
          ) : (
            <>
              {
                wallets.length === 0 ?
                  <div className="w-25 mx-auto pb-5">
                    <Lottie animationData={AniEmpty}
                    /> 
                    </div> :
                  <>
                    {
                      wallets.map((w, index) => <WalletItem key={w.id} wallet={w} index={index}/>)
                    }
                  </>

              }
            </>
          )
        }
      </div>
    </div>
  )
}

export default Wallet;