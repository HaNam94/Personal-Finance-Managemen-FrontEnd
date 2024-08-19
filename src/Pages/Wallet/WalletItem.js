import GradientLineChart from "../../Components/Chart/GradientLineChart";
import {Link} from "react-router-dom";
import {FormattedNumber} from "react-intl";
import WalletAction from "./WalletAction";
import {useSelector} from "react-redux";
import Helper from "../../utils/helpers";
function WalletItem({ wallet, index}) {
  const user = useSelector((state) => state.auth.user);
  return (
    <div className="col-4 position-relative invoice-wrapper">
      <Link to={"/wallets/" + wallet.id} className="card card-bx p-0 invoice-card"
            style={{backgroundColor: Helper.getColorByIndex(index)}}>
        <div className="card-body text-center mb-0 pb-1">
          <div className="icon mx-auto mb-3">
            <img src={`/images/icons/${wallet.icon}.png`} className="img-fluid"/>
          </div>
          <div>
            <h2 className="text-white invoice-num">
              <FormattedNumber value={wallet.amount} style="currency" currency={wallet.currency}/>
            </h2>
            <span className="text-white fs-18">{wallet.walletName}</span>
          </div>
        </div>
        <div>
          <GradientLineChart data={[31, 40, 28, 51, 42, 109, 100]} color={Helper.getColorByIndex(index)}/>
        </div>

      </Link>
      {
        wallet.walletRoles.some(role => role.userId === user.id && role.role === "OWNER") &&
        <WalletAction walletId={wallet.id} />
      }

    </div>
  )
}

export default WalletItem;