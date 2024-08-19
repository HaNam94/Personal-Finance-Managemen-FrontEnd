import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import walletReducer from './wallet/walletSlice';
import categoryReducer from './category/categorySlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    wallet: walletReducer,
    category: categoryReducer
  },
});

export default store;