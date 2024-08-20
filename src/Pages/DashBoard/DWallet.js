import Lottie from "lottie-react";
import WalletBounce from "../../LottieData/walletBounce.json";
import PolarBasic from "../../Components/Chart/PolarBasic";
import {useTranslation} from "react-i18next";
import Helper from "../../utils/helpers";
import {FormattedNumber} from "react-intl";
import Skeleton from "react-loading-skeleton";
import {useSelector} from "react-redux";
import useCurrencyConverter from "../../effect/useCurrencyConverter";

function DWallet() {
  const wallets = useSelector((state) => state.wallet.wallets);
  const { t } = useTranslation();
  const { convertCurrency } = useCurrencyConverter();
  const status = useSelector((state) => state.exchangeRates.status);
  const user = useSelector((state) => state.auth.user);

  const convertedAmountObj = {};



  const totalBalanceByCurrency = () => {
    let total = 0;
    if (wallets) {
      wallets.forEach((wallet) => {
        let convertedAmount = convertCurrency(wallet.amount, wallet.currency);
        convertedAmountObj[wallet.id] = convertedAmount;
        total += convertedAmount;
      });
    }
    return total;
  }


  const chartOptions = {
    chart: {
      type: 'polarArea',
      height: 350,
      sparkline: {
        enabled: true
      }
    },
    colors: Helper.getArrayColor(wallets?.length || 0),
    fill: {
      opacity: 1
    },
    stroke: {
      width: 1,
      colors: undefined
    },
    yaxis: {
      show: false
    },
    legend: {
      show: false
    },
    tooltip: {
      enabled: false
    }
  };
  return (
    <div className="card">
      <div className="card-body">
        <div className="row align-items-center">
          <div className="col-xl-6">
            <div className="card-bx bg-blue pe-0 py-4">
              <img
                className="pattern-img"
                src="/images/pattern/pattern6.png"
              />
              <div className="card-info text-white">
                <p className="fs-16 mb-4">{t("totalBalance")}</p>
                <h2 className="text-white card-balance">
                  {
                    status !== 'succeeded' ? "-" :
                      <FormattedNumber value={totalBalanceByCurrency()} style="currency" currency={user.setting.currency}/>
                  }
                </h2>
              </div>
              <div className="w-45">
                <Lottie animationData={WalletBounce}/>
              </div>
            </div>
          </div>
          <div className="col-xl-6">
            <div className="row  mt-xl-0 mt-4">
              <div className="col-md-6">
                <h4 className="card-title">{t("overviewWallet")}</h4>
                <span>
                {t("title")}
                </span>
                <ul className="card-list mt-4">
                  {
                    status !== 'succeeded' ?
                      <Skeleton count={1} height={80} />
                      :
                    wallets.map((wallet, index) => (
                      <li key={wallet.id}>
                        <span className="circle" style={{backgroundColor: Helper.getColorByIndex(index)}}/>
                        {wallet.walletName}
                      </li>
                    ))
                  }
                </ul>
              </div>
              <div className="col-md-6">
                {
                  status === 'succeeded' &&
                  <PolarBasic options={chartOptions}
                    series={wallets.map((wallet) => convertedAmountObj[wallet.id])}
                  ></PolarBasic>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default DWallet;