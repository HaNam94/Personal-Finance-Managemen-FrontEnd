import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import walletReducer from './wallet/walletSlice';
import categoryReducer from './category/categorySlice';
import exchangeRateSlice from "./money/exchangeRateSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    wallet: walletReducer,
    category: categoryReducer,
    exchangeRates: exchangeRateSlice
  },
});

export default store;