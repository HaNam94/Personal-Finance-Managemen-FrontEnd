import { useSelector } from 'react-redux';

const useCurrencyConverter = () => {
    const resultCurrency = useSelector((state) => state.auth.user.setting.currency);
    const currencyData = useSelector((state) => state.exchangeRates.exchangeRates);

    const convertCurrency = (amount, amountCurrency) => {
        if (resultCurrency === amountCurrency) {
            return amount;
        }

        const getTransferRate = (currencyCode) => {
            const currency = currencyData.find(c => c.currencyCode === currencyCode);
            return currency ? parseFloat(currency.transfer.replace(/,/g, '')) : null;
        };

        if (amountCurrency === "VND") {
            const rate = getTransferRate(resultCurrency);
            return rate ? amount / rate : null;
        } else if (resultCurrency === "VND") {
            const rate = getTransferRate(amountCurrency);
            return rate ? amount * rate : null;
        } else {
            const rateToVND = getTransferRate(amountCurrency);
            const rateFromVND = getTransferRate(resultCurrency);
            return (rateToVND && rateFromVND) ? (amount * rateToVND) / rateFromVND : null;
        }
    };

    return { convertCurrency };
};

export default useCurrencyConverter;