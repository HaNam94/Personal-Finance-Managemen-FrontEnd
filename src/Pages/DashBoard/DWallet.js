import Lottie from "lottie-react";
import WalletBounce from "../../LottieData/walletBounce.json";
import PolarBasic from "../../Components/Chart/PolarBasic";
import {useTranslation} from "react-i18next";
import {useEffect, useState} from "react";
import Helper from "../../utils/helpers";
import WalletApi from "../../Apis/WalletApi";
import {FormattedNumber} from "react-intl";
import Skeleton from "react-loading-skeleton";

function DWallet() {
  const { t } = useTranslation();
  const [wallets, setWallets] = useState([]);
  const [exchangeRates, setExchangeRates] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWallets = async () => {
      await Helper.delay(600)
      try {
        let [walletRes, exchangeRates] = await Promise.all([
          WalletApi.getAll(),
          Helper.vcbExchangeRates()
        ]);
        setExchangeRates(exchangeRates);
        setWallets(walletRes.data);
      } catch (error) {
        Helper.parseError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchWallets();

  }, []);

  const totalBalanceByCurrency = (currencyCode) => {
    let total = 0;
    if (wallets) {
      wallets.forEach((wallet) => {
        let convertedAmount = wallet.amount;
        if (wallet.currency !== currencyCode) {
          let rate = exchangeRates.find((rate) => rate.currencyCode === "USD");
          if(currencyCode === "VND") {
            convertedAmount = wallet.amount * Helper.parseFloat(rate.transfer);
          }else {
            convertedAmount = wallet.amount / Helper.parseFloat(rate.transfer);
          }
        }
        wallet.convertedAmount = convertedAmount;
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
                    loading ? "-" :
                      <FormattedNumber value={totalBalanceByCurrency("VND")} style="currency" currency={"VND"}/>
                  }
                </h2>
                <span>+0,8% {t("percentageChange")}</span>
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
                 Tiền không phải là tất cả, nhưng nó là một phần quan trọng trong cuộc sống của chúng ta.
                </span>
                <ul className="card-list mt-4">
                  {
                    loading ?
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
                  !loading &&
                  <PolarBasic options={chartOptions}
                    series={wallets.map((wallet) => wallet.convertedAmount)}
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