import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import {fetchUser, setToken} from "../Redux/auth/authSlice";
import {fetchWallets} from "../Redux/wallet/walletSlice";
import {fetchCategories} from "../Redux/category/categorySlice";
import {fetchExchangeRates} from "../Redux/money/exchangeRateSlice";
import Helper from "../utils/helpers";
import {IntlProvider} from "react-intl";

const ProtectedRoute = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);
  const status = useSelector((state) => state.auth.status);
  const statusExchange = useSelector((state) => state.exchangeRates.status)

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      dispatch(setToken(storedToken));
      dispatch(fetchUser());
      dispatch(fetchWallets());
      dispatch(fetchCategories());
      dispatch(fetchExchangeRates());
    }
  }, [dispatch, token]);
  return (
      token ?
          <>
      {
        status === "succeeded" && statusExchange === "succeeded" ?
          <IntlProvider locale={user?.setting?.formatCurrency || "vi"}>
        <Outlet />
      </IntlProvider> : <div>Loading</div>
      } </>: <Navigate to="/login" />
  );
};

export default ProtectedRoute;